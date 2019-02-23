import { createReducer } from './_utilities';
import { MESSAGES_RESET, MESSAGES_ADD } from '../actions/messages';

const initialState = {
  ids: [],
  limit: 10,
  skip: 0,
  totalMessages: 0,
  updatedAt: null,
};

function resetMessages() {
  return initialState;
}

function addMessages(state, { ids, limit, skip, totalMessages }) {
  return {
    ...state,
    ids: Array.from(new Set(state.ids.concat(ids))),
    limit,
    needRefresh: false,
    skip,
    totalMessages,
    updatedAt: Date.now(),
  };
}

export default createReducer(initialState, {
  [MESSAGES_RESET]: resetMessages,
  [MESSAGES_ADD]: addMessages,
});
