import { createReducer } from './_utilities';
import { CREDENTIALS_RESET, CREDENTIALS_UPDATE } from '../actions/credentials';

const initialState = {
  _id: 'defaultId',
  profile: {
    picture: null,
  },
  userName: 'Romain',
};

function reset() {
  return initialState;
}

function update(state, { _id, userName, profile }) {
  return {
    ...state,
    _id,
    profile,
    userName,
  };
}

export default createReducer(initialState, {
  [CREDENTIALS_RESET]: reset,
  [CREDENTIALS_UPDATE]: update,
});
