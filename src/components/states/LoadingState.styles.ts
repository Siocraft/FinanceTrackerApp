import { StyleSheet } from 'react-native';
import { AppTheme } from '../types/theme';

export const createLoadingStateStyles = (theme: AppTheme) => StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.background,
  },
});
