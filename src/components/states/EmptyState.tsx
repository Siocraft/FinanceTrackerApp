import React from 'react';
import { View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ThemedText } from '../common/ThemedText';
import { useTheme } from '../../theme';
import { createEmptyStateStyles } from './EmptyState.styles';

interface EmptyStateProps {
  icon?: keyof typeof Ionicons.glyphMap;
  title?: string;
  message?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon = 'receipt-outline',
  title = 'No Transactions Yet',
  message = 'Start by adding your first income or expense transaction',
}) => {
  const { theme } = useTheme();
  const styles = createEmptyStateStyles(theme);

  return (
    <View style={styles.emptyContainer}>
      <Ionicons name={icon} size={64} color={theme.colors.textSecondary} />
      <ThemedText variant="h3" weight="600" style={{ marginTop: theme.spacing.md }}>
        {title}
      </ThemedText>
      <ThemedText 
        variant="body2" 
        color="textSecondary" 
        style={{ textAlign: 'center', marginTop: theme.spacing.sm }}
      >
        {message}
      </ThemedText>
    </View>
  );
};
