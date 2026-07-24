import React from 'react';
import { View, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import AppText from './AppText';
import Button from './Button';
import { colors, spacing, radius } from './tokens';

export default function EmptyState({
  icon = 'info-outline',
  title,
  description,
  actionLabel,
  onAction,
  tone = colors.primary,
}) {
  return (
    <View
      style={styles.container}
      accessible
      accessibilityRole="text"
      accessibilityLabel={`${title}. ${description || ''}`}
    >
      <View style={styles.illustration}>
        <View style={[styles.orbitLarge, { backgroundColor: `${tone}14` }]} />
        <View style={[styles.orbitSmall, { backgroundColor: colors.gold, opacity: 0.18 }]} />
        <View style={[styles.iconCircle, { backgroundColor: colors.surface, shadowColor: tone }]}>
          <MaterialIcons name={icon} size={40} color={tone} />
        </View>
      </View>
      <AppText variant="title" style={styles.title}>
        {title}
      </AppText>
      {!!description && (
        <AppText variant="body" color={colors.textSecondary} style={styles.description}>
          {description}
        </AppText>
      )}
      {!!actionLabel && <Button title={actionLabel} onPress={onAction} style={styles.action} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.xl,
  },
  illustration: {
    width: 140,
    height: 140,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.sm,
  },
  orbitLarge: {
    position: 'absolute',
    width: 140,
    height: 140,
    borderRadius: 70,
  },
  orbitSmall: {
    position: 'absolute',
    width: 56,
    height: 56,
    borderRadius: 28,
    top: 6,
    right: 8,
  },
  iconCircle: {
    width: 84,
    height: 84,
    borderRadius: radius.lg,
    alignItems: 'center',
    justifyContent: 'center',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 3,
  },
  title: {
    textAlign: 'center',
    marginTop: spacing.md,
  },
  description: {
    textAlign: 'center',
    marginTop: spacing.xs,
  },
  action: {
    marginTop: spacing.lg,
    alignSelf: 'stretch',
  },
});
