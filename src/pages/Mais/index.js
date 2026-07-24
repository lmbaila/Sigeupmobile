import React, { useContext } from 'react';
import { View, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import DoubleClick from 'react-native-double-tap';
import AuthContext from '../../contexts/auth';
import { speckNormal } from '../../helpers';
import { firstName } from '../../helpers/format';
import { Screen, AppText, Card, IconBadge, colors, spacing } from '../../design-system';

function MenuItem({ icon, color, label, onPress }) {
  return (
    <Card style={styles.item} onPress={onPress} accessibilityLabel={label} accessibilityHint="Abrir">
      <View style={styles.itemRow}>
        <IconBadge icon={icon} color={color} />
        <AppText variant="subtitle" style={styles.itemLabel}>
          {label}
        </AppText>
        <MaterialIcons name="chevron-right" size={22} color={colors.textTertiary} />
      </View>
    </Card>
  );
}

export default function Mais({ navigation }) {
  const { user, talk, signOut } = useContext(AuthContext);

  function handleLogoutPress() {
    if (talk) {
      speckNormal('pressione duas vezes para sair', talk);
    } else {
      signOut();
    }
  }

  return (
    <Screen>
      <View style={styles.header}>
        <View style={styles.avatar}>
          <AppText variant="title" color={colors.textOnPrimary}>
            {user?.full_name?.charAt(0)}
          </AppText>
        </View>
        <View style={styles.headerText}>
          <AppText variant="caption" color={colors.textSecondary}>
            Sessão iniciada como
          </AppText>
          <AppText variant="title">{firstName(user?.full_name)}</AppText>
        </View>
      </View>

      <MenuItem
        icon="description"
        color={colors.categoryDocumentos}
        label="Documentos úteis"
        onPress={() => navigation.navigate('Documentos')}
      />
      <MenuItem
        icon="menu-book"
        color={colors.categoryMais}
        label="Plano curricular"
        onPress={() => navigation.navigate('PlanoCurricular')}
      />
      <MenuItem
        icon="person"
        color={colors.categoryNotas}
        label="Perfil"
        onPress={() => navigation.navigate('Perfil')}
      />
      <MenuItem
        icon="settings"
        color={colors.categoryFinanceiro}
        label="Definições"
        onPress={() => navigation.navigate('Definicoes')}
      />

      <DoubleClick singleTap={handleLogoutPress} doubleTap={signOut}>
        <Card
          style={[styles.item, styles.logout]}
          accessibilityLabel="Sair"
          accessibilityHint="Prima duas vezes para terminar sessão"
        >
          <View style={styles.itemRow}>
            <IconBadge icon="logout" color={colors.error} />
            <AppText variant="subtitle" color={colors.error} style={styles.itemLabel}>
              Sair
            </AppText>
          </View>
        </Card>
      </DoubleClick>
    </Screen>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: spacing.lg,
    marginBottom: spacing.xl,
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },
  headerText: {
    flexShrink: 1,
  },
  item: {
    marginBottom: spacing.md,
  },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemLabel: {
    flex: 1,
    marginLeft: spacing.md,
  },
  logout: {
    marginTop: spacing.md,
  },
});
