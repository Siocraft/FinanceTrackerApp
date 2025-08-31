import { StyleSheet } from 'react-native';
import { AppTheme } from '../types/theme';

export const createTransactionsListStyles = (theme: AppTheme) => StyleSheet.create({
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.md,
    marginTop: theme.spacing.lg,
  },
  transactionsList: {
    marginBottom: theme.spacing.xl,
  },
});
