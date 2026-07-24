import MockAdapter from 'axios-mock-adapter';
import api from '../api';
import * as fx from './fixtures';

function readFormField(formData, key) {
  if (formData && typeof formData.get === 'function') {
    return formData.get(key);
  }
  const parts = formData?._parts || [];
  const found = parts.find(([partKey]) => partKey === key);
  return found ? found[1] : undefined;
}

function idFromUrl(url, pattern) {
  const match = url.match(pattern);
  return match ? match[1] : undefined;
}

export function setupFakeApi() {
  const mock = new MockAdapter(api, { delayResponse: 400 });

  mock.onPost('/auth/login').reply((config) => {
    const username = readFormField(config.data, 'username');
    const password = readFormField(config.data, 'password');
    if (username === fx.FAKE_CREDENTIALS.username && password === fx.FAKE_CREDENTIALS.password) {
      return [200, fx.fakeLoginResponse];
    }
    return [404, { message: 'No query results for model [App\\User].' }];
  });

  mock.onPost('/auth/logout').reply(200, { message: 'Successfully logged out' });

  mock.onGet('/informationdocuments').reply(200, fx.paginate(fx.fakeDocuments));

  mock.onGet('/periods').reply(200, fx.paginate(fx.fakePeriods));

  mock.onGet('/enrollments').reply(200, fx.paginate(fx.fakeEnrollments));

  mock.onGet(/\/periods\/[^/]+\/enrollments$/).reply(200, fx.paginate(fx.fakeEnrollments));

  mock.onGet(/\/enrollments\/[^/]+\/grades$/).reply((config) => {
    const id = idFromUrl(config.url, /\/enrollments\/([^/]+)\/grades/);
    if (id === fx.ENROLLMENT_DEBT) {
      return [403, { message: 'Estudante com dívida de 7560 MT no sistema!' }];
    }
    return [200, fx.paginate(fx.fakeGradesByEnrollment[id] || [])];
  });

  mock.onGet(/\/enrollments\/[^/]+\/payments$/).reply(200, fx.paginate(fx.fakePayments));

  mock.onGet(/\/periods\/[^/]+\/grades$/).reply(200, fx.paginate(fx.fakeAllGrades));

  mock.onGet(/\/periods\/[^/]+\/payments$/).reply(200, fx.paginate(fx.fakePayments));

  mock.onGet('/grades').reply(200, fx.paginate(fx.fakeAllGrades));

  mock.onGet('/curricularplans').reply((config) => {
    const page = Number(config.params?.page) || 1;
    return [200, fx.paginate(fx.fakeCurricularPlans, page, 10)];
  });

  mock.onGet('/invoices').reply(200, fx.paginate(fx.fakeInvoices));

  mock.onGet(/\/invoices\/[^/]+\/details$/).reply((config) => {
    const id = idFromUrl(config.url, /\/invoices\/([^/]+)\/details/);
    return [200, fx.paginate(fx.fakeInvoiceDetails[id] || [])];
  });

  mock.onGet('/payments/balance').reply(200, { data: { balance: fx.fakeBalance } });

  mock.onGet('/payments').reply(200, fx.paginate(fx.fakePayments));

  return mock;
}
