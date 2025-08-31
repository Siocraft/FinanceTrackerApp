import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Modal,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { ThemedText, TransactionCard, Button } from '../components';
import { useTheme } from '../theme';
import { useTransactionsQuery } from '../hooks/useTransactionsQuery';
import { AddTransactionScreen } from './AddTransactionScreen';

export const TransactionsScreen: React.FC = () => {
  const { theme, isDark } = useTheme();
  const [showAddTransaction, setShowAddTransaction] = useState(false);

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
    content: {
      flex: 1,
      paddingHorizontal: theme.spacing.lg,
    },
    transactionsList: {
      marginBottom: theme.spacing.xl,
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
    addButton: {
      position: 'absolute',
      bottom: theme.spacing.lg,
      right: theme.spacing.lg,
      width: 56,
      height: 56,
      borderRadius: 28,
      backgroundColor: theme.colors.primary,
      alignItems: 'center',
      justifyContent: 'center',
      shadowColor: theme.colors.text,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.3,
      shadowRadius: 8,
      elevation: 8,
    },
  });

  if (loading) {
    return (
      <View style={styles.container}>
        <StatusBar style={isDark ? 'light' : 'dark'} />
        <SafeAreaView style={styles.header}>
          <View style={styles.headerRow}>
            <ThemedText variant='h2' weight='700'>
              Transactions
            </ThemedText>
          </View>
        </SafeAreaView>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size='large' color={theme.colors.primary} />
          <ThemedText variant='body1' style={{ marginTop: theme.spacing.md }}>
            Loading transactions...
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
          <View style={styles.headerRow}>
            <ThemedText variant='h2' weight='700'>
              Transactions
            </ThemedText>
          </View>
        </SafeAreaView>
        <View style={styles.errorContainer}>
          <Ionicons name='warning' size={48} color={theme.colors.error} />
          <ThemedText
            variant='h3'
            weight='600'
            style={{ marginTop: theme.spacing.md }}
          >
            Connection Error
          </ThemedText>
          <ThemedText
            variant='body2'
            color='textSecondary'
            style={{ textAlign: 'center', marginVertical: theme.spacing.sm }}
          >
            {error?.message || 'An error occurred'}
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
        <View style={styles.headerRow}>
          <ThemedText variant='h2' weight='700'>
            Transactions
          </ThemedText>
        </View>
      </SafeAreaView>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.transactionsList}>
          {!transactions || transactions.length === 0 ? (
            <View style={styles.emptyContainer}>
              <Ionicons
                name='receipt-outline'
                size={64}
                color={theme.colors.textSecondary}
              />
              <ThemedText
                variant='h3'
                weight='600'
                style={{ marginTop: theme.spacing.md }}
              >
                No Transactions Yet
              </ThemedText>
              <ThemedText
                variant='body2'
                color='textSecondary'
                style={{ textAlign: 'center', marginTop: theme.spacing.sm }}
              >
                Start by adding your first income or expense transaction
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
      </ScrollView>

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
