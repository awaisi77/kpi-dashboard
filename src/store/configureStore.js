import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import dashboardPermissionReducer from '../reducers/dashboard_permissions_reducer'
import menuToggleReducer from '../reducers/menu_toggle_reducer'
import spinnerReducer from '../reducers/spinner_reducer'
import alertReducer from '../reducers/alert_reducer'

export default () => {
  const store = createStore(
    combineReducers({
      spinner:spinnerReducer,
      alert:alertReducer,
      permissions:dashboardPermissionReducer,
        menuToggle:menuToggleReducer,
    }),
    compose(applyMiddleware(thunk))
  );

  return store;
};
