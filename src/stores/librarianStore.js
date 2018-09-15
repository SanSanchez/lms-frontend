import Dispatcher from '../dispatcher/appDispatcher';
import {EventEmitter} from 'events';

const CHANGE_EVENT = 'change';

const _librarianStore = {
  librarians : []
};

class LibrarianStoreClass extends EventEmitter{

  addChangeListener(cb){
    this.on(CHANGE_EVENT, cb);
  }

  removeChangeListener(cb){
    this.removeListener(CHANGE_EVENT, cb);
  }

  emitChange(){
    this.emit(CHANGE_EVENT);
  }

  getAllLibrarians(){
    return _librarianStore.librarians;
  }
}

const LibrarianStore = new LibrarianStoreClass();

Dispatcher.register(action => {

  switch (action.actionType) {
    case 'read_librarians':
      _librarianStore.librarians = action.data;
      LibrarianStore.emitChange();
      break;

    case 'make_librarian':
      _librarianStore.librarians.push(action.data);
      LibrarianStore.emitChange();
      break;

    case 'update_librarian':
      _librarianStore.librarians.splice(_librarianStore.librarians.findIndex(x => x.bookId === action.data.bookId), 1, action.data);
      LibrarianStore.emitChange();
      break;

    case 'delete_librarian':
      _librarianStore.librarians.splice(_librarianStore.librarians.findIndex(x => x.bookId === action.data), 1);
      LibrarianStore.emitChange();
      break;

    default:
      return;
  }
} );

export default LibrarianStore;