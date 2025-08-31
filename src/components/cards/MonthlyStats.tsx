import React from 'react';
import { View } from 'react-native';
import { ThemedText } from '../common/ThemedText';
import { Card } from '../common/Card';
import { useTheme } from '../../theme';
import { createMonthlyStatsStyles } from './MonthlyStats.styles';

interface MonthlyStatsProps {
  transactionCount: number;
  avgDaily: number;
  savings: number;
}

export const MonthlyStats: React.FC<MonthlyStatsProps> = ({
  transactionCount,
  avgDaily,
  savings,
}) => {
  const { theme } = useTheme();
  const styles = createMonthlyStatsStyles(theme);

  return (
    <Card style={styles.statsCard} padding='large'>
      <ThemedText
        variant='h3'
        weight='600'
        style={{ marginBottom: theme.spacing.md }}
      >
        This Month
      </ThemedText>
      <View style={styles.statsRow}>
        <View style={styles.statItem}>
          <ThemedText variant='body2' color='textSecondary'>
            Transactions
          </ThemedText>
          <ThemedText variant='h3' weight='700' color='primary'>
            {transactionCount}
          </ThemedText>
        </View>
        <View style={styles.statItem}>
          <ThemedText variant='body2' color='textSecondary'>
            Avg/Day
          </ThemedText>
          <ThemedText variant='h3' weight='700' color='primary'>
            ${avgDaily.toFixed(2)}
          </ThemedText>
        </View>
        <View style={styles.statItem}>
          <ThemedText variant='body2' color='textSecondary'>
            Savings
          </ThemedText>
          <ThemedText
            variant='h3'
            weight='700'
            color={savings >= 0 ? 'income' : 'expense'}
          >
            ${Math.abs(savings).toFixed(2)}
          </ThemedText>
        </View>
      </View>
    </Card>
  );
};
