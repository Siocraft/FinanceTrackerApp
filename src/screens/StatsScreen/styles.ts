import { StyleSheet } from 'react-native';
import type { themes } from '../../theme';

type Theme = typeof themes.light;

export const createStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    headerGradient: {
      paddingHorizontal: theme.spacing.lg,
      paddingTop: theme.spacing.lg,
      paddingBottom: theme.spacing.lg,
      borderBottomLeftRadius: theme.borderRadius.xl,
      borderBottomRightRadius: theme.borderRadius.xl,
    },
    headerContent: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    },
    headerIcon: {
      marginRight: theme.spacing.md,
    },
    headerTitle: {
      textAlign: 'center',
      color: '#FFFFFF',
      textShadowColor: 'rgba(0, 0, 0, 0.3)',
      textShadowOffset: { width: 0, height: 1 },
      textShadowRadius: 2,
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
    loadingText: {
      marginTop: theme.spacing.md,
    },
    errorTitle: {
      marginTop: theme.spacing.md,
    },
    errorMessage: {
      textAlign: 'center',
      marginVertical: theme.spacing.sm,
    },
    retryButton: {
      marginTop: theme.spacing.md,
    },
    emptyTitle: {
      marginTop: theme.spacing.md,
    },
    emptyMessage: {
      textAlign: 'center',
      marginTop: theme.spacing.sm,
    },
    overviewTitle: {
      marginBottom: theme.spacing.md,
    },
    allTimeTitle: {
      marginBottom: theme.spacing.md,
    },
    thisMonthTitle: {
      marginBottom: theme.spacing.md,
    },
    categoriesTitle: {
      marginBottom: theme.spacing.md,
    },
    categoriesCard: {
      marginBottom: theme.spacing.xl,
    },
  });
