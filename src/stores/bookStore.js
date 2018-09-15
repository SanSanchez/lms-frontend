import Dispatcher from '../dispatcher/appDispatcher';
import {EventEmitter} from 'events';

const CHANGE_EVENT = 'change';

const _bookStore = {
  books : []
};

class BookStoreClass extends EventEmitter{

    addChangeListener(cb){
        this.on(CHANGE_EVENT, cb);
    }

    removeChangeListener(cb){
        this.removeListener(CHANGE_EVENT, cb);
    }

    emitChange(){
        this.emit(CHANGE_EVENT);
    }

    getAllBooks(){
        return _bookStore.books;
    }
}

const BookStore = new BookStoreClass();

Dispatcher.register((action) => {

    switch (action.actionType) {
      case 'read_books':
        _bookStore.books = action.data;
        BookStore.emitChange();
        break;

      case 'make_book':
        _bookStore.books.push(action.data);
        BookStore.emitChange();
        break;

      case 'update_book':
        _bookStore.books.splice(_bookStore.books.findIndex(x => x.bookId === action.data.bookId), 1, action.data);
        BookStore.emitChange();
        break;

      case 'delete_book':
        _bookStore.books.splice(_bookStore.books.findIndex(x => x.bookId === action.data), 1);
        BookStore.emitChange();
        break;

      default:
        return;
    }
} );

export default BookStore;