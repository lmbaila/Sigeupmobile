import React from 'react';
import { View, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import AppText from './AppText';
import { colors, spacing } from './tokens';

export default function FakeDataBanner() {
  return (
    <View
      style={styles.container}
      accessible
      accessibilityLabel="Modo de desenvolvimento: a mostrar dados fake, não ligado à API real"
    >
      <MaterialIcons name="science" size={16} color={colors.textOnGold} />
      <AppText variant="caption" color={colors.textOnGold} style={styles.text}>
        Dados fake (modo de desenvolvimento)
      </AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.gold,
    paddingVertical: spacing.xs,
    gap: spacing.xs,
  },
  text: {
    marginLeft: spacing.xs,
    fontWeight: '600',
  },
});
