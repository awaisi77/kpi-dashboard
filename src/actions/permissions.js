import {getPermissions} from '../services/api'
export const pullDashboardPermissions =   () => {
  return  (dispatch) => {
    getPermissions.then(function(data){
        dispatch(infoAction(data.data));
    }).catch(
    )
  };
};

export const infoAction = (permissions) => {
  return {
    type:"GET_PERMISIONS",
    "permissions":permissions
  }
};
