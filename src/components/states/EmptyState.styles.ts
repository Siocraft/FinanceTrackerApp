import { StyleSheet } from 'react-native';
import { AppTheme } from '../../types/theme';

export const createEmptyStateStyles = (theme: AppTheme) => StyleSheet.create({
  emptyContainer: {
    alignItems: 'center',
    paddingVertical: theme.spacing.xl,
  },
});
