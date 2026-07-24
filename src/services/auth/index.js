import api from '../api';

export function signin(username, password) {
  const form = new FormData();
  form.append('username', username);
  form.append('password', password);
  return api.post('/auth/login', form, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
}

export function signout() {
  return api.post('/auth/logout');
}
