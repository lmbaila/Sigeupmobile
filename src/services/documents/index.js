import api from '../api';

export function listDocuments() {
  return api.get('/informationdocuments');
}
