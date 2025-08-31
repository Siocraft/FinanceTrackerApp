import React, { useMemo } from 'react';
import { View, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';
import { ThemedText, Card, Button } from '../components';
import { useTheme } from '../theme';
import { useTransactionsQuery } from '../hooks/useTransactionsQuery';

export const StatsScreen: React.FC = () => {
  const { t } = useTranslation();
  const { theme, isDark } = useTheme();

  const {
    data: transactions = [],
    isLoading: loading,
    error,
    refetch: refresh,
  } = useTransactionsQuery();

  const stats = useMemo(() => {
    if (!transactions || transactions.length === 0) {
      return {
        totalBalance: 0,
        totalIncome: 0,
        totalExpenses: 0,
        transactionCount: 0,
        averageTransaction: 0,
        monthlyStats: {
          income: 0,
          expenses: 0,
          transactions: 0,
        },
        categoryBreakdown: {},
      };
    }

    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();

    const currentMonthTransactions = transactions.filter(transaction => {
      const transactionDate = new Date(transaction.date);
      return (
        transactionDate.getMonth() === currentMonth &&
        transactionDate.getFullYear() === currentYear
      );
    });

    const totalIncome = transactions
      .filter(total => total.type === 'income')
      .reduce((sum, total) => sum + total.amount, 0);

    const totalExpenses = transactions
      .filter(total => total.type === 'expense')
      .reduce((sum, total) => sum + total.amount, 0);

    const monthlyIncome = currentMonthTransactions
      .filter(monthly => monthly.type === 'income')
      .reduce((sum, monthly) => sum + monthly.amount, 0);

    const monthlyExpenses = currentMonthTransactions
      .filter(monthly => monthly.type === 'expense')
      .reduce((sum, monthly) => sum + monthly.amount, 0);

    const categoryBreakdown = transactions.reduce(
      (acc, category) => {
        if (!acc[category.category]) {
          acc[category.category] = { income: 0, expense: 0 };
        }
        acc[category.category][category.type] += category.amount;
        return acc;
      },
      {} as Record<string, { income: number; expense: number }>
    );

    return {
      totalBalance: totalIncome - totalExpenses,
      totalIncome,
      totalExpenses,
      transactionCount: transactions.length,
      averageTransaction:
        transactions.length > 0
          ? (totalIncome + totalExpenses) / transactions.length
          : 0,
      monthlyStats: {
        income: monthlyIncome,
        expenses: monthlyExpenses,
        transactions: currentMonthTransactions.length,
      },
      categoryBreakdown,
    };
  }, [transactions]);

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
    content: {
      flex: 1,
      paddingHorizontal: theme.spacing.lg,
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
      flex: 1,
    },
    categoryItem: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingVertical: theme.spacing.sm,
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.border,
    },
    categoryAmounts: {
      alignItems: 'flex-end',
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

  if (loading) {
    return (
      <View style={styles.container}>
        <StatusBar style={isDark ? 'light' : 'dark'} />
        <SafeAreaView style={styles.header}>
          <ThemedText variant='h2' weight='700'>
            {t('stats.title')}
          </ThemedText>
        </SafeAreaView>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size='large' color={theme.colors.primary} />
          <ThemedText variant='body1' style={{ marginTop: theme.spacing.md }}>
            {t('stats.loading')}
          </ThemedText>
        </View>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <StatusBar style={isDark ? 'light' : 'dark'} />
        <SafeAreaView style={styles.header}>
          <ThemedText variant='h2' weight='700'>
            {t('stats.title')}
          </ThemedText>
        </SafeAreaView>
        <View style={styles.errorContainer}>
          <Ionicons name='warning' size={48} color={theme.colors.error} />
          <ThemedText
            variant='h3'
            weight='600'
            style={{ marginTop: theme.spacing.md }}
          >
            {t('stats.error.title')}
          </ThemedText>
          <ThemedText
            variant='body2'
            color='textSecondary'
            style={{ textAlign: 'center', marginVertical: theme.spacing.sm }}
          >
            {error?.message || t('stats.error.message')}
          </ThemedText>
          <Button
            title='Retry'
            onPress={refresh}
            variant='primary'
            style={{ marginTop: theme.spacing.md }}
          />
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar style={isDark ? 'light' : 'dark'} />

      <SafeAreaView style={styles.header}>
        <ThemedText variant='h2' weight='700'>
          Statistics
        </ThemedText>
      </SafeAreaView>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {transactions.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Ionicons
              name='analytics-outline'
              size={64}
              color={theme.colors.textSecondary}
            />
            <ThemedText
              variant='h3'
              weight='600'
              style={{ marginTop: theme.spacing.md }}
            >
              {t('stats.empty.title')}
            </ThemedText>
            <ThemedText
              variant='body2'
              color='textSecondary'
              style={{ textAlign: 'center', marginTop: theme.spacing.sm }}
            >
              {t('stats.empty.message')}
            </ThemedText>
          </View>
        ) : (
          <>
            {/* Overview Card */}
            <Card style={styles.statsCard} padding='large'>
              <ThemedText
                variant='h3'
                weight='600'
                style={{ marginBottom: theme.spacing.md }}
              >
                {t('stats.sections.overview')}
              </ThemedText>
              <View style={styles.statsRow}>
                <View style={styles.statItem}>
                  <ThemedText variant='body2' color='textSecondary'>
                    {t('stats.labels.totalBalance')}
                  </ThemedText>
                  <ThemedText
                    variant='h3'
                    weight='700'
                    color={stats.totalBalance >= 0 ? 'income' : 'expense'}
                  >
                    ${Math.abs(stats.totalBalance).toFixed(2)}
                  </ThemedText>
                </View>
                <View style={styles.statItem}>
                  <ThemedText variant='body2' color='textSecondary'>
                    {t('stats.labels.transactions')}
                  </ThemedText>
                  <ThemedText variant='h3' weight='700' color='primary'>
                    {stats.transactionCount}
                  </ThemedText>
                </View>
              </View>
            </Card>

            {/* All Time Stats */}
            <Card style={styles.statsCard} padding='large'>
              <ThemedText
                variant='h3'
                weight='600'
                style={{ marginBottom: theme.spacing.md }}
              >
                {t('stats.sections.allTime')}
              </ThemedText>
              <View style={styles.statsRow}>
                <View style={styles.statItem}>
                  <ThemedText variant='body2' color='textSecondary'>
                    {t('stats.labels.totalIncome')}
                  </ThemedText>
                  <ThemedText variant='h3' weight='700' color='income'>
                    ${stats.totalIncome.toFixed(2)}
                  </ThemedText>
                </View>
                <View style={styles.statItem}>
                  <ThemedText variant='body2' color='textSecondary'>
                    {t('stats.labels.totalExpenses')}
                  </ThemedText>
                  <ThemedText variant='h3' weight='700' color='expense'>
                    ${stats.totalExpenses.toFixed(2)}
                  </ThemedText>
                </View>
                <View style={styles.statItem}>
                  <ThemedText variant='body2' color='textSecondary'>
                    {t('stats.labels.avgTransaction')}
                  </ThemedText>
                  <ThemedText variant='h3' weight='700' color='primary'>
                    ${stats.averageTransaction.toFixed(2)}
                  </ThemedText>
                </View>
              </View>
            </Card>

            {/* This Month Stats */}
            <Card style={styles.statsCard} padding='large'>
              <ThemedText
                variant='h3'
                weight='600'
                style={{ marginBottom: theme.spacing.md }}
              >
                {t('stats.sections.thisMonth')}
              </ThemedText>
              <View style={styles.statsRow}>
                <View style={styles.statItem}>
                  <ThemedText variant='body2' color='textSecondary'>
                    {t('stats.labels.income')}
                  </ThemedText>
                  <ThemedText variant='h3' weight='700' color='income'>
                    ${stats.monthlyStats.income.toFixed(2)}
                  </ThemedText>
                </View>
                <View style={styles.statItem}>
                  <ThemedText variant='body2' color='textSecondary'>
                    {t('stats.labels.expenses')}
                  </ThemedText>
                  <ThemedText variant='h3' weight='700' color='expense'>
                    ${stats.monthlyStats.expenses.toFixed(2)}
                  </ThemedText>
                </View>
                <View style={styles.statItem}>
                  <ThemedText variant='body2' color='textSecondary'>
                    {t('stats.labels.transactions')}
                  </ThemedText>
                  <ThemedText variant='h3' weight='700' color='primary'>
                    {stats.monthlyStats.transactions}
                  </ThemedText>
                </View>
              </View>
            </Card>

            {/* Category Breakdown */}
            <Card
              style={{ ...styles.statsCard, marginBottom: theme.spacing.xl }}
              padding='large'
            >
              <ThemedText
                variant='h3'
                weight='600'
                style={{ marginBottom: theme.spacing.md }}
              >
                {t('stats.sections.categories')}
              </ThemedText>
              {Object.entries(stats.categoryBreakdown).map(
                ([category, amounts]) => (
                  <View key={category} style={styles.categoryItem}>
                    <ThemedText variant='body1' weight='600'>
                      {category}
                    </ThemedText>
                    <View style={styles.categoryAmounts}>
                      {amounts.income > 0 && (
                        <ThemedText variant='body2' color='income'>
                          +${amounts.income.toFixed(2)}
                        </ThemedText>
                      )}
                      {amounts.expense > 0 && (
                        <ThemedText variant='body2' color='expense'>
                          -${amounts.expense.toFixed(2)}
                        </ThemedText>
                      )}
                    </View>
                  </View>
                )
              )}
            </Card>
          </>
        )}
      </ScrollView>
    </View>
  );
};
