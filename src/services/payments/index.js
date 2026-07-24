import api from '../api';

export function paymentsByEnrollment(enrollmentId) {
  return api.get(`/enrollments/${enrollmentId}/payments`);
}

export function paymentsByPeriod(periodId, filter) {
  return api.get(`/periods/${periodId}/payments`, {
    params: filter ? { filter } : {},
  });
}

export function allPayments() {
  return api.get('/payments');
}

export function balance() {
  return api.get('/payments/balance');
}
