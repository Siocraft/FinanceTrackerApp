import React, { useState, useRef } from 'react';
import {
  View,
  TouchableOpacity,
  ActivityIndicator,
  Modal,
  Animated,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';
import { ThemedText, TransactionCard, Button, Header } from '../../components';
import { useTheme } from '../../theme';
import { useTransactionsQuery } from '../../hooks/useTransactionsQuery';
import { AddTransactionScreen } from '../AddTransactionScreen';
import { createStyles } from './styles';

export const TransactionsScreen: React.FC = () => {
  const { t } = useTranslation();
  const { theme } = useTheme();
  const styles = createStyles(theme);
  const [showAddTransaction, setShowAddTransaction] = useState(false);
  const scrollY = useRef(new Animated.Value(0)).current;

  const {
    data: transactions = [],
    isLoading: loading,
    error,
    refetch: refresh,
  } = useTransactionsQuery();

  const handleAddTransaction = () => {
    setShowAddTransaction(true);
  };

  const handleTransactionAdded = () => {
    setShowAddTransaction(false);
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <StatusBar style='light' />
        <Header
          title={t('transactions.title')}
          subtitle={t('transactions.subtitle')}
          icon='receipt'
        />
        <View style={styles.loadingContainer}>
          <ActivityIndicator size='large' color={theme.colors.primary} />
          <ThemedText variant='body1' style={styles.loadingText}>
            {t('transactions.loading')}
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
          title={t('transactions.title')}
          subtitle={t('transactions.subtitle')}
          icon='receipt'
        />
        <View style={styles.errorContainer}>
          <Ionicons name='warning' size={48} color={theme.colors.error} />
          <ThemedText variant='h3' weight='600' style={styles.errorTitle}>
            {t('transactions.error.title')}
          </ThemedText>
          <ThemedText
            variant='body2'
            color='textSecondary'
            style={styles.errorMessage}
          >
            {error?.message || t('transactions.error.message')}
          </ThemedText>
          <Button
            title='Retry'
            onPress={refresh}
            variant='primary'
            style={styles.errorTitle}
          />
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar style='light' />

      <Header
        title={t('transactions.title')}
        subtitle={t('transactions.subtitle')}
        icon='receipt'
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
        <View style={styles.transactionsList}>
          {!transactions || transactions.length === 0 ? (
            <View style={styles.emptyContainer}>
              <Ionicons
                name='receipt-outline'
                size={64}
                color={theme.colors.textSecondary}
              />
              <ThemedText variant='h3' weight='600' style={styles.errorTitle}>
                {t('transactions.empty.title')}
              </ThemedText>
              <ThemedText
                variant='body2'
                color='textSecondary'
                style={styles.emptyMessage}
              >
                {t('transactions.empty.message')}
              </ThemedText>
            </View>
          ) : (
            transactions.map(transaction => (
              <TransactionCard
                key={transaction.id}
                transaction={transaction}
                onPress={() =>
                  console.log('Transaction pressed:', transaction.id)
                }
              />
            ))
          )}
        </View>
      </Animated.ScrollView>

      <TouchableOpacity style={styles.addButton} onPress={handleAddTransaction}>
        <Ionicons name='add' size={24} color='white' />
      </TouchableOpacity>

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
