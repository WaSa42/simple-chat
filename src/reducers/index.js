import { combineReducers } from 'redux';
import storage from 'redux-persist/lib/storage';

import { RESET_APP } from '../actions/app';

import credentials from './credentials';
import entities from './entities';
import messages from './messages';

const appReducer = combineReducers({
  credentials,
  entities,
  messages,
});

const rootReducer = (state, action) => {
  let newState = state;

  if (action.type === RESET_APP) {
    if (storage && storage.removeItem) {
      Object.keys(state).forEach((key) => {
        storage.removeItem(`persist:${key}`);
      });
    }
    newState = undefined;
  }
  return appReducer(newState, action);
};

export default rootReducer;
