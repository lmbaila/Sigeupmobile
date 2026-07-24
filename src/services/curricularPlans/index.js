import api from '../api';

export function listCurricularPlans({ page = 1 } = {}) {
  return api.get('/curricularplans', {
    params: {
      include: 'curriculum,discipline,course',
      order: 'grade,semester',
      direction: 'asc',
      page,
    },
  });
}
