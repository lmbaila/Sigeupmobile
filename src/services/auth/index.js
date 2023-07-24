import api from '../api';

export function signin(username, password) {
  return api.post('/auth/login', { username, password });
}
