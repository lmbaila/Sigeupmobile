import api from '../api';

export function gradesByEnrollment(enrollmentId) {
  return api.get(`/enrollments/${enrollmentId}/grades`, {
    params: { include: 'discipline' },
  });
}

export function gradesByPeriod(periodId) {
  return api.get(`/periods/${periodId}/grades`);
}

export function allGrades() {
  return api.get('/grades');
}
