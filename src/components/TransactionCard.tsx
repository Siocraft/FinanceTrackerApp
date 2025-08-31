import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Card } from './Card';
import { ThemedText } from './ThemedText';
import { useTheme } from '../theme';
import { Transaction, TransactionType } from '../types';

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

  const styles = StyleSheet.create({
    container: {
      marginVertical: theme.spacing.xs,
    },
    content: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    iconContainer: {
      width: 48,
      height: 48,
      borderRadius: theme.borderRadius.md,
      backgroundColor: transaction.type === 'income' 
        ? `${theme.colors.income}20` 
        : `${theme.colors.expense}20`,
      alignItems: 'center',
      justifyContent: 'center',
      marginRight: theme.spacing.md,
    },
    textContainer: {
      flex: 1,
    },
    titleRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: theme.spacing.xs,
    },
    categoryRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    amountContainer: {
      alignItems: 'flex-end',
    },
  });

  const CardComponent = onPress ? TouchableOpacity : View;

  return (
    <CardComponent
      style={styles.container}
      onPress={onPress}
      activeOpacity={onPress ? 0.7 : 1}
    >
      <Card padding="medium">
        <View style={styles.content}>
          <View style={styles.iconContainer}>
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