import React, { useContext, useEffect } from 'react';
import { View, StyleSheet, ScrollView, Linking, AccessibilityInfo } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useQuery } from '@tanstack/react-query';
import { MaterialIcons, FontAwesome5 } from '@expo/vector-icons';
import DoubleClick from 'react-native-double-tap';
import AuthContext from '../../contexts/auth';
import { balance } from '../../services/payments';
import { speckNormal } from '../../helpers';
import { firstName, formatCurrency } from '../../helpers/format';
import {
  AppText,
  Card,
  IconBadge,
  AnimatedNumber,
  GradientHeader,
  colors,
  gradients,
  spacing,
  radius,
} from '../../design-system';

function greeting() {
  const hour = new Date().getHours();
  if (hour < 12) return 'Bom dia';
  if (hour < 19) return 'Boa tarde';
  return 'Boa noite';
}

function QuickAction({ icon, label, color, onPress }) {
  return (
    <Card style={styles.quickAction} onPress={onPress} accessibilityLabel={label}>
      <IconBadge icon={icon} color={color} size="md" />
      <AppText variant="body" style={styles.quickActionLabel}>
        {label}
      </AppText>
    </Card>
  );
}

export default function Home({ navigation }) {
  const insets = useSafeAreaInsets();
  const { user, talk, signOut, talkContext } = useContext(AuthContext);

  useEffect(() => {
    AccessibilityInfo.isScreenReaderEnabled().then((enabled) => {
      if (enabled) talkContext(false);
    });
  }, []);

  const balanceQuery = useQuery({
    queryKey: ['balance'],
    queryFn: () => balance().then((res) => res.data.data.balance),
  });

  const hasDebt = (balanceQuery.data ?? 0) < 0;

  function handleLogoutPress() {
    if (talk) {
      speckNormal('pressione duas vezes para sair', talk);
    } else {
      signOut();
    }
  }

  return (
    <View style={styles.root}>
      <GradientHeader colors={gradients.hero} style={{ paddingTop: insets.top + spacing.md }}>
        <View style={styles.headerRow}>
          <View style={styles.flexShrink}>
            <AppText variant="body" color="rgba(255,255,255,0.8)">
              {greeting()},
            </AppText>
            <AppText variant="hero" color={colors.textOnPrimary} numberOfLines={1}>
              {firstName(user?.full_name)}
            </AppText>
          </View>
          <DoubleClick singleTap={handleLogoutPress} doubleTap={signOut}>
            <View
              style={styles.logoutButton}
              accessible
              accessibilityRole="button"
              accessibilityLabel="Sair"
              accessibilityHint="Prima duas vezes para terminar sessão"
            >
              <FontAwesome5 name="sign-out-alt" color={colors.textOnPrimary} size={18} />
            </View>
          </DoubleClick>
        </View>

        <View
          style={styles.balanceBlock}
          accessible
          accessibilityLabel={`Saldo actual: ${formatCurrency(balanceQuery.data ?? 0)}`}
        >
          <AppText variant="caption" color="rgba(255,255,255,0.75)" style={styles.balanceLabel}>
            SALDO ACTUAL
          </AppText>
          {balanceQuery.isLoading ? (
            <AppText variant="hero" color={colors.textOnPrimary}>
              ···
            </AppText>
          ) : (
            <AnimatedNumber
              value={balanceQuery.data ?? 0}
              formatter={(v) => formatCurrency(v)}
              variant="hero"
              color={colors.textOnPrimary}
            />
          )}
          {hasDebt && (
            <View style={styles.debtTag}>
              <MaterialIcons name="error-outline" size={14} color={colors.textOnPrimary} />
              <AppText variant="caption" color={colors.textOnPrimary} style={styles.debtText}>
                Valores em dívida — consulta o Financeiro
              </AppText>
            </View>
          )}
        </View>
      </GradientHeader>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        <AppText variant="subtitle" style={styles.sectionTitle}>
          Acesso rápido
        </AppText>
        <View style={styles.quickActions}>
          <QuickAction
            icon="fact-check"
            label="Notas"
            color={colors.categoryNotas}
            onPress={() => navigation.navigate('Notas')}
          />
          <QuickAction
            icon="account-balance-wallet"
            label="Financeiro"
            color={colors.categoryFinanceiro}
            onPress={() => navigation.navigate('Financeiro')}
          />
          <QuickAction
            icon="description"
            label="Documentos"
            color={colors.categoryDocumentos}
            onPress={() => navigation.navigate('Documentos')}
          />
          <QuickAction
            icon="menu-book"
            label="Plano Curricular"
            color={colors.categoryMais}
            onPress={() => navigation.navigate('PlanoCurricular')}
          />
        </View>

        {!!user?.quick_links?.length && (
          <>
            <AppText variant="subtitle" style={styles.sectionTitle}>
              Ligações úteis
            </AppText>
            {user.quick_links.map((link) => (
              <Card
                key={link.url || link.name}
                style={styles.linkCard}
                onPress={() => Linking.openURL(link.url)}
                accessibilityLabel={link.name}
              >
                <View style={styles.linkCardInner}>
                  <IconBadge icon="link" color={colors.primary} size="sm" />
                  <AppText variant="body" style={styles.linkLabel}>
                    {link.name}
                  </AppText>
                  <MaterialIcons name="open-in-new" size={18} color={colors.textSecondary} />
                </View>
              </Card>
            ))}
          </>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.background,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingHorizontal: spacing.lg,
  },
  flexShrink: {
    flexShrink: 1,
    marginRight: spacing.md,
  },
  logoutButton: {
    width: 44,
    height: 44,
    borderRadius: radius.pill,
    backgroundColor: 'rgba(255,255,255,0.16)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  balanceBlock: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.xl,
    paddingBottom: spacing.xl,
  },
  balanceLabel: {
    letterSpacing: 1,
    marginBottom: spacing.xs,
  },
  debtTag: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(255,255,255,0.16)',
    paddingHorizontal: spacing.sm,
    paddingVertical: 4,
    borderRadius: radius.pill,
    marginTop: spacing.sm,
  },
  debtText: {
    marginLeft: spacing.xs,
  },
  content: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.xl,
    paddingBottom: spacing.xxl,
  },
  sectionTitle: {
    marginBottom: spacing.sm,
    marginTop: spacing.sm,
  },
  quickActions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.md,
  },
  quickAction: {
    width: '47%',
    padding: spacing.md,
    alignItems: 'flex-start',
  },
  quickActionLabel: {
    fontWeight: '600',
    marginTop: spacing.sm,
  },
  linkCard: {
    marginBottom: spacing.sm,
    padding: spacing.md,
  },
  linkCardInner: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  linkLabel: {
    flex: 1,
    marginLeft: spacing.md,
  },
});
