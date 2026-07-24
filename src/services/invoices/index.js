import api from '../api';

export function listInvoices(filter) {
  return api.get('/invoices', {
    params: filter ? { filter } : {},
  });
}

export function invoiceDetails(invoiceId) {
  return api.get(`/invoices/${invoiceId}/details`);
}
