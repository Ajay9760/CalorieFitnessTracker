import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { COLORS, DIMENSIONS, CHART_CONFIG } from '../constants';
import { LineChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';

const screenWidth = Dimensions.get('window').width - DIMENSIONS.margin * 2;

export default function DashboardScreen() {
  const stepData = {
    labels: ['M', 'T', 'W', 'T', 'F', 'S', 'S'],
    datasets: [{ data: [5200, 6800, 7400, 9000, 12000, 8000, 10000] }],
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Today</Text>
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Weekly Steps</Text>
        <LineChart
          data={stepData}
          width={screenWidth}
          height={180}
          chartConfig={CHART_CONFIG as any}
          bezier
          style={styles.chart}
        />
      </View>
      <View style={styles.row}>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>1,650</Text>
          <Text style={styles.statLabel}>Calories left</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>7,842</Text>
          <Text style={styles.statLabel}>Steps</Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  content: { padding: DIMENSIONS.padding },
  title: { fontSize: 22, fontWeight: '700', color: COLORS.textPrimary, marginBottom: 12 },
  card: {
    backgroundColor: COLORS.surface,
    padding: DIMENSIONS.padding,
    borderRadius: DIMENSIONS.borderRadius,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
    marginBottom: 16,
  },
  cardTitle: { fontSize: 16, color: COLORS.textSecondary, marginBottom: 8 },
  chart: { borderRadius: DIMENSIONS.borderRadius },
  row: { flexDirection: 'row', justifyContent: 'space-between' },
  statCard: {
    flex: 1,
    backgroundColor: COLORS.surface,
    padding: DIMENSIONS.padding,
    borderRadius: DIMENSIONS.borderRadius,
    marginRight: 8,
  },
  statValue: { fontSize: 20, fontWeight: '700', color: COLORS.textPrimary },
  statLabel: { fontSize: 12, color: COLORS.textSecondary },
});

