import { StyleSheet } from 'react-native';
import { AppTheme } from '../../types/theme';

export const createQuickActionsStyles = (theme: AppTheme) => StyleSheet.create({
  quickActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: theme.spacing.lg,
  },
  quickActionButton: {
    flex: 1,
    marginHorizontal: theme.spacing.xs,
  },
});
