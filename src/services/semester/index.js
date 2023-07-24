import api from '../api';

export function semester() {
  return api.get('/enrollments');
}

export function semesterNotes(_id) {
  return api.get(`/enrollments/${_id}/grades?include=discipline`);
}
