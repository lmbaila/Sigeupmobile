// Dados fake para desenvolvimento offline, sem depender da API real.
// Moldados a partir dos exemplos em SIGEUP_API_DOC.html.

export const FAKE_CREDENTIALS = { username: '01.2650.2016', password: '01.2650.2016' };

export const fakeUser = {
  _id: '01.2650.2016',
  full_name: 'BENJAMIM ISRAEL SAMBO',
  course: {
    _id: 'MElPA0JVZoynp1yR6gvq6jwO4GaQb2',
    name: 'Gestão dos Recursos Humanos',
    faculty_id: 'ESCOG',
  },
  regime: {
    _id: '9wmWAPVqeY4yax5bLoOMbp3XDR2Z85',
    name: 'Pós-Laboral',
  },
  quick_links: [{ name: 'Portal SIGEUP', url: 'https://www.sigeup.up.ac.mz/sigeup/index.php' }],
};

export const fakeLoginResponse = {
  access_token: 'fake-token.dev-mode.nao-usar-em-producao',
  token_type: 'Bearer',
  expires_at: '2030-01-01 00:00:00',
  user: fakeUser,
};

export const fakePeriods = [
  { _id: '8avlo9G0yWVexY88vgrNBj2m5dDn7K', year: 2010 },
  { _id: 'QmVna0MjXveZ1ZXX0x46PopKrJq2WB', year: 2011 },
  { _id: '4dQoEPaAVNl0LpEEM1ywkKYRXe2Gzr', year: 2016 },
  { _id: 'dlRjrPwZkqY2gakkbLG8MV6A4yJ7ap', year: 2017 },
  { _id: 'n8rjl4MOz7NYgDwwW16eoGBb3VEkwW', year: 2018 },
];

// A primeira inscrição está confirmada (fluxo normal), a segunda não está
// confirmada, para se poder testar o ecrã de bloqueio por dívida (403).
export const ENROLLMENT_OK = 'y9r85doZaEJGL2dV2vgn6kMX2lRAvj';
export const ENROLLMENT_DEBT = 'k3n7QeZaEJGL2dV2vgn6kMX2lRq9xA';

export const fakeEnrollments = [
  {
    _id: ENROLLMENT_OK,
    period: 2018,
    semester: 2,
    grade: 2,
    payment_reference: '00886570109',
    payment_entity: '88015',
    online: true,
    confirmed: true,
  },
  {
    _id: ENROLLMENT_DEBT,
    period: 2018,
    semester: 1,
    grade: 2,
    payment_reference: '00886570110',
    payment_entity: '88015',
    online: true,
    confirmed: false,
  },
];

export const fakeGradesByEnrollment = {
  [ENROLLMENT_OK]: [
    {
      _id: '6r97OeQAB8wZx6DllV1R4ln3YJjEvG',
      discipline: { _id: 'GRH14', name: 'Métodos de Estudo e Investigação Científica' },
      grade: 2,
      test1: '14',
      test2: '15',
      test3: null,
      work1: '16',
      work2: null,
      work3: null,
      frequency_avg: '15',
      frequency_result: 'Admitido',
      exam: '13',
      exam_recurrence: null,
      final_result: 'Aprovado',
      final_avg: '14',
    },
    {
      _id: '6aNqR43nKyl5LOp88o1GjX9MQOkePA',
      discipline: { _id: 'UP_XX_108_A_04', name: 'Introdução à Economia' },
      grade: 2,
      test1: '9',
      test2: '10',
      test3: null,
      work1: '10',
      work2: null,
      work3: null,
      frequency_avg: '10',
      frequency_result: 'Admitido',
      exam: null,
      exam_recurrence: '11',
      final_result: 'Aprovado',
      final_avg: '11',
    },
    {
      _id: 'X9opQ2aBcD3efG4hI5jK6lM7nO8pQr',
      discipline: { _id: 'GRH20', name: 'Gestão Estratégica de Recursos Humanos' },
      grade: 2,
      test1: null,
      test2: null,
      test3: null,
      work1: null,
      work2: null,
      work3: null,
      frequency_avg: '6',
      frequency_result: 'Reprovado',
      exam: null,
      exam_recurrence: null,
      final_result: 'Reprovado',
      final_avg: null,
    },
  ],
};

export const fakeAllGrades = fakeGradesByEnrollment[ENROLLMENT_OK];

export const fakeBalance = -1750;

export const fakePayments = [
  {
    _id: '5ZWdm49y6KOBx4nq5D1rj8nRQG3VJa',
    description: 'Propina Março 2026',
    debit_date: '2026-03-10',
    debit_ammount: 2805,
    debit_currency: 'MZN',
    payment_date: null,
    credit_ammount: 0,
    credit_currency: 'MZN',
    payment_entity: '88001',
    payment_reference: '00886570313',
    paid: false,
  },
  {
    _id: '8XrRP9zVWbOqLRa6jvx6QYlMJGDB0o',
    description: 'Propina Fevereiro 2026',
    debit_date: '2026-02-10',
    debit_ammount: 2805,
    debit_currency: 'MZN',
    payment_date: '2026-02-15',
    credit_ammount: 2805,
    credit_currency: 'MZN',
    payment_entity: '88001',
    payment_reference: '00886575135',
    paid: true,
  },
];

export const INVOICE_ID = 'R9o4O75WqQKbyLmz1308mePawljGrV';

export const fakeInvoices = [
  {
    _id: INVOICE_ID,
    due_date: '2026-09-14',
    ammount: 100,
    ammount_currency: 'MZN',
    payment_entity: '88036',
    payment_reference: '00886571974',
    paid: false,
  },
];

export const fakeInvoiceDetails = {
  [INVOICE_ID]: [
    {
      _id: '05ZWdm49y6KOBx4ALrj8nRQG3VJaDo',
      ammount: '100.00',
      ammount_currency: 'MZN',
      description: '2ª Via do Cartão de Estudante',
    },
  ],
};

export const fakeDocuments = [
  {
    _id: 'NowOazj6QvDl41wJLeZVGXM7q83RrK',
    name: 'Regulamento Académico',
    mime: 'application/pdf',
    extension: 'pdf',
    size: '242.11 KB',
    url: null,
    description: 'Regulamento académico da Universidade Pedagógica',
  },
  {
    _id: 'PpD02nlK8EB4ago0xAoObG3MeyYkV6',
    name: 'Pauta Síntese Geral',
    mime: 'application/pdf',
    extension: 'pdf',
    size: '1.72 MB',
    url: null,
    description: 'Pauta síntese geral do curso',
  },
];

// 25 disciplinas curriculares fake, para exercitar a paginação (per_page=10 → 3 páginas).
export const fakeCurricularPlans = Array.from({ length: 25 }, (_, index) => ({
  _id: `curriculum-${index + 1}`,
  grade: Math.floor(index / 8) + 1,
  semester: (index % 2) + 1,
  credits: '6.00',
  discipline: { _id: `DISC${index + 1}`, name: `Disciplina Curricular ${index + 1}` },
  course: { _id: 'MElPA0JVZoynp1yR6gvq6jwO4GaQb2', name: 'Gestão dos Recursos Humanos' },
  curriculum: { _id: 'v7QjGa3AZrEDk1e6gwbKMdmlon409J', name: 'PLANO B' },
}));

export function paginate(items, page = 1, perPage = 15) {
  const start = (page - 1) * perPage;
  const data = items.slice(start, start + perPage);
  return {
    data,
    meta: {
      current_page: page,
      last_page: Math.max(1, Math.ceil(items.length / perPage)),
      per_page: perPage,
      total: items.length,
    },
  };
}
