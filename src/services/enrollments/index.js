import api from '../api';

export function listEnrollments() {
  return api.get('/enrollments');
}

export function listEnrollmentsByPeriod(periodId) {
  return api.get(`/periods/${periodId}/enrollments`);
}
