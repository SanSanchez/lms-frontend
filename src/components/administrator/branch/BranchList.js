'use strict';

import React from 'react';
import PropTypes from 'prop-types';
import BranchActions from '../../../actions/branchActions';
import ReactModal from 'react-modal';
import BranchStore from '../../../stores/branchStore'

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

export class BranchList extends React.Component {
  constructor() {
    super();

    this.state = {
      modalIsOpen : false,              // Boolean stating whether or not the modal is present on the screen
      action : '',                      // Small string for passing some text around.
      createNew : false,                // Determines the action taken by the submit button.
      name : '',
      address : '',
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

  componentDidMount() {
    BranchStore.on("change", () => {this.setState({pubList : BranchStore.getAllBranches()})});
  }

  // Handler for the 'Add Branch' button.
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
    BranchActions.deleteBranch(id);
  }

  submitHandler() {
    const Branch = {
      branchId : this.state.tempId,
      branchName : this.state.name,
      branchAddress : this.state.address,
    };

    if (this.state.createNew) {
      BranchActions.makeBranch(Branch);
    } else {
      BranchActions.updateBranch(this.state.tempId, Branch);
    }

    this.closeModal();
    BranchActions.readBranches();
  }

  // Handler for key press events.
  // Used for submitting the modal information.
  keyPressHandler(event) {
    if (event.key === 'Enter') {
      this.submitHandler();
    }
  }

  UNSAFE_componentWillMount(){
    BranchActions.readBranches();
  }

  createBranchRow(props) {
    return (
      <tr key={props.branchId}>
        <td> {props.branchName} </td>
        <td> {props.branchAddress} </td>
        <td>
          <button className='btn btn-primary' onClick={e => {this.updateHandler(e, props.branchId)}}>
            Update
          </button>
          <button className='btn btn-danger' onClick={e => {this.deleteHandler(e, props.branchId)}}>
            Delete
          </button>
        </td>
      </tr>
    )
  }

  render() {
    return(
      <div>
        <h1>Branches</h1>
        <button type='button' className='btn btn-success' onClick={this.addHandler}>
          Add Branch
        </button>
        {/*Modal Component*/}
        <ReactModal
          isOpen={this.state.modalIsOpen}
          onRequestClose={this.closeModal}
          contentLabel='Update Branch Form Modal'
          style={customStyles}>
          <div className='form-group'>
            <label htmlFor="inputOne">Branch Name</label>
            <input type='text' id='inputOne' className='form-control'
                   onChange={(event) => {this.setState({name: event.target.value});}}
            />
          </div>
          <div className='form-group'>
            <label htmlFor="inputTwo">Branch Address</label>
            <input type='text' id='inputTwo' className='form-control'
                   onChange={(event) => {this.setState({address: event.target.value});}}
                   onKeyPress={this.keyPressHandler}
            />
          </div>
        </ReactModal>
        <table className='table'>
          <thead>
          <tr>
            <th>Branch</th>
            <th>Address</th>
            <th>Phone Number</th>
            <th> </th>
          </tr>
          </thead>
          {/*Table body, mapping the information passed from the BranchList into individual rows.*/}
          <tbody>
          {this.props.branchList.map(this.createBranchRow, this)}
          </tbody>
        </table>
      </div>
    );
  }
}

BranchList.propTypes = {
  branchList: PropTypes.array.isRequired
};

/*
  Issues with this page:
    - I directly alter the state.
    - On updates, the current name is not initially set in the text input.
    - Don't have multiple modals or a configurable modal.
 */

// TODO: On Deletes, have a confirmation box come up before actually deleting it.