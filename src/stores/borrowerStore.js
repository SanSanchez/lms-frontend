import Dispatcher from '../dispatcher/appDispatcher';
import {EventEmitter} from 'events';

const CHANGE_EVENT = 'change';

const _borrowerStore = {
  borrowers : []
};

class BorrowerStoreClass extends EventEmitter{

  addChangeListener(cb){
    this.on(CHANGE_EVENT, cb);
  }

  removeChangeListener(cb){
    this.removeListener(CHANGE_EVENT, cb);
  }

  emitChange(){
    this.emit(CHANGE_EVENT);
  }

  getAllBorrowers(){
    return _borrowerStore.borrowers;
  }
}

const BorrowerStore = new BorrowerStoreClass();

Dispatcher.register(action => {

  switch (action.actionType) {
    case 'read_borrowers':
      _borrowerStore.borrowers = action.data;
      BorrowerStore.emitChange();
      break;

    case 'make_borrower':
      _borrowerStore.borrowers.push(action.data);
      BorrowerStore.emitChange();
      break;

    case 'update_borrower':
      _borrowerStore.borrowers.splice(_borrowerStore.borrowers.findIndex(x => x.cardNo === action.data.cardNo), 1, action.data);
      BorrowerStore.emitChange();
      break;

    case 'delete_borrower':
      _borrowerStore.borrowers.splice(_borrowerStore.borrowers.findIndex(x => x.cardNo === action.data), 1);
      BorrowerStore.emitChange();
      break;

    default:
      return;
  }
} );

export default BorrowerStore;