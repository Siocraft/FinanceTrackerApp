import { StyleSheet } from 'react-native';
import type { themes } from '../../theme';

type AppTheme = typeof themes.light;

export const createHomeScreenStyles = (theme: AppTheme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    content: {
      flex: 1,
      paddingHorizontal: theme.spacing.lg,
    },
  });
