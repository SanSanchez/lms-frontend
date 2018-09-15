"use strict";

import Axios from "axios";

const BookApi = {
  getAllBooks : () => {
    return Axios({
      method : 'GET',
      url : 'http://localhost:8800/administrator/books',
      headers : {
        accept : 'application/json'
      },
      json : true
    })
      .then(res => res.data)
      .catch(error => {
        console.log("Something bad happened in getAllBooks");
        console.log(error);
      });
  },

  getBook : id => {
    return Axios({
      method: 'GET',
      url: "http://localhost:8800/administrator/books/" + id,
      headers : {
        accept : 'application/json'
      },
      json : true
    })
      .then(res => res.data)
  },

  setBook : (body) => {
    return Axios({
      method : 'POST',
      url : 'http://localhost:8800/administrator/book',
      headers : {
        accept : 'application/json',
        contentType : 'application/json'
      },
      data : body,
      json : true
    })
      .catch(error => {
        console.log('Something went wrong in the book posting.\n' + error);
      })
  },

  updateBook : (id, body) => {
    return Axios({
      method : 'PUT',
      url : 'http://localhost:8800/administrator/books/' + id,
      headers : {
        accept : 'application/json',
        contentType : 'application/json'
      },
      data : body,
      json : true
    })
      .then(res => res.data)
      .catch(error => {
        console.log('Error in updating books.\n' + error);
      })
  },

  deleteBook : id => {
    return Axios({
      method : 'DELETE',
      url : 'http://localhost:8800/administrator/books/' + id,
    })
      .then(() => id)
      .catch(error => {
        console.log(error);
      })
  }
};

module.exports = BookApi;