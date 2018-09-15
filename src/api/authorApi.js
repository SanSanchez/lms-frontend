'use strict';

import Axios from 'axios';

const AuthorApi = {
  getAllAuthors : () => {
    return Axios({
      method : 'GET',
      url : 'http://localhost:8800/administrator/authors',
      headers : {
        accept : 'application/json'
      },
      json : true
    })
      .then(res => res.data)
      .catch(error => {
        console.log("error in getAllAuthors");
        console.log(error)
      })
  },

  getAuthor : id => {
    return Axios({
      method : 'GET',
      url : 'http://localhost:8800/administrator/authors/' + id,
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

  postAuthor : author => {
    return Axios({
      method : 'POST',
      url : 'http://localhost:8800/administrator/author',
      headers : {
        accept : 'application/json',
        contentType : 'application/json'
      },
      data : author,
      json : true
    })
      .then(res => res.data)
      .catch(error => {
        console.log(error);
        }
      )
  },

  putAuthor : (id, author) => {
    return Axios({
      method : 'PUT',
      url : 'http://localhost:8800/administrator/authors/' + id,
      headers : {
        accept : 'application/json',
        contentType : 'application/json'
      },
      data : author,
      json : true
    })
      .then(res => res.data)
      .catch(err => {
        console.log(err);
        }
      )
  },

  deleteAuthor : id => {
    return Axios({
      method : 'DELETE',
      url : 'http://localhost:8800/administrator/authors/' + id,
      headers : {
        accept : 'application/json'
      },
      json : true
    })
      .then(res => res.data)
      .catch(err => {
        console.log(err);
      })
  }
};

module.exports = AuthorApi;