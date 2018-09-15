import BranchApi from '../api/branchApi';
import Dispatcher from '../dispatcher/appDispatcher';

const BranchActions = {

  readBranches : () => {
    BranchApi.getAllBranches()
      .then(res => {
        Dispatcher.dispatch({
          actionType : 'read_branches',
          data : res
        });
      })
      .catch(error => {
        console.log("Something went wrong in branchActions.\n");
        console.log(error);
      });
  },

  readBranch : id => {
    BranchApi.getBranch(id)
      .then(res => {
        Dispatcher.dispatch({
          actionType : 'read_branches',
          data : res
        })
      })
      .catch(err => err)
  },

  makeBranch : branch => {
    BranchApi.postBranch(branch)
      .then(res => {
        Dispatcher.dispatch({
          actionType : 'make_branch',
          data : res
        })
      })
      .catch(err => err);
  },

  updateBranch : (id, branch) => {
    BranchApi.putBranch(id, branch)
      .then(res => {
        Dispatcher.dispatch({
          actionType: 'update_branch',
          data: res
        })
      })
      .catch(err => err);
  },

  deleteBranch : id => {
    BranchApi.deleteBranch(id)
      .then(() => {
        Dispatcher.dispatch({
          actionType : 'delete_branch',
          data : id
        })
      })
      .catch(err => {
        console.log('something went wrong in delete');
        console.log(err);
      })
  }
};

module.exports = BranchActions;