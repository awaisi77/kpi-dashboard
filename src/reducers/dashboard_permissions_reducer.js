// Expenses Reducer

const dashboardPermissionDefaultState = {
};


export default (state = dashboardPermissionDefaultState, action) => {
  switch (action.type) {
    case 'GET_PERMISIONS':
      return action.permissions;
    default:
      return state;
  }
};
