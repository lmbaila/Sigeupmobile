import React from 'react';
import { View, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useNetInfo } from '@react-native-community/netinfo';
import AppText from './AppText';
import { colors, spacing } from './tokens';

export default function OfflineBanner() {
  const { isConnected } = useNetInfo();

  if (isConnected !== false) {
    return null;
  }

  return (
    <View
      style={styles.container}
      accessible
      accessibilityLiveRegion="polite"
      accessibilityLabel="Sem ligação à internet. A mostrar os últimos dados guardados."
    >
      <MaterialIcons name="cloud-off" size={16} color={colors.textOnPrimary} />
      <AppText variant="caption" color={colors.textOnPrimary} style={styles.text}>
        Sem ligação — a mostrar dados guardados
      </AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.textSecondary,
    paddingVertical: spacing.xs,
    gap: spacing.xs,
  },
  text: {
    marginLeft: spacing.xs,
  },
});
