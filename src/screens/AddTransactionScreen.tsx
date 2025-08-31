import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  TextInput,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';
import { ThemedText, Button } from '../components';
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
  const { t } = useTranslation();
  const createTransactionMutation = useCreateTransactionMutation();

  const [formData, setFormData] = useState({
    amount: '',
    description: '',
    category: '',
    type: 'expense' as TransactionType,
  });
  const [loading, setLoading] = useState(false);

  const getCategoryKeys = (type: TransactionType) => {
    if (type === 'income') {
      return [
        'addTransaction.categories.income.salary',
        'addTransaction.categories.income.freelance',
        'addTransaction.categories.income.investment',
        'addTransaction.categories.income.gift',
        'addTransaction.categories.income.other',
      ];
    }
    return [
      'addTransaction.categories.expense.food',
      'addTransaction.categories.expense.transport',
      'addTransaction.categories.expense.shopping',
      'addTransaction.categories.expense.entertainment',
      'addTransaction.categories.expense.bills',
      'addTransaction.categories.expense.health',
      'addTransaction.categories.expense.other',
    ];
  };

  const handleSubmit = async () => {
    if (!formData.amount || !formData.description || !formData.category) {
      Alert.alert(
        t('common.error'),
        t('addTransaction.messages.fillRequired'),
        [{ text: t('common.ok') }]
      );
      return;
    }

    const amount = parseFloat(formData.amount);
    if (isNaN(amount) || amount <= 0) {
      Alert.alert(t('common.error'), t('addTransaction.messages.validAmount'), [
        { text: t('common.ok') },
      ]);
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
      Alert.alert(t('common.success'), t('addTransaction.messages.success'), [
        { text: t('common.ok') },
      ]);
      onSuccess();
    } catch (error) {
      Alert.alert(t('common.error'), t('addTransaction.messages.failed'), [
        { text: t('common.ok') },
      ]);
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
            <Ionicons name='close' size={24} color={theme.colors.text} />
          </TouchableOpacity>
          <ThemedText variant='h3' weight='600'>
            {t('addTransaction.title')}
          </ThemedText>
          <View style={{ width: 24 }} />
        </View>
      </SafeAreaView>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Type Selection */}
        <View style={styles.section}>
          <ThemedText variant='body1' weight='600' style={styles.label}>
            {t('addTransaction.transactionType')} *
          </ThemedText>
          <View style={styles.typeSelector}>
            <TouchableOpacity
              style={[
                styles.typeButton,
                {
                  borderColor:
                    formData.type === 'income'
                      ? theme.colors.income
                      : theme.colors.border,
                  backgroundColor:
                    formData.type === 'income'
                      ? `${theme.colors.income}20`
                      : 'transparent',
                },
              ]}
              onPress={() =>
                setFormData({ ...formData, type: 'income', category: '' })
              }
            >
              <ThemedText
                variant='body2'
                weight='600'
                color={formData.type === 'income' ? 'income' : 'text'}
              >
                {t('addTransaction.income')}
              </ThemedText>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.typeButton,
                {
                  borderColor:
                    formData.type === 'expense'
                      ? theme.colors.expense
                      : theme.colors.border,
                  backgroundColor:
                    formData.type === 'expense'
                      ? `${theme.colors.expense}20`
                      : 'transparent',
                },
              ]}
              onPress={() =>
                setFormData({ ...formData, type: 'expense', category: '' })
              }
            >
              <ThemedText
                variant='body2'
                weight='600'
                color={formData.type === 'expense' ? 'expense' : 'text'}
              >
                {t('addTransaction.expense')}
              </ThemedText>
            </TouchableOpacity>
          </View>
        </View>

        {/* Amount */}
        <View style={styles.section}>
          <ThemedText variant='body1' weight='600' style={styles.label}>
            {t('addTransaction.amount')} *
          </ThemedText>
          <TextInput
            style={styles.input}
            placeholder={t('addTransaction.placeholders.amount')}
            placeholderTextColor={theme.colors.textSecondary}
            value={formData.amount}
            onChangeText={text => setFormData({ ...formData, amount: text })}
            keyboardType='numeric'
          />
        </View>

        {/* Description */}
        <View style={styles.section}>
          <ThemedText variant='body1' weight='600' style={styles.label}>
            {t('addTransaction.description')} *
          </ThemedText>
          <TextInput
            style={styles.input}
            placeholder={t('addTransaction.placeholders.description')}
            placeholderTextColor={theme.colors.textSecondary}
            value={formData.description}
            onChangeText={text =>
              setFormData({ ...formData, description: text })
            }
          />
        </View>

        {/* Category */}
        <View style={styles.section}>
          <ThemedText variant='body1' weight='600' style={styles.label}>
            {t('addTransaction.category')} *
          </ThemedText>
          <View style={styles.categoryGrid}>
            {getCategoryKeys(formData.type).map(categoryKey => {
              const categoryLabel = t(categoryKey);
              return (
                <TouchableOpacity
                  key={categoryKey}
                  style={[
                    styles.categoryButton,
                    {
                      borderColor:
                        formData.category === categoryLabel
                          ? theme.colors.primary
                          : theme.colors.border,
                      backgroundColor:
                        formData.category === categoryLabel
                          ? `${theme.colors.primary}20`
                          : 'transparent',
                    },
                  ]}
                  onPress={() =>
                    setFormData({ ...formData, category: categoryLabel })
                  }
                >
                  <ThemedText
                    variant='body2'
                    color={
                      formData.category === categoryLabel ? 'primary' : 'text'
                    }
                  >
                    {categoryLabel}
                  </ThemedText>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* Submit Button */}
        <Button
          title={
            loading
              ? t('addTransaction.buttons.adding')
              : t('addTransaction.buttons.addTransaction')
          }
          onPress={handleSubmit}
          disabled={loading}
          variant='primary'
          gradient={true}
          style={{
            marginTop: theme.spacing.lg,
            marginBottom: theme.spacing.xl,
          }}
        />
      </ScrollView>
    </View>
  );
};
