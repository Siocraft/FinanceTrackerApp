import { StyleSheet } from 'react-native';
import type { themes } from '../../theme';

type Theme = typeof themes.light;

export const createStyles = (theme: Theme) =>
  StyleSheet.create({
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
      borderColor: theme.colors.border,
      backgroundColor: 'transparent',
    },
    typeButtonIncome: {
      borderColor: theme.colors.income,
      backgroundColor: `${theme.colors.income}20`,
    },
    typeButtonExpense: {
      borderColor: theme.colors.expense,
      backgroundColor: `${theme.colors.expense}20`,
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
      borderColor: theme.colors.border,
      backgroundColor: 'transparent',
    },
    categoryButtonSelected: {
      borderColor: theme.colors.primary,
      backgroundColor: `${theme.colors.primary}20`,
    },
    headerSpacer: {
      width: 24,
    },
    closeButtonContainer: {
      position: 'absolute',
      top: 60,
      right: 16,
      zIndex: 1000,
    },
    closeButton: {
      width: 44,
      height: 44,
      borderRadius: 22,
      backgroundColor: 'rgba(0, 0, 0, 0.3)',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });
