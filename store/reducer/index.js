import authReducer from './auth';
import destinationReducer from './destinations';

const { combineReducers } = require('redux');

const rootReducers = combineReducers({
  destinations: destinationReducer,
  auth: authReducer,
});

export default rootReducers;
