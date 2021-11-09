// Expenses Reducer

const menuToggleReducerDefaultState = '';

export default (state = menuToggleReducerDefaultState, action) => {
  switch (action.type) {
    case 'MENU_TOGGLE':
      return action.state
    default:
      return state;
  }
};
