import PublisherApi from '../api/publisherApi';
import Dispatcher from '../dispatcher/appDispatcher';

//Here add all crud actions for Authors

const PublisherActions = {

  readPublishers : () => {
    PublisherApi.getAllPublishers()
      .then(res => {
        Dispatcher.dispatch({
          actionType : 'read_publishers',
          data : res
        });
      })
      .catch(error => {
        console.log("Something went wrong in publisherActions.\n");
        console.log(error);
      });
  },

  readPublisher : id => {
    PublisherApi.getPublisher(id)
      .then(res => {
        Dispatcher.dispatch({
          actionType : 'read_publishers',
          data : res
        })
      })
      .catch(err => err)
  },

  makePublisher : publisher => {
    PublisherApi.postPublisher(publisher)
      .then(res => {
        Dispatcher.dispatch({
          actionType : 'make_publisher',
          data : res
        })
      })
      .catch(err => err);
  },

  updatePublisher : (id, publisher) => {
    PublisherApi.putPublisher(id, publisher)
      .then(res => {
        Dispatcher.dispatch({
          actionType: 'update_publisher',
          data: res
        })
      })
      .catch(err => err);
  },

  deletePublisher : id => {
    PublisherApi.deletePublisher(id)
      .then(() => {
        Dispatcher.dispatch({
          actionType : 'delete_publisher',
          data : id
        })
      })
      .catch(err => {
        console.log('something went wrong in delete');
        console.log(err);
      })
  }
};

module.exports = PublisherActions;