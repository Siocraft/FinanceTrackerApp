import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Card } from '../common/Card';
import { ThemedText } from '../common/ThemedText';
import { useTheme } from '../../theme';
import { Transaction, TransactionType } from '../../types';
import { createTransactionCardStyles } from './TransactionCard.styles';

interface TransactionCardProps {
  transaction: Transaction;
  onPress?: () => void;
}

export const TransactionCard: React.FC<TransactionCardProps> = ({
  transaction,
  onPress,
}) => {
  const { theme } = useTheme();

  const getCategoryIcon = (category: string, type: TransactionType) => {
    const iconMap: { [key: string]: keyof typeof Ionicons.glyphMap } = {
      // Income categories
      salary: 'briefcase-outline',
      freelance: 'laptop-outline',
      investment: 'trending-up-outline',
      gift: 'gift-outline',
      other_income: 'add-circle-outline',
      
      // Expense categories
      food: 'restaurant-outline',
      transport: 'car-outline',
      shopping: 'bag-outline',
      entertainment: 'game-controller-outline',
      bills: 'receipt-outline',
      health: 'medical-outline',
      education: 'school-outline',
      other_expense: 'remove-circle-outline',
    };

    return iconMap[category] || (type === 'income' ? 'add-circle-outline' : 'remove-circle-outline');
  };

  const formatAmount = (amount: number, type: TransactionType) => {
    const sign = type === 'income' ? '+' : '-';
    return `${sign}$${Math.abs(amount).toFixed(2)}`;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
    });
  };

  const styles = createTransactionCardStyles(theme);

  const CardComponent = onPress ? TouchableOpacity : View;

  return (
    <CardComponent
      style={styles.container}
      onPress={onPress}
      activeOpacity={onPress ? 0.7 : 1}
    >
      <Card padding="medium">
        <View style={styles.content}>
          <View style={[
            styles.iconContainer,
            {
              backgroundColor: transaction.type === 'income' 
                ? `${theme.colors.income}20` 
                : `${theme.colors.expense}20`
            }
          ]}>
            <Ionicons
              name={getCategoryIcon(transaction.category, transaction.type)}
              size={24}
              color={transaction.type === 'income' ? theme.colors.income : theme.colors.expense}
            />
          </View>
          
          <View style={styles.textContainer}>
            <View style={styles.titleRow}>
              <ThemedText variant="body1" weight="600">
                {transaction.description}
              </ThemedText>
              <ThemedText
                variant="body1"
                weight="700"
                color={transaction.type === 'income' ? 'income' : 'expense'}
              >
                {formatAmount(transaction.amount, transaction.type)}
              </ThemedText>
            </View>
            
            <View style={styles.categoryRow}>
              <ThemedText variant="body2" color="textSecondary">
                {transaction.category.replace(/[_-]/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
              </ThemedText>
              <ThemedText variant="body2" color="textSecondary">
                {formatDate(transaction.date)}
              </ThemedText>
            </View>
          </View>
        </View>
      </Card>
    </CardComponent>
  );
};