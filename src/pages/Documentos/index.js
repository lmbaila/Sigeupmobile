import React from 'react';
import { FlatList, RefreshControl, View, StyleSheet, Linking, Alert } from 'react-native';
import { useQuery } from '@tanstack/react-query';
import { MaterialIcons } from '@expo/vector-icons';
import { listDocuments } from '../../services/documents';
import { Screen, AppText, Card, IconBadge, EmptyState, Skeleton, colors, spacing } from '../../design-system';

export default function Documentos() {
  const { data, isLoading, isRefetching, refetch } = useQuery({
    queryKey: ['documents'],
    queryFn: () => listDocuments().then((res) => res.data.data),
  });

  function handleOpen(doc) {
    if (doc.url) {
      Linking.openURL(doc.url);
    } else {
      Alert.alert('Documento indisponível', 'Este documento só está disponível na plataforma web do SIGEUP.');
    }
  }

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
        ListEmptyComponent={
          <EmptyState
            icon="description"
            title="Sem documentos"
            description="Não há documentos úteis disponíveis."
            tone={colors.categoryDocumentos}
          />
        }
        renderItem={({ item }) => (
          <Card
            style={styles.row}
            accentColor={colors.categoryDocumentos}
            onPress={() => handleOpen(item)}
            accessibilityLabel={item.name}
            accessibilityHint={item.description}
          >
            <View style={styles.rowContent}>
              <IconBadge icon="picture-as-pdf" color={colors.categoryDocumentos} />
              <View style={styles.rowText}>
                <AppText variant="subtitle">{item.name}</AppText>
                {!!item.description && (
                  <AppText variant="caption" color={colors.textSecondary}>
                    {item.description}
                  </AppText>
                )}
                <AppText variant="caption" color={colors.textTertiary}>
                  {item.size}
                </AppText>
              </View>
              <MaterialIcons name="file-download" size={22} color={colors.textTertiary} />
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
});
