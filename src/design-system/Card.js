import React from 'react';
import { View, StyleSheet } from 'react-native';
import PressableScale from './PressableScale';
import { colors, radius, spacing, shadow } from './tokens';

export default function Card({
  children,
  style,
  onPress,
  accentColor,
  accessibilityLabel,
  accessibilityHint,
  ...rest
}) {
  const accentStyle = accentColor && { borderLeftWidth: 4, borderLeftColor: accentColor };

  if (onPress) {
    return (
      <PressableScale
        onPress={onPress}
        accessibilityRole="button"
        accessibilityLabel={accessibilityLabel}
        accessibilityHint={accessibilityHint}
        style={[styles.container, accentStyle, style]}
        {...rest}
      >
        {children}
      </PressableScale>
    );
  }
  return (
    <View
      style={[styles.container, accentStyle, style]}
      accessibilityLabel={accessibilityLabel}
      accessibilityHint={accessibilityHint}
      {...rest}
    >
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    padding: spacing.lg,
    ...shadow.card,
  },
});
