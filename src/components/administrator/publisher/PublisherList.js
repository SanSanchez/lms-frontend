'use strict';

import React from 'react';
import PropTypes from 'prop-types';
import PublisherActions from '../../../actions/publisherActions';
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

export class PublisherList extends React.Component {
  constructor() {
    super();

    this.state = {
      modalIsOpen : false,              // Boolean stating whether or not the modal is present on the screen
      action : '',                      // Small string for passing some text around.
      createNew : false,                // Determines the action taken by the submit button.
      name : '',
      address : '',
      phone : '',
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

  // Handler for the 'Add Publisher' button.
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
    PublisherActions.deletePublisher(id);
  }

  submitHandler() {
    const Publisher = {
      publisherId : this.state.tempId,
      publisherName : this.state.name,
      publisherAddress : this.state.address,
      publisherPhone : this.state.phone
    };

    if (this.state.createNew) {
      PublisherActions.makePublisher(Publisher);
    } else {
      PublisherActions.updatePublisher(this.state.tempId, Publisher);
    }

    this.closeModal();
    PublisherActions.readPublishers();
  }

  // Handler for key press events.
  // Used for submitting the modal information.
  keyPressHandler(event) {
    if (event.key === 'Enter') {
      this.submitHandler();
    }
  }

  UNSAFE_componentWillMount(){
    PublisherActions.readPublishers();
  }

  createPublisherRow(props) {
    return (
      <tr key={props.publisherId}>
        <td> {props.publisherName} </td>
        <td> {props.publisherAddress} </td>
        <td> {props.publisherPhone} </td>
        <td>
          <button style={{marginRight : '5px'}} className='btn btn-primary' onClick={e => {this.updateHandler(e, props.publisherId)}}>
            Update
          </button>
          <button className='btn btn-danger' onClick={e => {this.deleteHandler(e, props.publisherId)}}>
            Delete
          </button>
        </td>
      </tr>
    )
  }

  render() {
    return(
      <div>
        <h1>Publishers</h1>
        <button type='button' className='btn btn-success' onClick={this.addHandler}>
          Add Publisher
        </button>
        {/*Modal Component*/}
        <ReactModal
          isOpen={this.state.modalIsOpen}
          onRequestClose={this.closeModal}
          contentLabel='Update Publisher Form Modal'
          style={customStyles}>
          <div className='form-group'>
            <label htmlFor="inputOne">Publisher Name</label>
            <input type='text' id='inputOne' className='form-control'
                   onChange={(event) => {this.setState({name: event.target.value});}}
            />
          </div>
          <div className='form-group'>
            <label htmlFor="inputTwo">Publisher Address</label>
            <input type='text' id='inputTwo' className='form-control'
                   onChange={(event) => {this.setState({address: event.target.value});}}
            />
          </div>
          <div className='form-group'>
            <label htmlFor="inputThree">Phone Number</label>
            <input type='text' id='inputThree' className='form-control'
                   onChange={(event) => {this.setState({phone: event.target.value});}}
                   onKeyPress={this.keyPressHandler}
            />
          </div>
        </ReactModal>
        <table className='table'>
          <thead>
          <tr>
            <th>Publisher</th>
            <th>Address</th>
            <th>Phone Number</th>
            <th> </th>
          </tr>
          </thead>
          {/*Table body, mapping the information passed from the PublisherList into individual rows.*/}
          <tbody>
          {this.props.publisherList.map(this.createPublisherRow, this)}
          </tbody>
        </table>
      </div>
    );
  }
}

PublisherList.propTypes = {
  publisherList: PropTypes.array.isRequired
};

/*
  Issues with this page:
    - I directly alter the state.
    - On updates, the current name is not initially set in the text input.
    - Don't have multiple modals or a configurable modal.
 */

// TODO: On Deletes, have a confirmation box come up before actually deleting it.