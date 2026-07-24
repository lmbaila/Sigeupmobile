import React from 'react';
import { FlatList, RefreshControl, View, StyleSheet } from 'react-native';
import { useQuery } from '@tanstack/react-query';
import { invoiceDetails } from '../../services/invoices';
import { formatCurrency, formatDate } from '../../helpers/format';
import { Screen, AppText, Card, EmptyState, Skeleton, colors, spacing } from '../../design-system';

export default function FacturaDetalhe({ route }) {
  const { invoiceId, dueDate } = route.params;

  const { data, isLoading, isRefetching, refetch } = useQuery({
    queryKey: ['invoice-details', invoiceId],
    queryFn: () => invoiceDetails(invoiceId).then((res) => res.data.data),
  });

  if (isLoading) {
    return (
      <Screen>
        <View style={{ marginTop: spacing.lg, gap: spacing.md }}>
          <Skeleton height={72} />
          <Skeleton height={72} />
        </View>
      </Screen>
    );
  }

  return (
    <Screen padded={false}>
      <FlatList
        contentContainerStyle={styles.list}
        data={data || []}
        keyExtractor={(item) => item._id}
        refreshControl={<RefreshControl refreshing={isRefetching} onRefresh={refetch} />}
        ListHeaderComponent={
          !!dueDate && (
            <AppText variant="body" color={colors.textSecondary} style={styles.dueDate}>
              Vencimento: {formatDate(dueDate)}
            </AppText>
          )
        }
        ListEmptyComponent={
          <EmptyState
            icon="description"
            title="Sem detalhes"
            description="Não há linhas de detalhe para esta factura."
            tone={colors.categoryFinanceiro}
          />
        }
        renderItem={({ item }) => (
          <Card style={styles.row} accentColor={colors.categoryFinanceiro}>
            <AppText variant="body" style={styles.description}>
              {item.description}
            </AppText>
            <AppText variant="subtitle" color={colors.categoryFinanceiroDark}>
              {formatCurrency(item.ammount, item.ammount_currency)}
            </AppText>
          </Card>
        )}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  list: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.lg,
    paddingBottom: spacing.xxl,
    flexGrow: 1,
  },
  dueDate: {
    marginBottom: spacing.md,
  },
  row: {
    marginBottom: spacing.sm,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  description: {
    flexShrink: 1,
    marginRight: spacing.sm,
  },
});
