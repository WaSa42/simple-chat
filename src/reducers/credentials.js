import { createReducer } from './_utilities';
import { CREDENTIALS_RESET, CREDENTIALS_UPDATE } from '../actions/credentials';
import avatar3 from '../assets/images/avatar3.png';

const initialState = {
  _id: 'defaultId',
  userName: null,
  profile: {
    picture: avatar3,
  },
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
