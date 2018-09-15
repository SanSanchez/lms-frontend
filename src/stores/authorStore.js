import Dispatcher from '../dispatcher/appDispatcher';
import {EventEmitter} from 'events';


const CHANGE_EVENT = 'change';

const _authorStore = {
  authors : []
};

class AuthorStoreClass extends EventEmitter{

  addChangeListener(cb){
    this.on(CHANGE_EVENT, cb);
  }

  removeChangeListener(cb){
    this.removeListener(CHANGE_EVENT, cb);
  }

  emitChange(){
    this.emit(CHANGE_EVENT);
  }

  getAllAuthors(){
    return _authorStore.authors;
  }
}

const AuthorStore = new AuthorStoreClass();

Dispatcher.register((action) => {

  switch (action.actionType) {
    case 'read_authors':
      _authorStore.authors = action.data;
      AuthorStore.emitChange();
      break;

    case 'make_author':
      _authorStore.authors.push(action.data);
      AuthorStore.emitChange();
      break;

    case 'update_author':
      _authorStore.authors.splice(_authorStore.authors.findIndex(x => x.authorId === action.data.authorId), 1, action.data);
      AuthorStore.emitChange();
      break;

    case 'delete_author':
      _authorStore.authors.splice(_authorStore.authors.findIndex(x => x.authorId === action.data), 1);
      AuthorStore.emitChange();
      break;

    default:
      return;
  }
} );

export default AuthorStore;