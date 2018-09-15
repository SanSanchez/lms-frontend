import LibrarianApi from '../api/librarianApi';
import Dispatcher from '../dispatcher/appDispatcher';

//Here add all crud actions for Librarians

const LibrarianActions = {

  getCopies : branchId => {
    LibrarianApi.getCopies(branchId)
      .then(res => {
        Dispatcher.dispatch({
          actionType : 'read_librarians',
          data : res
        });
      })
      .catch(error => {
        console.log("Something went wrong in librarianActions.\n");
        console.log(error);
      });
  },

  updateBranchDetails : (branchId,  body) => {
    LibrarianApi.updateBranchDetails(branchId, body)
      .then(res => {
        Dispatcher.dispatch({
          actionType : 'update_branch',
          data : res
        });
      })
      .catch(err => err);
  },

  updateBookCopies : (branchId, bookId, body) => {
    LibrarianApi.updateBookCopies(branchId, bookId, body)
      .then(res => {
        Dispatcher.dispatch({
          actionType : 'update_copies',
          data : res
        });
      })
      .catch(err => err);
}
};

module.exports = LibrarianActions;