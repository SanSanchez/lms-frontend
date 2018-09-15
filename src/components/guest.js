'use strict';

import React from 'react';
import PropTypes from 'prop-types';
import BookActions from "../actions/bookActions";
import BranchActions from '../actions/branchActions';
import GuestActions from '../actions/guestActions';
import ReactModal from "react-modal";

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

export class Guest extends React.Component {

  constructor() {
    super();

    this.state = {
      cardNo : 0,
      bookId : 0,
      branchId : 0,
      modalIsOpen : false
    };

    this.submitHandler = this.submitHandler.bind(this);
    this.keyPressHandler = this.keyPressHandler.bind(this);
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);    this.checkoutHandler = this.checkoutHandler.bind(this);
    this.returnHandler = this.returnHandler.bind(this);
  }

  openModal() {
    this.setState({modalIsOpen : true});
  }

  closeModal() {
    this.setState({modalIsOpen : false});
  }

  // Handler for key press events.
  // Used for submitting the modal information.
  keyPressHandler(event) {
    if (event.key === 'Enter') {
      this.submitHandler();
    }
  }

  submitHandler() {
    GuestActions.returnBook(this.state.cardNo, this.state.branchId, this.state.bookId);
    this.closeModal();
  }

  createBookRow(props) {
    return (
      <tr key={props.bookId}>
        <td> {props.title} </td>
        <td> {props.author.authorName} </td>
        <td>
          <button className='btn btn-primary' onClick={e => {this.checkoutHandler(e, props.title)}}>
            Check Out
          </button>
        </td>
      </tr>
    )
  }

  UNSAFE_componentWillMount() {
    BookActions.readBooks();
    BranchActions.readBranches();
  }

  checkoutHandler(e, title) {
    console.log(this.state.cardNo);
    console.log(title);
    GuestActions.makeLoan(this.state.cardNo, 5, title);
  }

  returnHandler() {
    this.openModal();
  }

  render() {
    return (
      <div>
        <h1>Guests</h1>
        <ReactModal
          isOpen={this.state.modalIsOpen}
          onRequestClose={this.closeModal}
          contentLabel='Update Book Form Modal'
          style={customStyles}>
          <div className='form-group'>
            <label htmlFor="inputOne">Book ID</label>
            <input type='text' id='inputOne' className='form-control'
                   onChange={(event) => {this.setState({bookId: event.target.value});}}
            />
          </div>
          <div className='form-group'>
            <label htmlFor="inputTwo">Branch ID</label>
            <input type='text' id='inputTwo' className='form-control'
                   onChange={(event) => {this.setState({branchId: event.target.value});}}
            />
          </div>
          <div className='form-group'>
            <label htmlFor="inputThree">Card Number</label>
            <input type='text' id='inputThree' className='form-control'
                   onChange={(event) => {this.setState({cardNo: event.target.value});}}
                   onKeyPress={this.keyPressHandler}
            />
          </div>
        </ReactModal>
        <button type='button' className='btn btn-success' onClick={this.returnHandler} style={{marginRight : '100px'}}>
          Return Book
        </button>
        <label htmlFor="cardNo">Card Number: </label>
        <input type="text" id='cardNo' onChange={event => {this.setState({cardNo : event.target.value})}}/>
        <table className='table'>
          <thead>
          <tr>
            <th>Book Title</th>
            <th>Author</th>
            <th> </th>
            <th> </th>
          </tr>
          </thead>
          {/*Table body, mapping the information passed from the AuthorList into individual rows.*/}
          <tbody>
          {this.props.bookList.map(this.createBookRow, this)}
          </tbody>
        </table>
      </div>
    )
  }
}

Guest.propTypes = {
  bookList : PropTypes.array.isRequired,
  branchList : PropTypes.array.isRequired
};