import _fetchTo from '../_fetchTo';

const apiRoot = 'https://localhost:3001';

const find = ({ skip, limit }, callbacks) => _fetchTo(
  `${apiRoot}/message/find?skip=${skip}&limit=${limit}`,
  'GET',
  undefined,
  callbacks,
);

const create = (body, callbacks) => _fetchTo(
  `${apiRoot}/message/create`,
  'POST',
  body,
  callbacks,
);

export default { create, find };
