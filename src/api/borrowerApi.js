'use strict';

import Axios from 'axios';

const BorrowerApi = {
  getAllBorrowers : () => {
    return Axios({
      method : 'GET',
      url : 'http://localhost:8800/administrator/borrowers',
      headers : {
        accept : 'application/json'
      },
      json : true
    })
      .then(res => res.data)
      .catch(error => {
        console.log("error in getAllBorrowers");
        console.log(error)
      })
  },

  getBorrower : id => {
    return Axios({
      method : 'GET',
      url : 'http://localhost:8800/administrator/borrowers/' + id,
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

  postBorrower : borrower => {
    return Axios({
      method : 'POST',
      url : 'http://localhost:8800/administrator/borrower',
      headers : {
        accept : 'application/json',
        contentType : 'application/json'
      },
      data : borrower,
      json : true
    })
      .then(res => res.data)
      .catch(error => {
          console.log(error);
        }
      )
  },

  putBorrower : (id, borrower) => {
    return Axios({
      method : 'PUT',
      url : 'http://localhost:8800/administrator/borrowers/' + id,
      headers : {
        accept : 'application/json',
        contentType : 'application/json'
      },
      data : borrower,
      json : true
    })
      .then(res => res.data)
      .catch(err => {
          console.log(err);
        }
      )
  },

  deleteBorrower : id => {
    return Axios({
      method : 'DELETE',
      url : 'http://localhost:8800/administrator/borrowers/' + id,
      json : true
    })
      .catch(err => {
        console.log('error happened in delete.');
        console.log(err);
      })
  }
};

module.exports = BorrowerApi;