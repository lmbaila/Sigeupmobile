import React from 'react';
import { View, StyleSheet } from 'react-native';
import AppText from './AppText';
import { colors, radius, spacing } from './tokens';

const TONE_STYLES = {
  success: { backgroundColor: colors.success, textColor: colors.textOnPrimary },
  warning: { backgroundColor: colors.warning, textColor: colors.textOnGold },
  error: { backgroundColor: colors.error, textColor: colors.textOnPrimary },
  neutral: { backgroundColor: colors.textTertiary, textColor: colors.textOnPrimary },
};

export default function StatusPill({ label, tone = 'neutral', style }) {
  const { backgroundColor, textColor } = TONE_STYLES[tone] || TONE_STYLES.neutral;
  return (
    <View style={[styles.pill, { backgroundColor }, style]}>
      <AppText variant="caption" color={textColor} style={styles.label}>
        {label}
      </AppText>
    </View>
  );
}

// Estados académicos vindos da API (frequency_result / final_result).
export function frequencyResultTone(result) {
  const initial = (result || '').trim().charAt(0).toUpperCase();
  if (initial === 'A') return 'success'; // Admitido
  if (initial === 'D') return 'success'; // Dispensado
  if (initial === 'E') return 'error'; // Excluído
  if (initial === 'R') return 'error'; // Reprovado
  return 'warning';
}

export function booleanTone(value) {
  return value ? 'success' : 'error';
}

const styles = StyleSheet.create({
  pill: {
    borderRadius: radius.pill,
    paddingHorizontal: spacing.sm,
    paddingVertical: 2,
    alignSelf: 'flex-start',
  },
  label: {
    fontWeight: '700',
  },
});
