import React, { useCallback, useState } from 'react';
import { ScrollView, RefreshControl, View, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useQuery } from '@tanstack/react-query';
import { MaterialIcons } from '@expo/vector-icons';
import { balance, allPayments } from '../../services/payments';
import { listEnrollments } from '../../services/enrollments';
import { listInvoices } from '../../services/invoices';
import { formatCurrency, formatDate } from '../../helpers/format';
import {
  Screen,
  AppText,
  Card,
  IconBadge,
  AnimatedNumber,
  GradientHeader,
  EmptyState,
  Skeleton,
  StatusPill,
  booleanTone,
  colors,
  gradients,
  spacing,
} from '../../design-system';

function SectionTitle({ children }) {
  return (
    <AppText variant="subtitle" style={styles.sectionTitle}>
      {children}
    </AppText>
  );
}

export default function Financeiro({ navigation }) {
  const insets = useSafeAreaInsets();
  const [refreshing, setRefreshing] = useState(false);

  const balanceQuery = useQuery({
    queryKey: ['balance'],
    queryFn: () => balance().then((res) => res.data.data.balance),
  });
  const enrollmentsQuery = useQuery({
    queryKey: ['enrollments'],
    queryFn: () => listEnrollments().then((res) => res.data.data),
  });
  const paymentsQuery = useQuery({
    queryKey: ['payments'],
    queryFn: () => allPayments().then((res) => res.data.data),
  });
  const invoicesQuery = useQuery({
    queryKey: ['invoices'],
    queryFn: () => listInvoices().then((res) => res.data.data),
  });

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await Promise.all([
      balanceQuery.refetch(),
      enrollmentsQuery.refetch(),
      paymentsQuery.refetch(),
      invoicesQuery.refetch(),
    ]);
    setRefreshing(false);
  }, [balanceQuery, enrollmentsQuery, paymentsQuery, invoicesQuery]);

  const hasDebt = (balanceQuery.data ?? 0) < 0;
  const isLoading =
    balanceQuery.isLoading || enrollmentsQuery.isLoading || paymentsQuery.isLoading || invoicesQuery.isLoading;

  if (isLoading) {
    return (
      <Screen>
        <View style={{ marginTop: spacing.lg, gap: spacing.md }}>
          <Skeleton height={90} />
          <Skeleton height={64} />
          <Skeleton height={64} />
        </View>
      </Screen>
    );
  }

  return (
    <View style={styles.root}>
      <GradientHeader
        colors={hasDebt ? [colors.error, '#7a0f14'] : gradients.financeiro}
        style={{ paddingTop: insets.top + spacing.md }}
      >
        <View style={styles.balanceBlock}>
          <AppText variant="caption" color="rgba(255,255,255,0.75)" style={styles.balanceLabel}>
            SALDO ACTUAL
          </AppText>
          <AnimatedNumber
            value={balanceQuery.data ?? 0}
            formatter={(v) => formatCurrency(v)}
            variant="hero"
            color={colors.textOnPrimary}
          />
          {hasDebt && (
            <View style={styles.debtTag}>
              <MaterialIcons name="error-outline" size={14} color={colors.textOnPrimary} />
              <AppText variant="caption" color={colors.textOnPrimary} style={styles.debtText}>
                Tens valores em dívida
              </AppText>
            </View>
          )}
        </View>
      </GradientHeader>

      <ScrollView
        contentContainerStyle={styles.content}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      >
        <SectionTitle>Inscrições</SectionTitle>
        {!enrollmentsQuery.data?.length ? (
          <EmptyState
            icon="fact-check"
            title="Sem inscrições"
            description="Nenhuma inscrição encontrada."
            tone={colors.categoryFinanceiro}
          />
        ) : (
          enrollmentsQuery.data.map((item) => (
            <Card key={item._id} style={styles.row} accentColor={colors.categoryFinanceiro}>
              <View style={styles.rowHeader}>
                <View style={styles.rowLeft}>
                  <IconBadge icon="fact-check" color={colors.categoryFinanceiro} size="sm" />
                  <AppText variant="body" style={styles.rowLabel}>{`${item.semester}º semestre de ${item.period}`}</AppText>
                </View>
                <StatusPill label={item.confirmed ? 'Confirmada' : 'Não confirmada'} tone={booleanTone(item.confirmed)} />
              </View>
              <AppText variant="caption" color={colors.textSecondary} style={styles.rowMeta}>
                Ref. {item.payment_reference} · Entidade {item.payment_entity}
              </AppText>
            </Card>
          ))
        )}

        <SectionTitle>Propinas</SectionTitle>
        {!paymentsQuery.data?.length ? (
          <EmptyState
            icon="receipt-long"
            title="Sem propinas"
            description="Nenhuma propina encontrada."
            tone={colors.categoryFinanceiro}
          />
        ) : (
          paymentsQuery.data.map((item) => (
            <Card key={item._id} style={styles.row} accentColor={colors.categoryFinanceiro}>
              <View style={styles.rowHeader}>
                <View style={styles.rowLeft}>
                  <IconBadge icon="receipt-long" color={colors.categoryFinanceiro} size="sm" />
                  <AppText variant="body" style={styles.rowLabel} numberOfLines={1}>
                    {item.description}
                  </AppText>
                </View>
                <StatusPill label={item.paid ? 'Paga' : 'Por pagar'} tone={booleanTone(item.paid)} />
              </View>
              <AppText variant="caption" color={colors.textSecondary} style={styles.rowMeta}>
                {formatCurrency(item.debit_ammount, item.debit_currency)} · vencimento {formatDate(item.debit_date)}
              </AppText>
            </Card>
          ))
        )}

        <SectionTitle>Facturas</SectionTitle>
        {!invoicesQuery.data?.length ? (
          <EmptyState
            icon="description"
            title="Sem facturas"
            description="Nenhuma factura encontrada."
            tone={colors.categoryFinanceiro}
          />
        ) : (
          invoicesQuery.data.map((item) => (
            <Card
              key={item._id}
              style={styles.row}
              accentColor={colors.categoryFinanceiro}
              onPress={() => navigation.navigate('FacturaDetalhe', { invoiceId: item._id, dueDate: item.due_date })}
              accessibilityLabel={`Factura de ${formatCurrency(item.ammount, item.ammount_currency)}, ${
                item.paid ? 'paga' : 'por pagar'
              }, vencimento em ${formatDate(item.due_date)}`}
              accessibilityHint="Ver detalhes da factura"
            >
              <View style={styles.rowHeader}>
                <View style={styles.rowLeft}>
                  <IconBadge icon="description" color={colors.categoryFinanceiro} size="sm" />
                  <AppText variant="body" style={styles.rowLabel}>
                    {formatCurrency(item.ammount, item.ammount_currency)}
                  </AppText>
                </View>
                <View style={styles.rowActions}>
                  <StatusPill label={item.paid ? 'Paga' : 'Por pagar'} tone={booleanTone(item.paid)} />
                  <MaterialIcons name="chevron-right" size={20} color={colors.textTertiary} />
                </View>
              </View>
              <AppText variant="caption" color={colors.textSecondary} style={styles.rowMeta}>
                Vencimento {formatDate(item.due_date)} · Ref. {item.payment_reference}
              </AppText>
            </Card>
          ))
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
  balanceBlock: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.lg,
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
    borderRadius: 999,
    marginTop: spacing.sm,
  },
  debtText: {
    marginLeft: spacing.xs,
  },
  content: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.lg,
    paddingBottom: spacing.xxl,
  },
  sectionTitle: {
    marginBottom: spacing.sm,
    marginTop: spacing.md,
  },
  row: {
    marginBottom: spacing.sm,
  },
  rowHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  rowLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flexShrink: 1,
    marginRight: spacing.sm,
  },
  rowLabel: {
    marginLeft: spacing.md,
    flexShrink: 1,
  },
  rowMeta: {
    marginTop: spacing.xs,
    marginLeft: 44 + spacing.md,
  },
  rowActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
});
