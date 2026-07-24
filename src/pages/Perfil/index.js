import React, { useContext } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import AuthContext from '../../contexts/auth';
import { speckNormal } from '../../helpers';
import { AppText, Card, PressableScale, GradientHeader, colors, gradients, spacing } from '../../design-system';

function InfoRow({ label, value, talk }) {
  if (!value) return null;
  return (
    <Card
      style={styles.row}
      accentColor={colors.categoryMais}
      onPress={() => speckNormal(`${label}: ${value}`, talk)}
      accessibilityLabel={`${label}: ${value}`}
    >
      <AppText variant="caption" color={colors.textSecondary}>
        {label}
      </AppText>
      <AppText variant="subtitle" style={styles.value}>
        {value}
      </AppText>
    </Card>
  );
}

export default function Perfil({ navigation }) {
  const insets = useSafeAreaInsets();
  const { user, talk } = useContext(AuthContext);

  return (
    <View style={styles.root}>
      <GradientHeader colors={gradients.mais} style={[styles.hero, { paddingTop: insets.top + spacing.md }]}>
        <PressableScale
          onPress={() => navigation.goBack()}
          haptic={false}
          style={styles.backButton}
          accessibilityRole="button"
          accessibilityLabel="Voltar"
        >
          <MaterialIcons name="arrow-back" size={22} color={colors.textOnPrimary} />
        </PressableScale>
        <View style={styles.avatar}>
          <AppText variant="title" color={colors.textOnPrimary}>
            {user?.full_name?.charAt(0)}
          </AppText>
        </View>
        <AppText variant="title" color={colors.textOnPrimary} style={styles.name}>
          {user?.full_name}
        </AppText>
        <AppText variant="body" color="rgba(255,255,255,0.75)">
          Código nº {user?._id}
        </AppText>
      </GradientHeader>

      <ScrollView contentContainerStyle={styles.content}>
        <InfoRow label="Curso" value={user?.course?.name} talk={talk} />
        <InfoRow label="Faculdade" value={user?.course?.faculty_id?.trim?.()} talk={talk} />
        <InfoRow label="Regime" value={user?.regime?.name} talk={talk} />
        <InfoRow label="Nível" value={user?.grade ? `${user.grade}º` : null} talk={talk} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.background,
  },
  hero: {
    alignItems: 'center',
    paddingBottom: spacing.xl,
  },
  backButton: {
    alignSelf: 'flex-start',
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.16)',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: spacing.lg,
    marginBottom: spacing.md,
  },
  avatar: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: 'rgba(255,255,255,0.18)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.md,
  },
  name: {
    textAlign: 'center',
    marginBottom: spacing.xs,
  },
  content: {
    padding: spacing.lg,
  },
  row: {
    marginBottom: spacing.sm,
  },
  value: {
    marginTop: 2,
  },
});
