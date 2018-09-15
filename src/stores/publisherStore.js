import Dispatcher from '../dispatcher/appDispatcher';
import {EventEmitter} from 'events';

const CHANGE_EVENT = 'change';

const _publisherStore = {
  publishers : []
};

class PublisherStoreClass extends EventEmitter{

  addChangeListener(cb){
    this.on(CHANGE_EVENT, cb);
  }

  removeChangeListener(cb){
    this.removeListener(CHANGE_EVENT, cb);
  }

  emitChange(){
    this.emit(CHANGE_EVENT);
  }

  getAllPublishers(){
    return _publisherStore.publishers;
  }
}

const PublisherStore = new PublisherStoreClass();

Dispatcher.register(action => {

  switch (action.actionType) {
    case 'read_publishers':
      _publisherStore.publishers = action.data;
      PublisherStore.emitChange();
      break;

    case 'make_publisher':
      _publisherStore.publishers.push(action.data);
      PublisherStore.emitChange();
      break;

    case 'update_publisher':
      _publisherStore.publishers.splice(_publisherStore.publishers.findIndex(x => x.publisherId === action.data.publisherId), 1, action.data);
      PublisherStore.emitChange();
      break;

    case 'delete_publisher':
      _publisherStore.publishers.splice(_publisherStore.publishers.findIndex(x => x.publisherId === action.data), 1);
      PublisherStore.emitChange();
      break;

    default:
      return;
  }
} );

export default PublisherStore;