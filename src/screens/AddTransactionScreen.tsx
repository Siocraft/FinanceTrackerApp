import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Alert,
  TextInput,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import {
  ThemedText,
  Button,
  Card,
} from '../components';
import { useTheme } from '../theme';
import { TransactionType, CreateTransactionDto } from '../types';
import { useCreateTransactionMutation } from '../hooks/useTransactionsQuery';

interface AddTransactionScreenProps {
  onClose: () => void;
  onSuccess: () => void;
}

export const AddTransactionScreen: React.FC<AddTransactionScreenProps> = ({
  onClose,
  onSuccess,
}) => {
  const { theme, isDark } = useTheme();
  const createTransactionMutation = useCreateTransactionMutation();
  
  const [formData, setFormData] = useState({
    amount: '',
    description: '',
    category: '',
    type: 'expense' as TransactionType,
  });
  const [loading, setLoading] = useState(false);

  const commonCategories = {
    income: ['Salary', 'Freelance', 'Investment', 'Gift', 'Other'],
    expense: ['Food', 'Transport', 'Shopping', 'Entertainment', 'Bills', 'Health', 'Other'],
  };

  const handleSubmit = async () => {
    if (!formData.amount || !formData.description || !formData.category) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }

    const amount = parseFloat(formData.amount);
    if (isNaN(amount) || amount <= 0) {
      Alert.alert('Error', 'Please enter a valid amount');
      return;
    }

    try {
      setLoading(true);
      const transactionData: CreateTransactionDto = {
        amount,
        description: formData.description,
        category: formData.category,
        type: formData.type,
      };

      await createTransactionMutation.mutateAsync(transactionData);
      Alert.alert('Success', 'Transaction added successfully');
      onSuccess();
    } catch (error) {
      Alert.alert('Error', 'Failed to add transaction');
    } finally {
      setLoading(false);
    }
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: theme.spacing.lg,
      paddingVertical: theme.spacing.md,
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.border,
    },
    content: {
      flex: 1,
      padding: theme.spacing.lg,
    },
    section: {
      marginBottom: theme.spacing.lg,
    },
    label: {
      marginBottom: theme.spacing.sm,
    },
    input: {
      borderWidth: 1,
      borderColor: theme.colors.border,
      borderRadius: theme.borderRadius.md,
      padding: theme.spacing.md,
      fontSize: 16,
      color: theme.colors.text,
      backgroundColor: theme.colors.surface,
    },
    typeSelector: {
      flexDirection: 'row',
      marginBottom: theme.spacing.md,
    },
    typeButton: {
      flex: 1,
      padding: theme.spacing.md,
      borderRadius: theme.borderRadius.md,
      borderWidth: 1,
      marginHorizontal: theme.spacing.xs,
      alignItems: 'center',
    },
    categoryGrid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      marginHorizontal: -theme.spacing.xs,
    },
    categoryButton: {
      width: '30%',
      margin: theme.spacing.xs,
      padding: theme.spacing.sm,
      borderRadius: theme.borderRadius.md,
      borderWidth: 1,
      alignItems: 'center',
    },
  });

  return (
    <View style={styles.container}>
      <StatusBar style={isDark ? 'light' : 'dark'} />
      
      <SafeAreaView>
        <View style={styles.header}>
          <TouchableOpacity onPress={onClose}>
            <Ionicons name="close" size={24} color={theme.colors.text} />
          </TouchableOpacity>
          <ThemedText variant="h3" weight="600">
            Add Transaction
          </ThemedText>
          <View style={{ width: 24 }} />
        </View>
      </SafeAreaView>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Type Selection */}
        <View style={styles.section}>
          <ThemedText variant="body1" weight="600" style={styles.label}>
            Transaction Type *
          </ThemedText>
          <View style={styles.typeSelector}>
            <TouchableOpacity
              style={[
                styles.typeButton,
                {
                  borderColor: formData.type === 'income' ? theme.colors.income : theme.colors.border,
                  backgroundColor: formData.type === 'income' ? `${theme.colors.income}20` : 'transparent',
                },
              ]}
              onPress={() => setFormData({ ...formData, type: 'income', category: '' })}
            >
              <ThemedText
                variant="body2"
                weight="600"
                color={formData.type === 'income' ? 'income' : 'text'}
              >
                Income
              </ThemedText>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.typeButton,
                {
                  borderColor: formData.type === 'expense' ? theme.colors.expense : theme.colors.border,
                  backgroundColor: formData.type === 'expense' ? `${theme.colors.expense}20` : 'transparent',
                },
              ]}
              onPress={() => setFormData({ ...formData, type: 'expense', category: '' })}
            >
              <ThemedText
                variant="body2"
                weight="600"
                color={formData.type === 'expense' ? 'expense' : 'text'}
              >
                Expense
              </ThemedText>
            </TouchableOpacity>
          </View>
        </View>

        {/* Amount */}
        <View style={styles.section}>
          <ThemedText variant="body1" weight="600" style={styles.label}>
            Amount *
          </ThemedText>
          <TextInput
            style={styles.input}
            placeholder="0.00"
            placeholderTextColor={theme.colors.textSecondary}
            value={formData.amount}
            onChangeText={(text) => setFormData({ ...formData, amount: text })}
            keyboardType="numeric"
          />
        </View>

        {/* Description */}
        <View style={styles.section}>
          <ThemedText variant="body1" weight="600" style={styles.label}>
            Description *
          </ThemedText>
          <TextInput
            style={styles.input}
            placeholder="Enter description..."
            placeholderTextColor={theme.colors.textSecondary}
            value={formData.description}
            onChangeText={(text) => setFormData({ ...formData, description: text })}
          />
        </View>

        {/* Category */}
        <View style={styles.section}>
          <ThemedText variant="body1" weight="600" style={styles.label}>
            Category *
          </ThemedText>
          <View style={styles.categoryGrid}>
            {commonCategories[formData.type].map((category) => (
              <TouchableOpacity
                key={category}
                style={[
                  styles.categoryButton,
                  {
                    borderColor: formData.category === category 
                      ? theme.colors.primary 
                      : theme.colors.border,
                    backgroundColor: formData.category === category 
                      ? `${theme.colors.primary}20` 
                      : 'transparent',
                  },
                ]}
                onPress={() => setFormData({ ...formData, category })}
              >
                <ThemedText
                  variant="body2"
                  color={formData.category === category ? 'primary' : 'text'}
                >
                  {category}
                </ThemedText>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Submit Button */}
        <Button
          title={loading ? 'Adding...' : 'Add Transaction'}
          onPress={handleSubmit}
          disabled={loading}
          variant="primary"
          gradient={true}
          style={{ marginTop: theme.spacing.lg, marginBottom: theme.spacing.xl }}
        />
      </ScrollView>
    </View>
  );
};