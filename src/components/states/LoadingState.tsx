import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import { useTranslation } from 'react-i18next';
import { ThemedText } from '../common/ThemedText';
import { useTheme } from '../../theme';
import { createLoadingStateStyles } from './LoadingState.styles';

interface LoadingStateProps {
  message?: string;
}

export const LoadingState: React.FC<LoadingStateProps> = ({ message }) => {
  const { t } = useTranslation();
  const { theme } = useTheme();
  const styles = createLoadingStateStyles(theme);

  return (
    <View style={styles.loadingContainer}>
      <ActivityIndicator size='large' color={theme.colors.primary} />
      <ThemedText variant='body1' style={{ marginTop: theme.spacing.md }}>
        {message || t('states.loading.default')}
      </ThemedText>
    </View>
  );
};
