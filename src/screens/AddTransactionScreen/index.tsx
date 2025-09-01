import React, { useState, useRef } from 'react';
import {
  View,
  TouchableOpacity,
  Alert,
  TextInput,
  Animated,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';
import { ThemedText, Button, Header } from '../../components';
import { useTheme } from '../../theme';
import { TransactionType, CreateTransactionDto } from '../../types';
import { useCreateTransactionMutation } from '../../hooks/useTransactionsQuery';
import { createStyles } from './styles';

interface AddTransactionScreenProps {
  onClose: () => void;
  onSuccess: () => void;
}

export const AddTransactionScreen: React.FC<AddTransactionScreenProps> = ({
  onClose,
  onSuccess,
}) => {
  const { theme } = useTheme();
  const styles = createStyles(theme);
  const { t } = useTranslation();
  const createTransactionMutation = useCreateTransactionMutation();
  const scrollY = useRef(new Animated.Value(0)).current;

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

  return (
    <View style={styles.container}>
      <StatusBar style='light' />

      <Header
        title={t('addTransaction.title')}
        subtitle={t('addTransaction.subtitle')}
        icon='add-circle'
        scrollY={scrollY}
      />

      {/* Close button positioned over header */}
      <View style={styles.closeButtonContainer}>
        <TouchableOpacity onPress={onClose} style={styles.closeButton}>
          <Ionicons name='close' size={24} color='#FFFFFF' />
        </TouchableOpacity>
      </View>

      <Animated.ScrollView
        style={styles.content}
        showsVerticalScrollIndicator={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false }
        )}
        scrollEventThrottle={16}
      >
        {/* Type Selection */}
        <View style={styles.section}>
          <ThemedText variant='body1' weight='600' style={styles.label}>
            {t('addTransaction.transactionType')} *
          </ThemedText>
          <View style={styles.typeSelector}>
            <TouchableOpacity
              style={[
                styles.typeButton,
                formData.type === 'income' && styles.typeButtonIncome,
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
                formData.type === 'expense' && styles.typeButtonExpense,
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
                    formData.category === categoryLabel &&
                      styles.categoryButtonSelected,
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
      </Animated.ScrollView>
    </View>
  );
};
