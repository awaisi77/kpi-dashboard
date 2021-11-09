export default (state = {type:null,message:null}, action) => {
  switch (action.type) {
    case 'SHOW_ALERT':
      return {type:action.alert.type,message:action.alert.message}
    case 'CLEAR_ALERT':
      return {type:null,message:null}
    default:
      return state;
  }
};
