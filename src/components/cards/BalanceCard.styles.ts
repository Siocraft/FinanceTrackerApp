import { StyleSheet } from 'react-native';
import { AppTheme } from '../types/theme';

export const createBalanceCardStyles = (theme: AppTheme) => StyleSheet.create({
  container: {
    marginVertical: theme.spacing.md,
  },
  header: {
    alignItems: 'center',
    marginBottom: theme.spacing.lg,
  },
  balanceContainer: {
    alignItems: 'center',
    marginBottom: theme.spacing.sm,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: theme.spacing.md,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: theme.spacing.sm,
  },
  statIconContainer: {
    width: 40,
    height: 40,
    borderRadius: theme.borderRadius.round,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: theme.spacing.sm,
  },
  incomeIconContainer: {
    backgroundColor: `${theme.colors.income}20`,
  },
  expenseIconContainer: {
    backgroundColor: `${theme.colors.expense}20`,
  },
  divider: {
    width: 1,
    height: '100%',
    backgroundColor: theme.colors.border,
    marginHorizontal: theme.spacing.md,
  },
});
