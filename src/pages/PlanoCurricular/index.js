import React from 'react';
import { FlatList, RefreshControl, View, StyleSheet } from 'react-native';
import { useInfiniteQuery } from '@tanstack/react-query';
import { listCurricularPlans } from '../../services/curricularPlans';
import { Screen, AppText, Card, IconBadge, EmptyState, Skeleton, colors, spacing } from '../../design-system';

export default function PlanoCurricular() {
  const { data, isLoading, isRefetching, refetch, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ['curricular-plans'],
      queryFn: ({ pageParam = 1 }) => listCurricularPlans({ page: pageParam }).then((res) => res.data),
      initialPageParam: 1,
      getNextPageParam: (lastPage) =>
        lastPage.meta.current_page < lastPage.meta.last_page ? lastPage.meta.current_page + 1 : undefined,
    });

  const items = data?.pages.flatMap((page) => page.data) || [];

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
        data={items}
        keyExtractor={(item) => item._id}
        refreshControl={<RefreshControl refreshing={isRefetching} onRefresh={refetch} />}
        onEndReachedThreshold={0.4}
        onEndReached={() => hasNextPage && fetchNextPage()}
        ListEmptyComponent={
          <EmptyState
            icon="menu-book"
            title="Sem plano curricular"
            description="Não foram encontradas disciplinas curriculares."
            tone={colors.categoryMais}
          />
        }
        ListFooterComponent={isFetchingNextPage ? <Skeleton height={72} style={styles.footerSkeleton} /> : null}
        renderItem={({ item }) => (
          <Card style={styles.row} accentColor={colors.categoryMais}>
            <View style={styles.rowContent}>
              <IconBadge icon="menu-book" color={colors.categoryMais} size="sm" />
              <View style={styles.rowText}>
                <AppText variant="subtitle">{item.discipline?.name}</AppText>
                <AppText variant="caption" color={colors.textSecondary} style={styles.meta}>
                  {item.grade}º ano · {item.semester}º semestre · {item.credits} créditos
                </AppText>
                <AppText variant="caption" color={colors.textTertiary}>
                  {item.curriculum?.name}
                </AppText>
              </View>
            </View>
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
  row: {
    marginBottom: spacing.sm,
  },
  rowContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  rowText: {
    flex: 1,
  },
  meta: {
    marginTop: spacing.xs,
  },
  footerSkeleton: {
    marginTop: spacing.sm,
  },
});
