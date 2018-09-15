import BookApi from '../api/bookApi';
import Dispatcher from '../dispatcher/appDispatcher';

const BookActions = {

  readBooks : () => {
    BookApi.getAllBooks()
      .then(res => {
        Dispatcher.dispatch({
          actionType : 'read_books',
          data : res
        });
      })
      .catch(error => {
        console.log("Something went wrong in bookActions.\n");
        console.log(error);
      });
  },

  readBook : (id) => {
    BookApi.getBook(id)
      .then(res => {
        Dispatcher.dispatch({
          actionType : 'read_books',
          data : res
        });
      })
      .catch(res => res);
  },

  makeBook : (book) => {
    BookApi.setBook(book)
      .then(res => {
        Dispatcher.dispatch({
          actionType : 'make_book',
          data : res
        });
      })
      .catch(err => err);
  },

  updateBook : (id, book) => {
    BookApi.updateBook(id, book)
      .then(res => {
        Dispatcher.dispatch({
          actionType : 'update_book',
          data : res
        });
      })
      .catch(err => err)
  },

  deleteBook : (id) => {
    BookApi.deleteBook(id)
      .then(() => {
        Dispatcher.dispatch({
          actionType : 'delete_book',
          data : id
        });
      })
      .then(err => err);
  }
};

module.exports = BookActions;