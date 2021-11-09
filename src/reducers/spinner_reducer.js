// Expenses Reducer

const siteReducerDefaultState = false;

export default (state = siteReducerDefaultState, action) => {
  switch (action.type) {
    case 'LOADING':
      return action.state
    default:
      return state;
  }
};
