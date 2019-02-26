import { normalize } from 'normalizr';
import { messageListSchema, messageSchema } from '../schemas/message';
import { receiveEntities } from './entities';

export const MESSAGES_RESET = 'MESSAGES_RESET';
export const MESSAGES_ADD = 'MESSAGES_ADD';
export const MESSAGE_SENT = 'MESSAGE_SENT';

export function resetMessages() {
  return { type: MESSAGES_RESET };
}

export function addMessages(response) {
  const { messages, totalMessages, skip, limit } = response;

  return (dispatch) => {
    const normalized = normalize(messages, messageListSchema);
    const { result, entities } = normalized;

    dispatch(receiveEntities(entities));
    dispatch({ type: MESSAGES_ADD, ids: result, totalMessages, skip, limit });
  };
}

export function addSentMessage(response) {
  const { message } = response;

  return (dispatch) => {
    const normalized = normalize(message, messageSchema);
    const { result, entities } = normalized;

    dispatch(receiveEntities(entities));
    dispatch({ type: MESSAGE_SENT, id: result });
  };
}

export function updateMessage(response) {
  const { message } = response;

  return (dispatch) => {
    const normalized = normalize(message, messageSchema);
    const { entities } = normalized;

    dispatch(receiveEntities(entities));
  };
}
