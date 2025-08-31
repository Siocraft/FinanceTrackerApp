import React from 'react';
import { View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';
import { Card } from '../common/Card';
import { ThemedText } from '../common/ThemedText';
import { useTheme } from '../../theme';
import { createBalanceCardStyles } from './BalanceCard.styles';

interface BalanceCardProps {
  totalBalance: number;
  monthlyIncome: number;
  monthlyExpenses: number;
  currency?: string;
}

export const BalanceCard: React.FC<BalanceCardProps> = ({
  totalBalance,
  monthlyIncome,
  monthlyExpenses,
  currency = '$',
}) => {
  const { t } = useTranslation();
  const { theme } = useTheme();

  const formatAmount = (amount: number) => {
    return `${currency}${Math.abs(amount).toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  };

  const styles = createBalanceCardStyles(theme);

  return (
    <View style={styles.container}>
      <Card
        gradient={true}
        gradientColors={theme.gradients.primary}
        padding='large'
        elevation={4}
      >
        <View style={styles.header}>
          <ThemedText variant='body2' color='textSecondary'>
            {t('balance.totalBalance')}
          </ThemedText>
          <View style={styles.balanceContainer}>
            <ThemedText
              variant='h1'
              weight='700'
              style={{ color: theme.colors.onPrimary }}
            >
              {formatAmount(totalBalance)}
            </ThemedText>
          </View>
        </View>

        <View style={styles.statsContainer}>
          {/* Income */}
          <View style={styles.statItem}>
            <View
              style={[styles.statIconContainer, styles.incomeIconContainer]}
            >
              <Ionicons
                name='trending-up'
                size={20}
                color={theme.colors.income}
              />
            </View>
            <ThemedText
              variant='caption'
              style={{ color: theme.colors.onPrimary, opacity: 0.8 }}
            >
              {t('balance.income')}
            </ThemedText>
            <ThemedText
              variant='body1'
              weight='600'
              style={{ color: theme.colors.onPrimary }}
            >
              {formatAmount(monthlyIncome)}
            </ThemedText>
          </View>

          {/* Divider */}
          <View style={styles.divider} />

          {/* Expenses */}
          <View style={styles.statItem}>
            <View
              style={[styles.statIconContainer, styles.expenseIconContainer]}
            >
              <Ionicons
                name='trending-down'
                size={20}
                color={theme.colors.expense}
              />
            </View>
            <ThemedText
              variant='caption'
              style={{ color: theme.colors.onPrimary, opacity: 0.8 }}
            >
              {t('balance.expenses')}
            </ThemedText>
            <ThemedText
              variant='body1'
              weight='600'
              style={{ color: theme.colors.onPrimary }}
            >
              {formatAmount(monthlyExpenses)}
            </ThemedText>
          </View>
        </View>
      </Card>
    </View>
  );
};
