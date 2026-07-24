import React from 'react';
import { ActivityIndicator, StyleSheet } from 'react-native';
import PressableScale from './PressableScale';
import AppText from './AppText';
import { colors, radius, spacing } from './tokens';

const VARIANTS = {
  primary: {
    container: { backgroundColor: colors.primary },
    label: { color: colors.textOnPrimary },
  },
  secondary: {
    container: { backgroundColor: colors.gold },
    label: { color: colors.textOnGold },
  },
  ghost: {
    container: { backgroundColor: 'transparent', borderWidth: 1, borderColor: colors.primary },
    label: { color: colors.primary },
  },
};

export default function Button({
  title,
  onPress,
  variant = 'primary',
  loading = false,
  disabled = false,
  accessibilityHint,
  style,
}) {
  const { container, label } = VARIANTS[variant] || VARIANTS.primary;
  const isDisabled = disabled || loading;
  return (
    <PressableScale
      onPress={onPress}
      disabled={isDisabled}
      scaleTo={0.97}
      accessibilityRole="button"
      accessibilityLabel={title}
      accessibilityHint={accessibilityHint}
      accessibilityState={{ disabled: isDisabled, busy: loading }}
      style={[styles.base, container, isDisabled && styles.disabled, style]}
    >
      {loading ? (
        <ActivityIndicator size="small" color={label.color} />
      ) : (
        <AppText variant="subtitle" color={label.color}>
          {title}
        </AppText>
      )}
    </PressableScale>
  );
}

const styles = StyleSheet.create({
  base: {
    minHeight: 48,
    borderRadius: radius.md,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.lg,
  },
  disabled: {
    opacity: 0.5,
  },
});
