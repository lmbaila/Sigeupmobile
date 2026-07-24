// Paleta inspirada na identidade visual oficial da Universidade Pedagógica
// (extraída do CSS público de sigeup.up.ac.mz/sigeup/public/dist/css/login.css).
export const colors = {
  primary: '#0578ad', // azul institucional — botões, ícones, focus
  primaryDark: '#004a80', // azul escuro — texto/links sobre fundo claro (mais contraste)
  accent: '#00aeef', // ciano — destaques, gráficos, estados activos
  gold: '#D69E31', // dourado — acções secundárias, avisos suaves
  goldDark: '#85592e', // castanho — texto sobre fundo dourado
  success: '#1BAA38',
  warning: '#D69E31',
  error: '#ed1c24',

  background: '#F7F9FA',
  surface: '#FFFFFF',
  border: '#E3E6E8',

  textPrimary: '#1A1D1F',
  textSecondary: '#5C6570',
  textTertiary: '#909193',
  textOnPrimary: '#FFFFFF',
  textOnGold: '#4A3216',

  overlay: 'rgba(10, 20, 30, 0.45)',

  // Acentos por categoria — dão identidade visual própria a cada secção,
  // mantendo a família cromática institucional (azul/dourado) mas com
  // variação suficiente para orientação rápida ("em que zona da app estou").
  categoryNotas: '#0578ad',
  categoryFinanceiro: '#0E8F84',
  categoryFinanceiroDark: '#0A5F58',
  categoryDocumentos: '#D69E31',
  categoryMais: '#5B4B93',
};

// Pares usados com <LinearGradient colors={...}/>.
export const gradients = {
  hero: ['#0578ad', '#023a56'],
  financeiro: ['#0E8F84', '#0A4A45'],
  gold: ['#E7B24C', '#B87A1F'],
  mais: ['#6C5AAE', '#3E3169'],
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  xxl: 32,
};

export const radius = {
  sm: 6,
  md: 10,
  lg: 16,
  pill: 999,
};

export const typography = {
  hero: { fontSize: 40, fontWeight: '800' },
  display: { fontSize: 28, fontWeight: '700' },
  title: { fontSize: 20, fontWeight: '700' },
  subtitle: { fontSize: 16, fontWeight: '600' },
  body: { fontSize: 14, fontWeight: '400' },
  caption: { fontSize: 12, fontWeight: '400' },
};

export const shadow = {
  card: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  floating: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.16,
    shadowRadius: 20,
    elevation: 10,
  },
};
