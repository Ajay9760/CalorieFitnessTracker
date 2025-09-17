import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useSelector } from 'react-redux';
import { COLORS, DIMENSIONS, TYPOGRAPHY, CHART_CONFIG } from '../constants';
import { LineChart, ProgressChart } from 'react-native-chart-kit';
import { RootState } from '../store';
import { calculateProgress } from '../utils/calculations';

const screenWidth = Dimensions.get('window').width;
const chartWidth = screenWidth - DIMENSIONS.space8;

interface StatCardProps {
  icon: string;
  title: string;
  value: string;
  subtitle?: string;
  progress?: number;
  color?: string;
  onPress?: () => void;
}

const StatCard: React.FC<StatCardProps> = ({
  icon,
  title,
  value,
  subtitle,
  progress,
  color = COLORS.primary,
  onPress,
}) => (
  <TouchableOpacity
    style={styles.statCard}
    onPress={onPress}
    activeOpacity={onPress ? 0.7 : 1}
    disabled={!onPress}
  >
    <View style={styles.statCardHeader}>
      <View style={[styles.statIcon, { backgroundColor: color + '15' }]}>
        <Icon name={icon} size={DIMENSIONS.iconLarge} color={color} />
      </View>
      {progress !== undefined && (
        <View style={styles.progressContainer}>
          <Text style={styles.progressText}>{Math.round(progress)}%</Text>
        </View>
      )}
    </View>
    <View style={styles.statContent}>
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statTitle}>{title}</Text>
      {subtitle && <Text style={styles.statSubtitle}>{subtitle}</Text>}
    </View>
  </TouchableOpacity>
);

interface QuickActionProps {
  icon: string;
  title: string;
  onPress: () => void;
}

const QuickAction: React.FC<QuickActionProps> = ({ icon, title, onPress }) => (
  <TouchableOpacity style={styles.quickAction} onPress={onPress} activeOpacity={0.7}>
    <View style={styles.quickActionIcon}>
      <Icon name={icon} size={DIMENSIONS.iconLarge} color={COLORS.primary} />
    </View>
    <Text style={styles.quickActionTitle}>{title}</Text>
  </TouchableOpacity>
);

