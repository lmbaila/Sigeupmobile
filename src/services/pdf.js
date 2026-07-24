import * as Print from 'expo-print';
import * as Sharing from 'expo-sharing';
import { colors } from '../design-system/tokens';

function escapeHtml(value) {
  return String(value ?? '').replace(/[&<>"']/g, (char) => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
  }[char]));
}

export async function exportGradesPdf({ studentName, studentId, courseName, period, semester, grades }) {
  const rows = grades
    .map(
      (g) => `
    <tr>
      <td>${escapeHtml(g.discipline?.name)}</td>
      <td>${escapeHtml(g.test1 ?? '-')}</td>
      <td>${escapeHtml(g.test2 ?? '-')}</td>
      <td>${escapeHtml(g.test3 ?? '-')}</td>
      <td>${escapeHtml(g.work1 ?? '-')}</td>
      <td>${escapeHtml(g.work2 ?? '-')}</td>
      <td>${escapeHtml(g.work3 ?? '-')}</td>
      <td>${escapeHtml(g.frequency_avg ?? '-')}</td>
      <td>${escapeHtml(g.frequency_result ?? '-')}</td>
      <td>${escapeHtml(g.final_result ?? '-')}</td>
    </tr>`
    )
    .join('');

  const html = `
    <html>
      <head><meta charset="utf-8" /></head>
      <body style="font-family: -apple-system, Roboto, sans-serif; padding: 24px; color: #1A1D1F;">
        <div style="border-bottom: 3px solid ${colors.primary}; padding-bottom: 12px; margin-bottom: 16px;">
          <h1 style="color: ${colors.primaryDark}; margin: 0; font-size: 20px;">SIGEUP — Pauta de Notas</h1>
          <p style="margin: 4px 0 0; color: ${colors.textSecondary};">Universidade Pedagógica de Maputo</p>
        </div>
        <p><strong>Estudante:</strong> ${escapeHtml(studentName)} (${escapeHtml(studentId)})</p>
        <p><strong>Curso:</strong> ${escapeHtml(courseName)}</p>
        <p><strong>Semestre:</strong> ${escapeHtml(semester)}º de ${escapeHtml(period)}</p>
        <table style="width:100%; border-collapse: collapse; margin-top: 16px; font-size: 12px;">
          <thead>
            <tr style="background:${colors.primary}; color:#fff;">
              <th style="padding:6px; text-align:left;">Disciplina</th>
              <th style="padding:6px;">T1</th>
              <th style="padding:6px;">T2</th>
              <th style="padding:6px;">T3</th>
              <th style="padding:6px;">Tr1</th>
              <th style="padding:6px;">Tr2</th>
              <th style="padding:6px;">Tr3</th>
              <th style="padding:6px;">Média</th>
              <th style="padding:6px;">Frequência</th>
              <th style="padding:6px;">Final</th>
            </tr>
          </thead>
          <tbody>${rows}</tbody>
        </table>
        <p style="margin-top: 24px; font-size: 10px; color: ${colors.textTertiary};">
          Gerado pela aplicação SIGEUP Mobile em ${new Date().toLocaleString('pt-PT')}.
        </p>
      </body>
    </html>
  `;

  const { uri } = await Print.printToFileAsync({ html });
  if (await Sharing.isAvailableAsync()) {
    await Sharing.shareAsync(uri, { mimeType: 'application/pdf', dialogTitle: 'Notas' });
  }
  return uri;
}
