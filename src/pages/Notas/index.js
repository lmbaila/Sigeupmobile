import React, { useContext } from 'react';
import { FlatList, RefreshControl, View, StyleSheet } from 'react-native';
import { useQuery } from '@tanstack/react-query';
import { MaterialIcons } from '@expo/vector-icons';
import AuthContext from '../../contexts/auth';
import { listEnrollments } from '../../services/enrollments';
import { speckNormal } from '../../helpers';
import { Screen, AppText, Card, IconBadge, EmptyState, Skeleton, colors, spacing } from '../../design-system';

export default function Notas({ navigation }) {
  const { talk } = useContext(AuthContext);
  const { data, isLoading, isRefetching, refetch } = useQuery({
    queryKey: ['enrollments'],
    queryFn: () => listEnrollments().then((res) => res.data.data),
  });

  if (isLoading) {
    return (
      <Screen>
        <View style={{ marginTop: spacing.lg, gap: spacing.md }}>
          <Skeleton height={64} />
          <Skeleton height={64} />
          <Skeleton height={64} />
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
          <Card
            style={styles.allGradesCard}
            onPress={() => navigation.navigate('NotasDetalhe', { all: true })}
            accessibilityLabel="Ver todas as disciplinas"
            accessibilityHint="Mostra as notas de todas as disciplinas já inscritas"
          >
            <View style={styles.cardRow}>
              <AppText variant="subtitle" color={colors.primaryDark}>
                Ver todas as disciplinas
              </AppText>
              <MaterialIcons name="chevron-right" size={22} color={colors.primaryDark} />
            </View>
          </Card>
        }
        ListEmptyComponent={
          <EmptyState
            icon="fact-check"
            title="Sem inscrições encontradas"
            description="Ainda não há inscrições registadas na tua conta."
          />
        }
        renderItem={({ item }) => (
          <Card
            style={styles.card}
            accentColor={colors.categoryNotas}
            onPress={() => {
              if (talk) {
                speckNormal(`${item.semester}º semestre de ${item.period}`, talk);
                return;
              }
              navigation.navigate('NotasDetalhe', {
                enrollmentId: item._id,
                period: item.period,
                semester: item.semester,
              });
            }}
            accessibilityLabel={`${item.semester}º semestre de ${item.period}`}
            accessibilityHint="Abrir notas deste semestre"
          >
            <View style={styles.cardRow}>
              <View style={styles.cardRowLeft}>
                <IconBadge icon="fact-check" color={colors.categoryNotas} size="sm" />
                <AppText variant="subtitle" style={styles.cardLabel}>{`${item.semester}º semestre de ${item.period}`}</AppText>
              </View>
              <MaterialIcons name="chevron-right" size={22} color={colors.textTertiary} />
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
  card: {
    marginBottom: spacing.md,
  },
  allGradesCard: {
    marginBottom: spacing.lg,
    backgroundColor: colors.background,
    borderWidth: 1,
    borderColor: colors.primary,
  },
  cardRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardRowLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flexShrink: 1,
  },
  cardLabel: {
    marginLeft: spacing.md,
  },
});
