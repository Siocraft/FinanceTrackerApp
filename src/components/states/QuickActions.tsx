import React from 'react';
import { View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Button } from '../common/Button';
import { useTheme } from '../../theme';
import { createQuickActionsStyles } from './QuickActions.styles';

interface QuickActionsProps {
  onAddTransaction: () => void;
}

export const QuickActions: React.FC<QuickActionsProps> = ({
  onAddTransaction,
}) => {
  const { t } = useTranslation();
  const { theme } = useTheme();
  const styles = createQuickActionsStyles(theme);

  return (
    <View style={styles.quickActions}>
      <Button
        title={t('quickActions.addIncome')}
        onPress={onAddTransaction}
        variant='primary'
        gradient={true}
        style={styles.quickActionButton}
      />
      <Button
        title={t('quickActions.addExpense')}
        onPress={onAddTransaction}
        variant='secondary'
        gradient={true}
        style={styles.quickActionButton}
      />
    </View>
  );
};
