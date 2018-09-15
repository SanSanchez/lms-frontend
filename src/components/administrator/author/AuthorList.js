'use strict';

import React from 'react';
import PropTypes from 'prop-types';
import AuthorActions from '../../../actions/authorActions';
import ReactModal from 'react-modal';

// Custom styling for the model component.
const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};

export class AuthorList extends React.Component {
  constructor() {
    super();

    this.state = {
      modalIsOpen : false,              // Boolean stating whether or not the modal is present on the screen
      action : '',                      // Small string for passing some text around.
      createNew : false,                // Determines the action taken by the submit button.
      name : '',
      tempId : -1
    };

    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.keyPressHandler = this.keyPressHandler.bind(this);
    this.addHandler = this.addHandler.bind(this);
    this.deleteHandler = this.deleteHandler.bind(this);
    this.updateHandler = this.updateHandler.bind(this);
    this.submitHandler = this.submitHandler.bind(this);
  }

  openModal() {
    this.setState({modalIsOpen : true});
  }

  closeModal() {
    this.setState({modalIsOpen : false});
  }

  // Handler for the 'Add Author' button.
  addHandler() {
    this.setState({
      action : 'Add New',
      createNew : true,
    });
    this.openModal();
  }

  // Handler for the update button.
  updateHandler(e, id) {
    this.setState({
      action : 'Update',
      createNew : false,
      tempId : id
    });
    this.openModal();
  }

  deleteHandler(e, id) {
    AuthorActions.deleteAuthor(id);
  }

  submitHandler() {
    const Author = {
      authorId : this.state.tempId,
      authorName : this.state.name,
      authorAddress : this.state.address,
      authorPhone : this.state.phone
    };

    if (this.state.createNew) {
      AuthorActions.makeAuthor(Author);
    } else {
      AuthorActions.updateAuthor(this.state.tempId, Author);
    }

    this.closeModal();
    AuthorActions.readAuthors();
  }

  // Handler for key press events.
  // Used for submitting the modal information.
  keyPressHandler(event) {
    if (event.key === 'Enter') {
      this.submitHandler();
    }
  }

  UNSAFE_componentWillMount(){
    AuthorActions.readAuthors();
  }

  createAuthorRow(props) {
    return (
      <tr key={props.authorId}>
        <td> {props.authorName} </td>
        <td>
          <button className='btn btn-primary' onClick={e => {this.updateHandler(e, props.authorId)}}>
            Update
          </button>
          <button className='btn btn-danger' onClick={e => {this.deleteHandler(e, props.authorId)}}>
            Delete
          </button>
        </td>
      </tr>
    )
  }

  render() {
    return(
      <div>
        <h1>Authors</h1>
        <button type='button' className='btn btn-success' onClick={this.addHandler}>
          Add Author
        </button>
        {/*Modal Component*/}
        <ReactModal
          isOpen={this.state.modalIsOpen}
          onRequestClose={this.closeModal}
          contentLabel='Update Author Form Modal'
          style={customStyles}>
          <div className='form-group'>
            <label htmlFor="inputOne">Author Name</label>
            <input type='text' id='inputOne' className='form-control'
                   onChange={(event) => {this.setState({name: event.target.value});}}
                   onKeyPress={this.keyPressHandler}
            />
          </div>
        </ReactModal>
        <table className='table'>
          <thead>
          <tr>
            <th>Author</th>
            <th> </th>
            <th> </th>
            <th> </th>
          </tr>
          </thead>
          {/*Table body, mapping the information passed from the AuthorList into individual rows.*/}
          <tbody>
          {this.props.authorList.map(this.createAuthorRow, this)}
          </tbody>
        </table>
      </div>
    );
  }
}

AuthorList.propTypes = {
  authorList: PropTypes.array.isRequired
};

/*
  Issues with this page:
    - I directly alter the state.
    - On updates, the current name is not initially set in the text input.
    - Don't have multiple modals or a configurable modal.
 */

// TODO: On Deletes, have a confirmation box come up before actually deleting it.