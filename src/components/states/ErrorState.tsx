import React from 'react';
import { View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';
import { ThemedText } from '../common/ThemedText';
import { Button } from '../common/Button';
import { useTheme } from '../../theme';
import { createErrorStateStyles } from './ErrorState.styles';

interface ErrorStateProps {
  title?: string;
  message?: string;
  error?: Error | null;
  onRetry?: () => void;
}

export const ErrorState: React.FC<ErrorStateProps> = ({
  title,
  message,
  error,
  onRetry,
}) => {
  const { t } = useTranslation();
  const { theme } = useTheme();
  const styles = createErrorStateStyles(theme);

  const errorTitle = title || t('states.error.connectionError');
  const errorMessage =
    message || error?.message || t('states.error.defaultMessage');

  return (
    <View style={styles.errorContainer}>
      <View style={styles.errorCard}>
        <Ionicons name='warning' size={48} color={theme.colors.error} />
        <ThemedText
          variant='h3'
          weight='600'
          style={{ marginTop: theme.spacing.md }}
        >
          {errorTitle}
        </ThemedText>
        <ThemedText
          variant='body2'
          color='textSecondary'
          style={{ textAlign: 'center', marginVertical: theme.spacing.sm }}
        >
          {errorMessage}
        </ThemedText>
        {onRetry && (
          <Button
            title={t('common.retry')}
            onPress={onRetry}
            variant='primary'
            style={{ marginTop: theme.spacing.md }}
          />
        )}
      </View>
    </View>
  );
};
