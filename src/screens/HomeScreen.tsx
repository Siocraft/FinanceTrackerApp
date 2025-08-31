import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
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

// Sample data
const sampleTransactions: Transaction[] = [
  {
    id: '1',
    title: 'Salary',
    amount: 5000,
    type: 'income',
    category: 'salary',
    date: new Date('2024-01-15'),
    description: 'Monthly salary payment',
  },
  {
    id: '2',
    title: 'Grocery Shopping',
    amount: 120.50,
    type: 'expense',
    category: 'food',
    date: new Date('2024-01-14'),
    description: 'Weekly groceries at Whole Foods',
  },
  {
    id: '3',
    title: 'Freelance Project',
    amount: 800,
    type: 'income',
    category: 'freelance',
    date: new Date('2024-01-13'),
    description: 'Web development project',
  },
  {
    id: '4',
    title: 'Gas Station',
    amount: 45.20,
    type: 'expense',
    category: 'transport',
    date: new Date('2024-01-12'),
  },
  {
    id: '5',
    title: 'Netflix Subscription',
    amount: 15.99,
    type: 'expense',
    category: 'entertainment',
    date: new Date('2024-01-11'),
    description: 'Monthly subscription',
  },
];

export const HomeScreen: React.FC = () => {
  const { theme, themeType, setThemeType, isDark } = useTheme();
  const [showAllTransactions, setShowAllTransactions] = useState(false);

  const totalBalance = 8500.75;
  const monthlyIncome = 5800;
  const monthlyExpenses = 2100.50;

  const displayedTransactions = showAllTransactions 
    ? sampleTransactions 
    : sampleTransactions.slice(0, 3);

  const toggleTheme = () => {
    const nextTheme = themeType === 'light' ? 'dark' : 'light';
    setThemeType(nextTheme);
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
  });

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
          totalBalance={totalBalance}
          monthlyIncome={monthlyIncome}
          monthlyExpenses={monthlyExpenses}
        />

        {/* Quick Actions */}
        <View style={styles.quickActions}>
          <Button
            title="Add Income"
            onPress={() => console.log('Add Income')}
            variant="primary"
            gradient={true}
            style={styles.quickActionButton}
          />
          <Button
            title="Add Expense"
            onPress={() => console.log('Add Expense')}
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
                {sampleTransactions.length}
              </ThemedText>
            </View>
            <View style={styles.statItem}>
              <ThemedText variant="body2" color="textSecondary">
                Avg/Day
              </ThemedText>
              <ThemedText variant="h3" weight="700" color="primary">
                $67.50
              </ThemedText>
            </View>
            <View style={styles.statItem}>
              <ThemedText variant="body2" color="textSecondary">
                Savings
              </ThemedText>
              <ThemedText variant="h3" weight="700" color="income">
                $3,699.50
              </ThemedText>
            </View>
          </View>
        </Card>

        {/* Recent Transactions */}
        <View style={styles.sectionHeader}>
          <ThemedText variant="h3" weight="600">
            Recent Transactions
          </ThemedText>
          <TouchableOpacity onPress={() => setShowAllTransactions(!showAllTransactions)}>
            <ThemedText variant="body2" color="primary">
              {showAllTransactions ? 'Show Less' : 'See All'}
            </ThemedText>
          </TouchableOpacity>
        </View>

        <View style={styles.transactionsList}>
          {displayedTransactions.map((transaction) => (
            <TransactionCard
              key={transaction.id}
              transaction={transaction}
              onPress={() => console.log('Transaction pressed:', transaction.id)}
            />
          ))}
        </View>

        {/* Add Transaction Button */}
        <Button
          title="Add New Transaction"
          onPress={() => console.log('Add Transaction')}
          variant="outline"
          style={{ marginBottom: theme.spacing.xl }}
        />
      </ScrollView>
    </View>
  );
};