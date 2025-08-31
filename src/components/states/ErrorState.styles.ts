import { StyleSheet } from 'react-native';
import { AppTheme } from '../types/theme';

export const createErrorStateStyles = (theme: AppTheme) => StyleSheet.create({
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.background,
    paddingHorizontal: theme.spacing.lg,
  },
  errorCard: {
    padding: theme.spacing.lg,
    backgroundColor: theme.colors.error + '20',
    borderRadius: theme.borderRadius.md,
    alignItems: 'center',
    maxWidth: 300,
  },
});