export default function DashboardScreen() {
  const user = useSelector((state: RootState) => state.user.currentUser);
  const todayProgress = useSelector((state: RootState) => state.progress.todayProgress);
  
  // Sample data - replace with real data from Redux store
  const stepData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        data: [5200, 6800, 7400, 9000, 12000, 8000, 10000],
        color: (opacity = 1) => COLORS.primary + Math.round(opacity * 255).toString(16).padStart(2, '0'),
        strokeWidth: 3,
      },
    ],
  };

  // Sample progress data
  const currentCalories = todayProgress?.caloriesConsumed || 1450;
  const calorieGoal = user?.dailyCalorieGoal || 2000;
  const currentSteps = todayProgress?.steps || 7842;
  const stepGoal = user?.dailyStepGoal || 10000;
  const currentWater = todayProgress?.waterIntake || 1200;
  const waterGoal = user?.dailyWaterGoal || 2000;

  const calorieProgress = calculateProgress(currentCalories, calorieGoal);
  const stepProgress = calculateProgress(currentSteps, stepGoal);
  const waterProgress = calculateProgress(currentWater, waterGoal);

  const progressData = {
    labels: ['Calories', 'Steps', 'Water'],
    data: [calorieProgress / 100, stepProgress / 100, waterProgress / 100],
  };

  const progressChartConfig = {
    backgroundColor: COLORS.surface,
    backgroundGradientFrom: COLORS.surface,
    backgroundGradientTo: COLORS.surface,
    color: (opacity = 1) => COLORS.primary + Math.round(opacity * 255).toString(16).padStart(2, '0'),
    strokeWidth: 3,
  };

  const updatedChartConfig = {
    ...CHART_CONFIG,
    backgroundColor: COLORS.surface,
    backgroundGradientFrom: COLORS.surface,
    backgroundGradientTo: COLORS.surface,
    color: (opacity = 1) => COLORS.primary + Math.round(opacity * 255).toString(16).padStart(2, '0'),
    labelColor: (opacity = 1) => COLORS.textSecondary + Math.round(opacity * 255).toString(16).padStart(2, '0'),
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Good morning! 👋</Text>
            <Text style={styles.userName}>{user?.name || 'User'}</Text>
          </View>
          <TouchableOpacity style={styles.notificationButton}>
            <Icon name="bell-outline" size={DIMENSIONS.iconLarge} color={COLORS.textSecondary} />
          </TouchableOpacity>
        </View>

        {/* Today's Progress */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Today's Progress</Text>
          <View style={styles.statsGrid}>
            <StatCard
              icon="fire"
              title="Calories"
              value={currentCalories.toLocaleString()}
              subtitle={`${calorieGoal - currentCalories} left`}
              progress={calorieProgress}
              color={COLORS.chartTertiary}
            />
            <StatCard
              icon="walk"
              title="Steps"
              value={currentSteps.toLocaleString()}
              subtitle={`${Math.max(0, stepGoal - currentSteps)} to go`}
              progress={stepProgress}
              color={COLORS.secondary}
            />
            <StatCard
              icon="water"
              title="Water"
              value={`${(currentWater / 1000).toFixed(1)}L`}
              subtitle={`${Math.max(0, Math.round((waterGoal - currentWater) / 1000 * 10) / 10)}L to go`}
              progress={waterProgress}
              color={COLORS.info}
            />
          </View>
        </View>

        {/* Weekly Activity Chart */}
        <View style={styles.section}>
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Weekly Steps</Text>
            <LineChart
              data={stepData}
              width={chartWidth}
              height={200}
              chartConfig={updatedChartConfig as any}
              bezier
              style={styles.chart}
              withHorizontalLabels={true}
              withVerticalLabels={true}
              withDots={true}
              withShadow={false}
              withInnerLines={false}
              withOuterLines={false}
            />
          </View>
        </View>

        {/* Quick Actions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.quickActionsGrid}>
            <QuickAction
              icon="food-variant"
              title="Log Meal"
              onPress={() => console.log('Log meal pressed')}
            />
            <QuickAction
              icon="camera"
              title="Scan Food"
              onPress={() => console.log('Scan food pressed')}
            />
            <QuickAction
              icon="water-plus"
              title="Add Water"
              onPress={() => console.log('Add water pressed')}
            />
            <QuickAction
              icon="run"
              title="Log Activity"
              onPress={() => console.log('Log activity pressed')}
            />
          </View>
        </View>

        {/* Insights Card */}
        <View style={styles.section}>
          <View style={styles.insightCard}>
            <View style={styles.insightHeader}>
              <Icon name="lightbulb-outline" size={DIMENSIONS.iconLarge} color={COLORS.accent} />
              <Text style={styles.insightTitle}>Today's Insight</Text>
            </View>
            <Text style={styles.insightText}>
              You're doing great! You've walked 2,000 more steps than yesterday. 
              Consider adding some protein to reach your daily goal.
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollView: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: DIMENSIONS.space4,
    paddingVertical: DIMENSIONS.space6,
    backgroundColor: COLORS.surface,
    marginBottom: DIMENSIONS.space4,
  },
  greeting: {
    fontSize: TYPOGRAPHY.body,
    color: COLORS.textSecondary,
    marginBottom: DIMENSIONS.space1,
  },
  userName: {
    fontSize: TYPOGRAPHY.title2,
    fontWeight: TYPOGRAPHY.fontWeightBold,
    color: COLORS.textPrimary,
  },
  notificationButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: COLORS.gray100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  section: {
    marginBottom: DIMENSIONS.space6,
  },
  sectionTitle: {
    fontSize: TYPOGRAPHY.subtitle,
    fontWeight: TYPOGRAPHY.fontWeightSemiBold,
    color: COLORS.textPrimary,
    paddingHorizontal: DIMENSIONS.space4,
    marginBottom: DIMENSIONS.space4,
  },
  statsGrid: {
    flexDirection: 'row',
    paddingHorizontal: DIMENSIONS.space4,
    gap: DIMENSIONS.space3,
  },
  statCard: {
    flex: 1,
    backgroundColor: COLORS.surface,
    padding: DIMENSIONS.space4,
    borderRadius: DIMENSIONS.borderRadius,
    shadowColor: COLORS.black,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  statCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: DIMENSIONS.space3,
  },
  statIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  progressContainer: {
    backgroundColor: COLORS.gray100,
    paddingHorizontal: DIMENSIONS.space2,
    paddingVertical: DIMENSIONS.space1,
    borderRadius: DIMENSIONS.borderRadiusSmall,
  },
  progressText: {
    fontSize: TYPOGRAPHY.caption,
    fontWeight: TYPOGRAPHY.fontWeightMedium,
    color: COLORS.textSecondary,
  },
  statContent: {
    alignItems: 'flex-start',
  },
  statValue: {
    fontSize: TYPOGRAPHY.title2,
    fontWeight: TYPOGRAPHY.fontWeightBold,
    color: COLORS.textPrimary,
    marginBottom: DIMENSIONS.space1,
  },
  statTitle: {
    fontSize: TYPOGRAPHY.body,
    fontWeight: TYPOGRAPHY.fontWeightMedium,
    color: COLORS.textPrimary,
  },
  statSubtitle: {
    fontSize: TYPOGRAPHY.caption,
    color: COLORS.textSecondary,
    marginTop: DIMENSIONS.space1,
  },
  card: {
    backgroundColor: COLORS.surface,
    marginHorizontal: DIMENSIONS.space4,
    padding: DIMENSIONS.space4,
    borderRadius: DIMENSIONS.borderRadius,
    shadowColor: COLORS.black,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  cardTitle: {
    fontSize: TYPOGRAPHY.subtitle,
    fontWeight: TYPOGRAPHY.fontWeightSemiBold,
    color: COLORS.textPrimary,
    marginBottom: DIMENSIONS.space4,
  },
  chart: {
    borderRadius: DIMENSIONS.borderRadius,
    marginVertical: DIMENSIONS.space2,
  },
  quickActionsGrid: {
    flexDirection: 'row',
    paddingHorizontal: DIMENSIONS.space4,
    gap: DIMENSIONS.space3,
  },
  quickAction: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    padding: DIMENSIONS.space4,
    borderRadius: DIMENSIONS.borderRadius,
    shadowColor: COLORS.black,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  quickActionIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: COLORS.primaryLight + '20',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: DIMENSIONS.space2,
  },
  quickActionTitle: {
    fontSize: TYPOGRAPHY.caption,
    fontWeight: TYPOGRAPHY.fontWeightMedium,
    color: COLORS.textPrimary,
    textAlign: 'center',
  },
  insightCard: {
    backgroundColor: COLORS.surface,
    marginHorizontal: DIMENSIONS.space4,
    padding: DIMENSIONS.space5,
    borderRadius: DIMENSIONS.borderRadius,
    borderLeftWidth: 4,
    borderLeftColor: COLORS.accent,
    shadowColor: COLORS.black,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  insightHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: DIMENSIONS.space3,
  },
  insightTitle: {
    fontSize: TYPOGRAPHY.subtitle,
    fontWeight: TYPOGRAPHY.fontWeightSemiBold,
    color: COLORS.textPrimary,
    marginLeft: DIMENSIONS.space3,
  },
  insightText: {
    fontSize: TYPOGRAPHY.body,
    color: COLORS.textSecondary,
    lineHeight: TYPOGRAPHY.lineHeightRelaxed * TYPOGRAPHY.body,
  },
});

