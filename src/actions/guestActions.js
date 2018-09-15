import GuestApi from '../api/guestApi';
import Dispatcher from '../dispatcher/appDispatcher';

//Here add all crud actions for Guests

const GuestActions = {

  readBorrowers : () => {
    GuestApi.getAllBorrowers()
      .then(res => {
        Dispatcher.dispatch({
          actionType : 'read_guests',
          data : res
        });
      })
      .catch(error => {
        console.log("Something went wrong in guestActions.\n");
        console.log(error);
      });
  },

  readLoans : cardNo => {
    GuestApi.getLoans(cardNo)
      .then(res => {
        Dispatcher.dispatch({
          actionType : 'read_loans',
          data : res
        });
      })
      .catch(err => err);
  },

  makeLoan : (cardNo, branchId, title) => {
    GuestApi.checkout(cardNo, branchId, title)
      .then(res => {
        Dispatcher.dispatch({
          actionType : 'make_loan',
          data : res
        })
      })
      .then(err => err);

  },

  returnBook : (cardNo, branchId, bookId) => {
    GuestApi.returnBook(cardNo, branchId, bookId)
      .then(res => {
        Dispatcher.dispatch({
          actionType : 'delete_loan',
          data : res
        })
      })
      .catch(err => err);
  }
};

module.exports = GuestActions;