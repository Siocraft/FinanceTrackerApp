import React, { useMemo, useRef } from 'react';
import { View, ActivityIndicator, Animated } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';
import { ThemedText, Card, Button, Header } from '../../components';
import { useTheme } from '../../theme';
import { useTransactionsQuery } from '../../hooks/useTransactionsQuery';
import { createStyles } from './styles';

export const StatsScreen: React.FC = () => {
  const { t } = useTranslation();
  const { theme } = useTheme();
  const styles = createStyles(theme);
  const scrollY = useRef(new Animated.Value(0)).current;

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

  if (loading) {
    return (
      <View style={styles.container}>
        <StatusBar style='light' />
        <Header
          title={t('stats.title')}
          subtitle={t('stats.subtitle')}
          icon='analytics'
        />
        <View style={styles.loadingContainer}>
          <ActivityIndicator size='large' color={theme.colors.primary} />
          <ThemedText variant='body1' style={styles.loadingText}>
            {t('stats.loading')}
          </ThemedText>
        </View>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <StatusBar style='light' />
        <Header
          title={t('stats.title')}
          subtitle={t('stats.subtitle')}
          icon='analytics'
        />
        <View style={styles.errorContainer}>
          <Ionicons name='warning' size={48} color={theme.colors.error} />
          <ThemedText variant='h3' weight='600' style={styles.errorTitle}>
            {t('stats.error.title')}
          </ThemedText>
          <ThemedText
            variant='body2'
            color='textSecondary'
            style={styles.errorMessage}
          >
            {error?.message || t('stats.error.message')}
          </ThemedText>
          <Button
            title='Retry'
            onPress={refresh}
            variant='primary'
            style={styles.retryButton}
          />
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar style='light' />

      <Header
        title={t('stats.title')}
        subtitle={t('stats.subtitle')}
        icon='analytics'
        scrollY={scrollY}
      />

      <Animated.ScrollView
        style={styles.content}
        showsVerticalScrollIndicator={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false }
        )}
        scrollEventThrottle={16}
      >
        {transactions.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Ionicons
              name='analytics-outline'
              size={64}
              color={theme.colors.textSecondary}
            />
            <ThemedText variant='h3' weight='600' style={styles.emptyTitle}>
              {t('stats.empty.title')}
            </ThemedText>
            <ThemedText
              variant='body2'
              color='textSecondary'
              style={styles.emptyMessage}
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
                style={styles.overviewTitle}
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
              <ThemedText variant='h3' weight='600' style={styles.allTimeTitle}>
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
                style={styles.thisMonthTitle}
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
            <Card style={styles.categoriesCard} padding='large'>
              <ThemedText
                variant='h3'
                weight='600'
                style={styles.categoriesTitle}
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
      </Animated.ScrollView>
    </View>
  );
};
