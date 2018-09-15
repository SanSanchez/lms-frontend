'use strict';

import Axios from 'axios';

const GuestApi = {
  getAllBorrowers : () => {
    return Axios({
      method : 'GET',
      url : 'http://localhost:8800/borrower',
      headers : {
        accept : 'application/json'
      },
      json : true
    })
      .then(res => res.data)
      .catch(error => {
        console.log("error in getAllGuests");
        console.log(error)
      })
  },

  getLoans : cardNo => {
    return Axios({
      method : 'GET',
      url : 'http://localhost:8800/borrower/' + id + '/loans',
      headers : {
        accept : 'application/json'
      },
      json : true
    })
      .then (res => res.data)
      .catch(err => err)
  },

  checkout : (cardNo, branchId, title) => {
    return Axios({
      method : 'POST',
      url : 'http://localhost:8800/borrower/' + cardNo + '/loans/branches/' + branchId + '/books',
      headers : {
        accept : 'application/json',
        contentType : 'application/json'
      },
      data : title,
      json : true
    })
      .then(res => res.data)
      .catch(error => {
          console.log(error);
        }
      )
  },

  returnBook : (cardNo, branchId, bookId) => {
    return Axios({
      method : 'DELETE',
      url : 'http://localhost:8800/borrower/' + cardNo + '/loans/branches/' + branchId + '/books/' + bookId,
    })
      .catch(err => {
          console.log(err);
        }
      )
  }
};

module.exports = GuestApi;