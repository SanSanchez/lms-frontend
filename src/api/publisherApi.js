'use strict';

import Axios from 'axios';

const PublisherApi = {
  getAllPublishers : () => {
    return Axios({
      method : 'GET',
      url : 'http://localhost:8800/administrator/publishers',
      headers : {
        accept : 'application/json'
      },
      json : true
    })
      .then(res => res.data)
      .catch(error => {
        console.log("error in getAllPublishers");
        console.log(error)
      })
  },

  getPublisher : id => {
    return Axios({
      method : 'GET',
      url : 'http://localhost:8800/administrator/publishers/' + id,
      headers : {
        accept : 'application/json'
      },
      json : true
    })
      .then(res => res.data)
      .catch(error => {
        console.log(error);
      })
  },

  postPublisher : publisher => {
    // console.log(publisher);
    return Axios({
      method : 'POST',
      url : 'http://localhost:8800/administrator/publisher',
      headers : {
        accept : 'application/json',
        contentType : 'application/json'
      },
      data : publisher,
      json : true
    })
      .then(res => res.data)
      .catch(error => {
        console.log(error);
        }
      )
  },

  putPublisher : (id, publisher) => {
    return Axios({
      method : 'PUT',
      url : 'http://localhost:8800/administrator/publishers/' + id,
      headers : {
        accept : 'application/json',
        contentType : 'application/json'
      },
      data : publisher,
      json : true
    })
      .then(res => res.data)
      .catch(err => {
        console.log(err);
        }
      )
  },

  deletePublisher : id => {
    return Axios({
      method : 'DELETE',
      url : 'http://localhost:8800/administrator/publishers/' + id,
      json : true
    })
      .catch(err => {
        console.log('error happened in delete.');
        console.log(err);
      })
  }
};

module.exports = PublisherApi;