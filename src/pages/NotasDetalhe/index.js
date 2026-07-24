import React, { useContext, useState } from 'react';
import { View, Pressable, FlatList, RefreshControl, StyleSheet, Alert } from 'react-native';
import { useQuery } from '@tanstack/react-query';
import AuthContext from '../../contexts/auth';
import { gradesByEnrollment, allGrades } from '../../services/grades';
import { exportGradesPdf } from '../../services/pdf';
import { speckNormal } from '../../helpers';
import {
  Screen,
  AppText,
  Card,
  Button,
  EmptyState,
  Skeleton,
  StatusPill,
  frequencyResultTone,
  colors,
  spacing,
} from '../../design-system';

function NoteBox({ label, spokenLabel, value, talk }) {
  const hasValue = value !== null && value !== undefined;
  return (
    <Pressable
      style={styles.noteBox}
      accessibilityRole="text"
      accessibilityLabel={hasValue ? `${spokenLabel} ${value} valores` : `sem nota do ${spokenLabel}`}
      onPress={() =>
        speckNormal(hasValue ? `${spokenLabel} ${value} valores` : `sem nota do ${spokenLabel}`, talk)
      }
    >
      <AppText variant="caption" color={colors.textOnPrimary}>
        {label}
      </AppText>
      <AppText variant="subtitle" color={colors.textOnPrimary}>
        {value ?? '-'}
      </AppText>
    </Pressable>
  );
}

function DisciplineCard({ item, showExam, talk }) {
  const disciplineName = item.discipline?.name;
  return (
    <Card style={styles.card} accentColor={colors.categoryNotas}>
      <Pressable
        accessibilityRole="header"
        accessibilityLabel={disciplineName}
        onPress={() => speckNormal(disciplineName, talk)}
      >
        <AppText variant="subtitle" style={styles.disciplineName}>
          {disciplineName}
        </AppText>
      </Pressable>

      {!showExam ? (
        <>
          <View style={styles.notesRow}>
            <NoteBox label="Teste 1" spokenLabel="primeiro teste" value={item.test1} talk={talk} />
            <NoteBox label="Teste 2" spokenLabel="segundo teste" value={item.test2} talk={talk} />
            <NoteBox label="Teste 3" spokenLabel="terceiro teste" value={item.test3} talk={talk} />
          </View>
          <View style={styles.notesRow}>
            <NoteBox label="Trab. 1" spokenLabel="primeiro trabalho" value={item.work1} talk={talk} />
            <NoteBox label="Trab. 2" spokenLabel="segundo trabalho" value={item.work2} talk={talk} />
            <NoteBox label="Trab. 3" spokenLabel="terceiro trabalho" value={item.work3} talk={talk} />
          </View>
          <Pressable
            style={styles.averageRow}
            accessibilityRole="text"
            accessibilityLabel={`${item.frequency_result || 'sem resultado'} na cadeira de ${disciplineName} com a média de ${item.frequency_avg ?? 'desconhecida'} valores`}
            onPress={() =>
              speckNormal(
                `${item.frequency_result || 'sem resultado'} na cadeira de ${disciplineName} com a média de ${item.frequency_avg ?? 'desconhecida'} valores`,
                talk
              )
            }
          >
            <AppText variant="body" color={colors.textSecondary}>
              Média de frequência: {item.frequency_avg ?? '-'}
            </AppText>
            {!!item.frequency_result && (
              <StatusPill label={item.frequency_result} tone={frequencyResultTone(item.frequency_result)} />
            )}
          </Pressable>
        </>
      ) : (
        <>
          <View style={styles.notesRow}>
            <NoteBox
              label="E. Normal"
              spokenLabel="exame normal"
              value={item.exam}
              talk={talk}
            />
            <NoteBox
              label="Recorrência"
              spokenLabel="exame de recorrência"
              value={item.exam_recurrence}
              talk={talk}
            />
          </View>
          <Pressable
            style={styles.averageRow}
            accessibilityRole="text"
            accessibilityLabel={
              item.final_avg
                ? `${item.final_result} com a média final de ${item.final_avg} valores`
                : `${item.final_result || 'sem resultado final'}`
            }
            onPress={() =>
              speckNormal(
                item.final_avg
                  ? `${item.final_result} com a média final de ${item.final_avg} valores`
                  : `${item.final_result || 'sem resultado final'}`,
                talk
              )
            }
          >
            <AppText variant="body" color={colors.textSecondary}>
              Resultado final: {item.final_avg ?? '-'}
            </AppText>
            {!!item.final_result && (
              <StatusPill label={item.final_result} tone={frequencyResultTone(item.final_result)} />
            )}
          </Pressable>
        </>
      )}
    </Card>
  );
}

