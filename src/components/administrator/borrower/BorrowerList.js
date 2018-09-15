'use strict';

import React from 'react';
import PropTypes from 'prop-types';
import BorrowerActions from '../../../actions/borrowerActions';
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

export class BorrowerList extends React.Component {
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

  // Handler for the 'Add Borrower' button.
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
    BorrowerActions.deleteBorrower(id);
  }

  submitHandler() {
    const Borrower = {
      cardNo : this.state.tempId,
      name : this.state.name,
      address : this.state.address,
      phone : this.state.phone
    };

    if (this.state.createNew) {
      BorrowerActions.makeBorrower(Borrower);
    } else {
      BorrowerActions.updateBorrower(this.state.tempId, Borrower);
    }

    this.closeModal();
    BorrowerActions.readBorrowers();
  }

  // Handler for key press events.
  // Used for submitting the modal information.
  keyPressHandler(event) {
    if (event.key === 'Enter') {
      this.submitHandler();
    }
  }

  UNSAFE_componentWillMount(){
    BorrowerActions.readBorrowers();
  }

  createBorrowerRow(props) {
    return (
      <tr key={props.cardNo}>
        <td> {props.name} </td>
        <td> {props.address} </td>
        <td> {props.phone} </td>
        <td>
          <button className='btn btn-primary' onClick={e => {this.updateHandler(e, props.cardNo)}}>
            Update
          </button>
          <button className='btn btn-danger' onClick={e => {this.deleteHandler(e, props.cardNo)}}>
            Delete
          </button>
        </td>
      </tr>
    )
  }

  render() {
    return(
      <div>
        <h1>Borrowers</h1>
        <button type='button' className='btn btn-success' onClick={this.addHandler}>
          Add Borrower
        </button>
        {/*Modal Component*/}
        <ReactModal
          isOpen={this.state.modalIsOpen}
          onRequestClose={this.closeModal}
          contentLabel='Update Borrower Form Modal'
          style={customStyles}>
          <div className='form-group'>
            <label htmlFor="inputOne">Borrower Name</label>
            <input type='text' id='inputOne' className='form-control'
                   onChange={(event) => {this.setState({name: event.target.value});}}
            />
          </div>
          <div className='form-group'>
            <label htmlFor="inputTwo">Borrower Address</label>
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
            <th>Borrower</th>
            <th>Address</th>
            <th>Phone Number</th>
            <th> </th>
          </tr>
          </thead>
          {/*Table body, mapping the information passed from the BorrowerList into individual rows.*/}
          <tbody>
          {this.props.borrowerList.map(this.createBorrowerRow, this)}
          </tbody>
        </table>
      </div>
    );
  }

}
BorrowerList.propTypes = {
  borrowerList: PropTypes.array.isRequired
};

/*
  Issues with this page:
    - I directly alter the state.
    - On updates, the current name is not initially set in the text input.
    - Don't have multiple modals or a configurable modal.
 */

// TODO: On Deletes, have a confirmation box come up before actually deleting it.