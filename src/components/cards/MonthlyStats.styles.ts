import { StyleSheet } from 'react-native';
import { AppTheme } from '../types/theme';

export const createMonthlyStatsStyles = (theme: AppTheme) => StyleSheet.create({
  statsCard: {
    marginBottom: theme.spacing.lg,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
  },
});
