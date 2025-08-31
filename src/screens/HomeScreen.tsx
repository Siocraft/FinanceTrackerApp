import React, { useState, useMemo } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  Modal,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import {
  ThemedText,
  BalanceCard,
  TransactionCard,
  Button,
  Card,
} from '../components';
import { useTheme } from '../theme';
import { Transaction } from '../types';
import { useTransactionsQuery, useCreateTransactionMutation } from '../hooks/useTransactionsQuery';
import { AddTransactionScreen } from './AddTransactionScreen';

export const HomeScreen: React.FC = () => {
  const { theme, themeType, setThemeType, isDark } = useTheme();
  const [showAllTransactions, setShowAllTransactions] = useState(false);
  const [showAddTransaction, setShowAddTransaction] = useState(false);
  
  // Use React Query for API data
  const { 
    data: transactions = [], 
    isLoading: loading, 
    error, 
    refetch: refresh 
  } = useTransactionsQuery({
    pagination: showAllTransactions ? {} : { limit: 3 },
  });

  // Calculate statistics from real data
  const stats = useMemo(() => {
    // Handle loading or empty state
    if (!transactions || transactions.length === 0) {
      return {
        totalBalance: 0,
        monthlyIncome: 0,
        monthlyExpenses: 0,
        savings: 0,
        transactionCount: 0,
        avgDaily: 0,
      };
    }

    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();
    
    const currentMonthTransactions = transactions.filter(transaction => {
      const transactionDate = new Date(transaction.date);
      return transactionDate.getMonth() === currentMonth && 
             transactionDate.getFullYear() === currentYear;
    });

    const monthlyIncome = currentMonthTransactions
      .filter(t => t.type === 'income')
      .reduce((sum, t) => sum + t.amount, 0);

    const monthlyExpenses = currentMonthTransactions
      .filter(t => t.type === 'expense')
      .reduce((sum, t) => sum + t.amount, 0);

    const totalBalance = transactions
      .reduce((sum, t) => sum + (t.type === 'income' ? t.amount : -t.amount), 0);

    const avgDaily = currentMonthTransactions.length > 0 
      ? (monthlyIncome + monthlyExpenses) / now.getDate()
      : 0;

    return {
      totalBalance,
      monthlyIncome,
      monthlyExpenses,
      savings: monthlyIncome - monthlyExpenses,
      transactionCount: currentMonthTransactions.length,
      avgDaily,
    };
  }, [transactions]);

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

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    header: {
      paddingHorizontal: theme.spacing.lg,
      paddingTop: theme.spacing.lg,
      paddingBottom: theme.spacing.md,
    },
    headerRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: theme.spacing.md,
    },
    themeButton: {
      width: 40,
      height: 40,
      borderRadius: theme.borderRadius.round,
      backgroundColor: theme.colors.surface,
      alignItems: 'center',
      justifyContent: 'center',
      shadowColor: theme.colors.text,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 2,
    },
    content: {
      flex: 1,
      paddingHorizontal: theme.spacing.lg,
    },
    sectionHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: theme.spacing.md,
      marginTop: theme.spacing.lg,
    },
    transactionsList: {
      marginBottom: theme.spacing.xl,
    },
    quickActions: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: theme.spacing.lg,
    },
    quickActionButton: {
      flex: 1,
      marginHorizontal: theme.spacing.xs,
    },
    statsCard: {
      marginBottom: theme.spacing.lg,
    },
    statsRow: {
      flexDirection: 'row',
      justifyContent: 'space-around',
    },
    statItem: {
      alignItems: 'center',
    },
    loadingContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    errorContainer: {
      margin: theme.spacing.lg,
      padding: theme.spacing.lg,
      backgroundColor: theme.colors.error + '20',
      borderRadius: theme.borderRadius.md,
      alignItems: 'center',
    },
    emptyContainer: {
      alignItems: 'center',
      paddingVertical: theme.spacing.xl,
    },
  });

  // Loading state
  if (loading) {
    return (
      <View style={styles.container}>
        <StatusBar style={isDark ? 'light' : 'dark'} />
        <LinearGradient
          colors={theme.gradients.background}
          style={styles.header}
        >
          <SafeAreaView>
            <View style={styles.headerRow}>
              <View>
                <ThemedText variant="body2" color="textSecondary">
                  Welcome back!
                </ThemedText>
                <ThemedText variant="h2" weight="700">
                  Finance Tracker
                </ThemedText>
              </View>
              <TouchableOpacity style={styles.themeButton} onPress={toggleTheme}>
                <Ionicons
                  name={isDark ? 'sunny' : 'moon'}
                  size={20}
                  color={theme.colors.text}
                />
              </TouchableOpacity>
            </View>
          </SafeAreaView>
        </LinearGradient>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={theme.colors.primary} />
          <ThemedText variant="body1" style={{ marginTop: theme.spacing.md }}>
            Loading your transactions...
          </ThemedText>
        </View>
      </View>
    );
  }

  // Error state
  if (error) {
    return (
      <View style={styles.container}>
        <StatusBar style={isDark ? 'light' : 'dark'} />
        <LinearGradient
          colors={theme.gradients.background}
          style={styles.header}
        >
          <SafeAreaView>
            <View style={styles.headerRow}>
              <View>
                <ThemedText variant="body2" color="textSecondary">
                  Welcome back!
                </ThemedText>
                <ThemedText variant="h2" weight="700">
                  Finance Tracker
                </ThemedText>
              </View>
              <TouchableOpacity style={styles.themeButton} onPress={toggleTheme}>
                <Ionicons
                  name={isDark ? 'sunny' : 'moon'}
                  size={20}
                  color={theme.colors.text}
                />
              </TouchableOpacity>
            </View>
          </SafeAreaView>
        </LinearGradient>
        <View style={styles.errorContainer}>
          <Ionicons name="warning" size={48} color={theme.colors.error} />
          <ThemedText variant="h3" weight="600" style={{ marginTop: theme.spacing.md }}>
            Connection Error
          </ThemedText>
          <ThemedText variant="body2" color="textSecondary" style={{ textAlign: 'center', marginVertical: theme.spacing.sm }}>
            {error?.message || 'An error occurred'}
          </ThemedText>
          <Button
            title="Retry"
            onPress={handleRefresh}
            variant="primary"
            style={{ marginTop: theme.spacing.md }}
          />
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar style={isDark ? 'light' : 'dark'} />
      
      <LinearGradient
        colors={theme.gradients.background}
        style={styles.header}
      >
        <SafeAreaView>
          <View style={styles.headerRow}>
            <View>
              <ThemedText variant="body2" color="textSecondary">
                Welcome back!
              </ThemedText>
              <ThemedText variant="h2" weight="700">
                Finance Tracker
              </ThemedText>
            </View>
            <TouchableOpacity style={styles.themeButton} onPress={toggleTheme}>
              <Ionicons
                name={isDark ? 'sunny' : 'moon'}
                size={20}
                color={theme.colors.text}
              />
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </LinearGradient>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Balance Card */}
        <BalanceCard
          totalBalance={stats.totalBalance}
          monthlyIncome={stats.monthlyIncome}
          monthlyExpenses={stats.monthlyExpenses}
        />

        {/* Quick Actions */}
        <View style={styles.quickActions}>
          <Button
            title="Add Income"
            onPress={handleAddTransaction}
            variant="primary"
            gradient={true}
            style={styles.quickActionButton}
          />
          <Button
            title="Add Expense"
            onPress={handleAddTransaction}
            variant="secondary"
            gradient={true}
            style={styles.quickActionButton}
          />
        </View>

        {/* Statistics Card */}
        <Card style={styles.statsCard} padding="large">
          <ThemedText variant="h3" weight="600" style={{ marginBottom: theme.spacing.md }}>
            This Month
          </ThemedText>
          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <ThemedText variant="body2" color="textSecondary">
                Transactions
              </ThemedText>
              <ThemedText variant="h3" weight="700" color="primary">
                {stats.transactionCount}
              </ThemedText>
            </View>
            <View style={styles.statItem}>
              <ThemedText variant="body2" color="textSecondary">
                Avg/Day
              </ThemedText>
              <ThemedText variant="h3" weight="700" color="primary">
                ${stats.avgDaily.toFixed(2)}
              </ThemedText>
            </View>
            <View style={styles.statItem}>
              <ThemedText variant="body2" color="textSecondary">
                Savings
              </ThemedText>
              <ThemedText variant="h3" weight="700" color={stats.savings >= 0 ? "income" : "expense"}>
                ${Math.abs(stats.savings).toFixed(2)}
              </ThemedText>
            </View>
          </View>
        </Card>

        {/* Recent Transactions */}
        <View style={styles.sectionHeader}>
          <ThemedText variant="h3" weight="600">
            Recent Transactions
          </ThemedText>
          {transactions && transactions.length > 3 && (
            <TouchableOpacity onPress={handleShowAllToggle}>
              <ThemedText variant="body2" color="primary">
                {showAllTransactions ? 'Show Less' : 'See All'}
              </ThemedText>
            </TouchableOpacity>
          )}
        </View>

        <View style={styles.transactionsList}>
          {!transactions || transactions.length === 0 ? (
            <View style={styles.emptyContainer}>
              <Ionicons name="receipt-outline" size={64} color={theme.colors.textSecondary} />
              <ThemedText variant="h3" weight="600" style={{ marginTop: theme.spacing.md }}>
                No Transactions Yet
              </ThemedText>
              <ThemedText variant="body2" color="textSecondary" style={{ textAlign: 'center', marginTop: theme.spacing.sm }}>
                Start by adding your first income or expense transaction
              </ThemedText>
            </View>
          ) : (
            transactions.map((transaction) => (
              <TransactionCard
                key={transaction.id}
                transaction={transaction}
                onPress={() => console.log('Transaction pressed:', transaction.id)}
              />
            ))
          )}
        </View>

        {/* Add Transaction Button */}
        <Button
          title="Add New Transaction"
          onPress={handleAddTransaction}
          variant="outline"
          style={{ marginBottom: theme.spacing.xl }}
        />
      </ScrollView>

      {/* Add Transaction Modal */}
      <Modal
        visible={showAddTransaction}
        animationType="slide"
        presentationStyle="pageSheet"
      >
        <AddTransactionScreen
          onClose={() => setShowAddTransaction(false)}
          onSuccess={handleTransactionAdded}
        />
      </Modal>
    </View>
  );
};