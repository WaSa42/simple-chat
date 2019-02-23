import { createReducer } from './_utilities';
import { MESSAGES_RESET, MESSAGES_ADD, MESSAGE_SENT } from '../actions/messages';

const initialState = {
  ids: [],
  limit: 10,
  skip: 0,
  totalMessages: 0,
};

function reset() {
  return initialState;
}

function add(state, { ids, limit, skip, totalMessages }) {
  return {
    ...state,
    ids: Array.from(new Set(state.ids.concat(ids))),
    limit,
    skip,
    totalMessages,
  };
}

function sent(state, { id }) {
  return {
    ...state,
    ids: Array.from(new Set(state.ids.concat([id]))),
    totalMessages: state.totalMessages + 1,
    // skip: state.skip + 1, // If the message were in database we should increment the skip, but it's not
  };
}

export default createReducer(initialState, {
  [MESSAGES_RESET]: reset,
  [MESSAGES_ADD]: add,
  [MESSAGE_SENT]: sent,
});
