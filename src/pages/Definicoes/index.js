import React, { useContext } from 'react';
import { View, StyleSheet } from 'react-native';
import ToggleSwitch from 'toggle-switch-react-native';
import AuthContext from '../../contexts/auth';
import { speak } from '../../helpers';
import { Screen, AppText, Card, colors, spacing } from '../../design-system';

export default function Definicoes() {
  const { talk, talkContext } = useContext(AuthContext);

  function handleToggle(isOn) {
    talkContext(isOn);
    speak(isOn ? 'Narrador de tela ativado' : 'Narrador de tela desativado', true);
  }

  return (
    <Screen>
      <AppText variant="title" style={styles.title}>
        Definições
      </AppText>

      <AppText variant="subtitle" color={colors.textSecondary} style={styles.sectionTitle}>
        Acessibilidade
      </AppText>
      <Card>
        <View style={styles.row}>
          <AppText variant="subtitle" style={styles.rowLabel}>
            Narrador de tela
          </AppText>
          <ToggleSwitch
            isOn={talk}
            onColor={colors.primary}
            offColor={colors.border}
            size="small"
            onToggle={handleToggle}
          />
        </View>
        <AppText variant="body" color={colors.textSecondary} style={styles.description}>
          Recurso de acessibilidade que narra em voz alta as opções do ecrã, útil para pessoas com baixa visão ou
          perda total de visão.
        </AppText>
      </Card>
    </Screen>
  );
}

const styles = StyleSheet.create({
  title: {
    marginTop: spacing.lg,
    marginBottom: spacing.lg,
  },
  sectionTitle: {
    marginBottom: spacing.sm,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  rowLabel: {
    flex: 1,
  },
  description: {
    marginTop: spacing.sm,
  },
});
