import { normalize } from 'normalizr';
import { messageListSchema } from '../schemas/message';
import { receiveEntities } from './entities';

export const MESSAGES_RESET = 'MESSAGES_RESET';
export const MESSAGES_ADD = 'MESSAGES_ADD';

export function resetMessages() {
  return { type: MESSAGES_RESET };
}

export function addMessages(messages) {
  return (dispatch) => {
    const normalized = normalize(messages, messageListSchema);
    const { result, entities } = normalized;

    dispatch(receiveEntities(entities));
    dispatch({ type: MESSAGES_ADD, ids: result });
  };
}
