import React, { useState } from 'react';
import { View, ScrollView, Modal } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import {
  Header,
  BalanceCard,
  LoadingState,
  ErrorState,
  QuickActions,
  MonthlyStats,
  TransactionsList,
  Button,
} from '../components';
import { useTheme } from '../theme';
import { useTransactionsQuery } from '../hooks/useTransactionsQuery';
import { useTransactionStats } from '../hooks/useTransactionStats';
import { AddTransactionScreen } from './AddTransactionScreen';
import { createHomeScreenStyles } from './HomeScreen.styles';

export const HomeScreen: React.FC = () => {
  const { isDark, themeType, setThemeType, theme } = useTheme();
  const [showAllTransactions, setShowAllTransactions] = useState(false);
  const [showAddTransaction, setShowAddTransaction] = useState(false);

  // Use React Query for API data
  const {
    data: transactions = [],
    isLoading: loading,
    error,
    refetch: refresh,
  } = useTransactionsQuery({
    pagination: showAllTransactions ? {} : { limit: 3 },
  });

  // Use custom hook for statistics calculation
  const stats = useTransactionStats(transactions);

  const toggleTheme = () => {
    const nextTheme = themeType === 'light' ? 'dark' : 'light';
    setThemeType(nextTheme);
  };

  const handleRefresh = () => {
    refresh();
  };

  const handleShowAllToggle = () => {
    setShowAllTransactions(!showAllTransactions);
  };

  const handleAddTransaction = () => {
    setShowAddTransaction(true);
  };

  const handleTransactionAdded = () => {
    setShowAddTransaction(false);
    // React Query will automatically refetch due to mutation invalidation
  };

  const handleTransactionPress = (transaction: any) => {
    console.log('Transaction pressed:', transaction.id);
  };

  const styles = createHomeScreenStyles(theme);

  // Loading state
  if (loading) {
    return (
      <View style={styles.container}>
        <StatusBar
          style={isDark ? 'light' : 'dark'}
          backgroundColor={theme.colors.background}
        />
        <Header onThemeToggle={toggleTheme} />
        <LoadingState />
      </View>
    );
  }

  // Error state
  if (error) {
    return (
      <View style={styles.container}>
        <StatusBar style={isDark ? 'light' : 'dark'} />
        <Header onThemeToggle={toggleTheme} />
        <ErrorState error={error} onRetry={handleRefresh} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar style={isDark ? 'light' : 'dark'} />

      <Header onThemeToggle={toggleTheme} />

      <ScrollView
        style={styles.content}
        contentContainerStyle={{ backgroundColor: theme.colors.background }}
        showsVerticalScrollIndicator={false}
      >
        {/* Balance Card */}
        <BalanceCard
          totalBalance={stats.totalBalance}
          monthlyIncome={stats.monthlyIncome}
          monthlyExpenses={stats.monthlyExpenses}
        />

        {/* Quick Actions */}
        <QuickActions onAddTransaction={handleAddTransaction} />

        {/* Monthly Statistics */}
        <MonthlyStats
          transactionCount={stats.transactionCount}
          avgDaily={stats.avgDaily}
          savings={stats.savings}
        />

        {/* Transactions List */}
        <TransactionsList
          transactions={transactions}
          showAllTransactions={showAllTransactions}
          onToggleShowAll={handleShowAllToggle}
          onTransactionPress={handleTransactionPress}
        />

        {/* Add Transaction Button */}
        <Button
          title='Add New Transaction'
          onPress={handleAddTransaction}
          variant='outline'
          style={{ marginBottom: 32 }}
        />
      </ScrollView>

      {/* Add Transaction Modal */}
      <Modal
        visible={showAddTransaction}
        animationType='slide'
        presentationStyle='pageSheet'
      >
        <AddTransactionScreen
          onClose={() => setShowAddTransaction(false)}
          onSuccess={handleTransactionAdded}
        />
      </Modal>
    </View>
  );
};
