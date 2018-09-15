import AuthorApi from '../api/authorApi';
import Dispatcher from '../dispatcher/appDispatcher';

//Here add all crud actions for Authors

const AuthorActions = {

  readAuthors : () => {
    AuthorApi.getAllAuthors()
      .then(res => {
        Dispatcher.dispatch({
          actionType : 'read_authors',
          data : res
        });
      })
      .catch(error => {
        console.log("Something went wrong in authorActions.\n");
        console.log(error);
      });
  },

  readAuthor : id => {
    AuthorApi.getAuthor(id)
      .then(res => {
        Dispatcher.dispatch({
          actionType : 'read_authors',
          data : res
        });
      })
      .catch(err => err);
  },

  makeAuthor : author => {
    AuthorApi.postAuthor(author)
      .then(res => {
        Dispatcher.dispatch({
          actionType : 'make_author',
          data : res
        })
      })
      .then(err => err);

  },

  updateAuthor : (id, author) => {
    AuthorApi.putAuthor(id, author)
      .then(res => {
        Dispatcher.dispatch({
          actionType : 'update_author',
          data : res
        })
      })
      .catch(err => err);
  },

  deleteAuthor : id => {
    AuthorApi.deleteAuthor(id)
      .then(() => {
        Dispatcher.dispatch({
          actionType: 'delete_author',
          data: id
        });
      })
      .catch(err => err);
  }
};

module.exports = AuthorActions;