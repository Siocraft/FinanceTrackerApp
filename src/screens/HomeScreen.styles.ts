import { StyleSheet } from 'react-native';
import { AppTheme } from '../types/theme';

export const createHomeScreenStyles = (theme: AppTheme) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  content: {
    flex: 1,
    paddingHorizontal: theme.spacing.lg,
  },
});
