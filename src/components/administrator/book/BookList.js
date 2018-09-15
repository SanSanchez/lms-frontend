'use strict';

import React from 'react';
import PropTypes from 'prop-types';
import BookActions from '../../../actions/bookActions';
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

export class BookList extends React.Component {
  constructor() {
    super();

    this.state = {
      modalIsOpen : false,              // Boolean stating whether or not the modal is present on the screen
      action : '',                      // Small string for passing some text around.
      createNew : false,                // Determines the action taken by the submit button.
      title : '',
      author : '',
      publisher : '',
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

  // Handler for the 'Add Book' button.
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
    BookActions.deleteBook(id);
  }

  submitHandler() {
    const Book = {
      title : this.state.title,
      author : {authorName : this.state.author},
      publisher : {publisherName : this.state.publisher}
    };

    if (this.state.createNew) {
      BookActions.makeBook(Book);
    } else {
      BookActions.updateBook(this.state.tempId, Book);
    }

    this.closeModal();
    BookActions.readBooks();
  }

  // Handler for key press events.
  // Used for submitting the modal information.
  keyPressHandler(event) {
    if (event.key === 'Enter') {
      this.submitHandler();
    }
  }

  UNSAFE_componentWillMount() {
    BookActions.readBooks();
  }

  createBookRow(props) {
    console.log(props);
    return (
      <tr key={props.bookId}>
        <td> {props.title} </td>
        <td> {props.author.authorName} </td>
        <td> {props.publisher.publisherName} </td>
        <td>
          <button className='btn btn-primary' onClick={e => {this.updateHandler(e, props.bookId)}}>
            Update
          </button>
          <button className='btn btn-danger' onClick={e => {this.deleteHandler(e, props.bookId)}}>
            Delete
          </button>
        </td>
      </tr>
    )
  }

  render() {
    return(
      <div>
        <h1>Books</h1>
        <button type='button' className='btn btn-success' onClick={this.addHandler}>
          Add Book
        </button>
        {/*Modal Component*/}
        <ReactModal
          isOpen={this.state.modalIsOpen}
          onRequestClose={this.closeModal}
          contentLabel='Update Book Form Modal'
          style={customStyles}>
          <div className='form-group'>
            <label htmlFor="inputOne">Book Title</label>
            <input type='text' id='inputOne' className='form-control'
                   onChange={(event) => {this.setState({name: event.target.value});}}
            />
          </div>
          <div className='form-group'>
            <label htmlFor="inputTwo">Author</label>
            <input type='text' id='inputTwo' className='form-control'
                   onChange={(event) => {this.setState({author: event.target.value});}}
            />
          </div>
          <div className='form-group'>
            <label htmlFor="inputThree">Publisher</label>
            <input type='text' id='inputThree' className='form-control'
                   onChange={(event) => {this.setState({publisher: event.target.value});}}
                   onKeyPress={this.keyPressHandler}
            />
          </div>
        </ReactModal>
        <table className='table'>
          <thead>
          <tr>
            <th>Book</th>
            <th>Author</th>
            <th>Publisher</th>
            <th> </th>
          </tr>
          </thead>
          {/*Table body, mapping the information passed from the BookList into individual rows.*/}
          <tbody>
          {this.props.bookList.map(this.createBookRow, this)}
          </tbody>
        </table>
      </div>
    );
  }
}

BookList.propTypes = {
  bookList: PropTypes.array.isRequired
};
