'use strict';

import Axios from 'axios';

const LibrarianApi = {

  getCopies : branchId  => {
    return Axios({
      method : 'GET',
      url : 'http://localhost:8800/librarian/branches/' + branchId + '/copies',
      headers : {
        accept : 'application/json'
      },
      json : true
    })
      .then (res => res.data)
      .catch(err => err)
  },

  updateBranchDetails : (branchId, body)=> {
    return Axios({
      method : 'PUT',
      url : 'http://localhost:8800/librarian/branches/' + branchId,
      headers : {
        contentType : 'application/json',
        accept : 'application/json'
      },
      json: true,
      data : body
    })
      .then(res => res.data)
      .catch(err => {
          console.log(err);
        }
      )
  },

  updateBookCopies : (branchId, bookId, body) => {
    console.log(body);
    return Axios({
      method : 'PUT',
      url : 'http://localhost:8800/librarian/branches/' + branchId + '/copies/' + bookId,
      headers : {
        contentType : 'application/json',
        accept : 'application/json'
      },
      json : true,
      data : body
    })
  }
};

module.exports = LibrarianApi;