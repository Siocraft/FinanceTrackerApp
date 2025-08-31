import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { ThemedText } from '../common/ThemedText';
import { TransactionCard } from '../cards/TransactionCard';
import { EmptyState } from './EmptyState';
import { Transaction } from '../../types';
import { useTheme } from '../../theme';
import { createTransactionsListStyles } from './TransactionsList.styles';

interface TransactionsListProps {
  transactions: Transaction[];
  showAllTransactions: boolean;
  onToggleShowAll: () => void;
  onTransactionPress?: (transaction: Transaction) => void;
}

export const TransactionsList: React.FC<TransactionsListProps> = ({
  transactions,
  showAllTransactions,
  onToggleShowAll,
  onTransactionPress,
}) => {
  const { theme } = useTheme();
  const styles = createTransactionsListStyles(theme);

  return (
    <>
      <View style={styles.sectionHeader}>
        <ThemedText variant='h3' weight='600'>
          Recent Transactions
        </ThemedText>
        {transactions && transactions.length > 3 && (
          <TouchableOpacity onPress={onToggleShowAll}>
            <ThemedText variant='body2' color='primary'>
              {showAllTransactions ? 'Show Less' : 'See All'}
            </ThemedText>
          </TouchableOpacity>
        )}
      </View>

      <View style={styles.transactionsList}>
        {!transactions || transactions.length === 0 ? (
          <EmptyState />
        ) : (
          transactions.map(transaction => (
            <TransactionCard
              key={transaction.id}
              transaction={transaction}
              onPress={() => onTransactionPress?.(transaction)}
            />
          ))
        )}
      </View>
    </>
  );
};
