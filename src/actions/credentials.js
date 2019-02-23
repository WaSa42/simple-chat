export const CREDENTIALS_RESET = 'CREDENTIALS_RESET';
export const CREDENTIALS_UPDATE = 'CREDENTIALS_UPDATE';

export function resetCredentials() {
  return { type: CREDENTIALS_RESET };
}

export function updateCredentials(credentials) {
  return { type: CREDENTIALS_UPDATE, ...credentials };
}
