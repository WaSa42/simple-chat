import uid from 'uid';

// import _fetchTo from '../_fetchTo';
import mock from '../../__mocks__/messages';

// const apiRoot = 'https://localhost:3001';

// const find = ({ skip, limit }, callbacks) => _fetchTo(
//   `${apiRoot}/message/find?skip=${skip}&limit=${limit}`,
//   'GET',
//   undefined,
//   callbacks,
// );

const find = ({ skip, limit, language = 'en' }, callbacks) => {
  const messages = [];
  const data = mock[language];

  const start = data.length - 1 - skip;
  const end = start - limit;

  for (let i = start; i > end; i -= 1) {
    const message = data[i];
    if (!message) {
      break;
    }

    messages.push(message);
  }

  callbacks.onSuccess({
    skip,
    limit,
    totalMessages: data.length,
    messages,
  });
};

// const create = (body, callbacks) => _fetchTo(
//   `${apiRoot}/message/create`,
//   'POST',
//   body,
//   callbacks,
// );

// Return the message sent because there is no API
const create = (body, callbacks) => callbacks.onSuccess({
  message: {
    ...body,
    _id: uid(),
    isHidden: false,
    sentAt: `${new Date().getTime()}`,
  },
});

// const create = (body, callbacks) => _fetchTo(
//   `${apiRoot}/message/update`,
//   'POST',
//   body,
//   callbacks,
// );

// Return the message sent because there is no API
const update = (body, callbacks) => callbacks.onSuccess({
  message: body,
});

export default { create, find, update };
