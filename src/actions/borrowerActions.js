import BorrowerApi from '../api/borrowerApi';
import Dispatcher from '../dispatcher/appDispatcher';

//Here add all crud actions for Authors

const BorrowerActions = {

  readBorrowers : () => {
    BorrowerApi.getAllBorrowers()
      .then(res => {
        Dispatcher.dispatch({
          actionType : 'read_borrowers',
          data : res
        });
      })
      .catch(error => {
        console.log("Something went wrong in borrowerActions.\n");
        console.log(error);
      });
  },

  readBorrower : id => {
    BorrowerApi.getBorrower(id)
      .then(res => {
        Dispatcher.dispatch({
          actionType : 'read_borrowers',
          data : res
        })
      })
      .catch(err => err)
  },

  makeBorrower : borrower => {
    BorrowerApi.postBorrower(borrower)
      .then(res => {
        Dispatcher.dispatch({
          actionType : 'make_borrower',
          data : res
        })
      })
      .catch(err => err);
  },

  updateBorrower : (id, borrower) => {
    BorrowerApi.putBorrower(id, borrower)
      .then(res => {
        Dispatcher.dispatch({
          actionType: 'update_borrower',
          data: res
        })
      })
      .catch(err => err);
  },

  deleteBorrower : id => {
    BorrowerApi.deleteBorrower(id)
      .then(() => {
        Dispatcher.dispatch({
          actionType : 'delete_borrower',
          data : id
        })
      })
      .catch(err => {
        console.log('something went wrong in delete');
        console.log(err);
      })
  }
};

module.exports = BorrowerActions;