'use strict';

import React from 'react';
import PropTypes from 'prop-types';
import LibrarianActions from '../actions/librarianActions';

// Custom styling for the model component.
export class LibList extends React.Component {
  constructor() {
    super();

    this.state = {
      bookId : 0,
      branchId : 0,
      copiesNo : 0
    };

    this.keyPressHandler = this.keyPressHandler.bind(this);
    this.submitHandler = this.submitHandler.bind(this);
  }


  submitHandler() {
    const Copies = {
      bookId : this.state.bookId,
      branchId : this.state.branchId,
      noOfCopies: this.state.copiesNo,
    };

    LibrarianActions.updateBookCopies(this.state.branchId, this.state.bookId, Copies);
  }

  // Handler for key press events.
  // Used for submitting the modal information.
  keyPressHandler(event) {
    if (event.key === 'Enter') {
      this.submitHandler();
    }
  }

  UNSAFE_componentWillMount(){
    LibrarianActions.getCopies(this.state.branchId);
  }

  render() {
    return(
      <div>
        <h1>Book Copies</h1>
        <div className='form-group'>
          <label htmlFor="inputOne">Book ID</label>
          <input type='text' id='inputTwo' className='form-control'
                 onChange={(event) => {this.setState({bookId: event.target.value});}}
          />
          <div className='form-group'>
            <label htmlFor="inputTwo">Branch ID</label>
            <input type='text' id='inputTwo' className='form-control'
                   onChange={(event) => {this.setState({branchId: event.target.value});}}
            />
          </div>
          <div className='form-group'>
            <label htmlFor="inputThree">Number of Copies</label>
            <input type='text' id='inputTwo' className='form-control'
                   onChange={(event) => {this.setState({copiesNo: event.target.value});}}
            />
          </div>
          <div className='form-group'>
            <button className='btn btn-success' onClick={this.submitHandler}>Submit</button>
          </div>
        </div>
      </div>
    );
  }
}

/*
  Issues with this page:
    - I directly alter the state.
    - On updates, the current name is not initially set in the text input.
    - Don't have multiple modals or a configurable modal.
 */