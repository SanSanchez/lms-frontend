import Dispatcher from '../dispatcher/appDispatcher';
import {EventEmitter} from 'events';

const CHANGE_EVENT = 'change';

const _branchStore = {
  branches : []
};

class BranchStoreClass extends EventEmitter {
  addChangeListener(cb) {
    this.on(CHANGE_EVENT, cb);
  }

  removeChangeListener(cb) {
    this.removeListener(CHANGE_EVENT, cb)
  }

  emitChange() {
    this.emit(CHANGE_EVENT);
  }

  getAllBranches() {
    return _branchStore.branches;
  }
}

const BranchStore = new BranchStoreClass();

Dispatcher.register((action) => {

  switch (action.actionType) {
    case 'read_branches':
      _branchStore.branches = action.data;
      BranchStore.emitChange();
      break;

    case 'make_branch':
      _branchStore.branches.push(action.data);
      BranchStore.emitChange();
      break;

    case 'update_branch':
      _branchStore.branches.splice(_branchStore.branches.findIndex(x => x.branchId === action.data.branchId), 1, action.data);
      BranchStore.emitChange();
      break;

    case 'delete_branch':
      _branchStore.branches.splice(_branchStore.branches.findIndex(x => x.branchId === action.data), 1);
      BranchStore.emitChange();
      break;
      
    default:
      return;
  }
});

export default BranchStore;