export default function NotasDetalhe({ route, navigation }) {
  const { enrollmentId, period, semester, all } = route.params;
  const { user, talk, exameNote, exameView } = useContext(AuthContext);
  const [exporting, setExporting] = useState(false);

  const { data, isLoading, isRefetching, refetch, error } = useQuery({
    queryKey: all ? ['grades', 'all'] : ['grades', enrollmentId],
    queryFn: () =>
      (all ? allGrades() : gradesByEnrollment(enrollmentId)).then((res) => res.data.data),
  });

  async function handleExportPdf() {
    try {
      setExporting(true);
      await exportGradesPdf({
        studentName: user?.full_name,
        studentId: user?._id,
        courseName: user?.course?.name,
        period: all ? 'todos os anos' : period,
        semester: all ? '' : semester,
        grades: data || [],
      });
    } catch (err) {
      Alert.alert('Não foi possível gerar o PDF', 'Tenta novamente mais tarde.');
    } finally {
      setExporting(false);
    }
  }

  if (isLoading) {
    return (
      <Screen>
        <View style={{ marginTop: spacing.lg, gap: spacing.md }}>
          <Skeleton height={140} />
          <Skeleton height={140} />
        </View>
      </Screen>
    );
  }

  if (error?.response?.status === 403) {
    return (
      <Screen>
        <EmptyState
          icon="lock-outline"
          title="Acesso bloqueado"
          description={error.response.data?.message}
          actionLabel="Aceder à plataforma"
          onAction={() => navigation.navigate('NavigatingOut')}
        />
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
          !!data?.length && (
            <View style={styles.toggleRow}>
              <Button
                title={exameNote ? 'A ver: Exames' : 'A ver: Frequência'}
                variant="ghost"
                onPress={() => exameView(!exameNote)}
              />
            </View>
          )
        }
        ListEmptyComponent={
          <EmptyState
            icon="fact-check"
            title="Sem notas encontradas"
            description="Verifica se a inscrição foi confirmada e se as propinas estão em dia."
            actionLabel="Aceder à plataforma"
            onAction={() => navigation.navigate('NavigatingOut')}
          />
        }
        renderItem={({ item }) => <DisciplineCard item={item} showExam={exameNote} talk={talk} />}
      />
      {!!data?.length && (
        <View style={styles.pdfButton}>
          <Button
            title={exporting ? 'A gerar PDF…' : 'Baixar PDF'}
            loading={exporting}
            onPress={handleExportPdf}
            accessibilityHint="Gera e partilha um PDF com estas notas"
          />
        </View>
      )}
    </Screen>
  );
}

const styles = StyleSheet.create({
  list: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.lg,
    paddingBottom: spacing.xxl * 2,
    flexGrow: 1,
  },
  toggleRow: {
    marginBottom: spacing.md,
    alignItems: 'flex-start',
  },
  card: {
    marginBottom: spacing.md,
  },
  disciplineName: {
    marginBottom: spacing.sm,
  },
  notesRow: {
    flexDirection: 'row',
    gap: spacing.sm,
    marginBottom: spacing.sm,
  },
  noteBox: {
    flex: 1,
    backgroundColor: colors.categoryNotas,
    borderRadius: 8,
    paddingVertical: spacing.sm,
    alignItems: 'center',
  },
  averageRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: spacing.xs,
  },
  pdfButton: {
    position: 'absolute',
    left: spacing.lg,
    right: spacing.lg,
    bottom: spacing.lg,
  },
});
