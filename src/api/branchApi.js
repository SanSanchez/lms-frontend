'use strict';

import Axios from 'axios';

const BranchApi = {
  getAllBranches : () => {
    return Axios({
      method : 'GET',
      url : 'http://localhost:8800/administrator/branches',
      headers : {
        accept : 'application/json',
      },
      json : true
    })
      .then(res => res.data)
      .catch(err => err);
  },

  getBranch : id => {
    return Axios({
      method : 'GET',
      url : 'http://localhost:8800/administrator/branches/' + id,
      headers : {
        accept : 'application/json',
      },
      json : true
    })
      .then(res => res.data)
      .catch(err => err);
  },

  postBranch : body => {
    return Axios({
      method: 'POST',
      url: 'http://localhost:8800/administrator/branches',
      headers: {
        accept: 'application/json',
      },
      json: true,
      data: body
    })
      .then(res => res.data)
      .catch(err => err)
  },

  putBranch : (id, body) => {
      return Axios({
        method: 'PUT',
        url: 'http://localhost:8800/administrator/branches/' + id,
        headers: {
          accept: 'application/json'
        },
        json: true,
        data: body
      })
        .then(res => res.data)
        .cach(err => err);
  },

  deleteBranch : id => {
    return Axios({
      method: 'DELETE',
      url: 'http://localhost:8800/administrator/branches/' + id,
    })
      .catch(err => err);
  }
};

module.exports = BranchApi;