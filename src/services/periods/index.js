import api from '../api';

export function listPeriods({ onlyWithEnrollments = false } = {}) {
  return api.get('/periods', {
    params: {
      order: 'id',
      ...(onlyWithEnrollments ? { filter: 'enrollments' } : {}),
    },
  });
}
