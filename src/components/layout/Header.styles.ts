import { StyleSheet } from 'react-native';
import { AppTheme } from '../../types/theme';

export const createHeaderStyles = (theme: AppTheme) =>
  StyleSheet.create({
    headerContainer: {
      overflow: 'hidden',
    },
    header: {
      paddingHorizontal: theme.spacing.lg,
      paddingTop: theme.spacing.md,
      paddingBottom: 0,
      borderBottomLeftRadius: theme.borderRadius.xl,
      borderBottomRightRadius: theme.borderRadius.xl,
      shadowColor: theme.colors.text,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.15,
      shadowRadius: 12,
      elevation: 8,
    },
    headerRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
    },
    headerContent: {
      flex: 1,
      marginRight: theme.spacing.md,
    },
    titleRow: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: theme.spacing.xs,
    },
    titleIcon: {
      marginRight: theme.spacing.sm,
      backgroundColor: 'rgba(255, 255, 255, 0.15)',
      borderRadius: theme.borderRadius.md,
      padding: theme.spacing.xs,
    },
    titleText: {
      color: '#FFFFFF',
      textShadowColor: 'rgba(0, 0, 0, 0.3)',
      textShadowOffset: { width: 0, height: 1 },
      textShadowRadius: 2,
    },
    subtitleText: {
      color: 'rgba(255, 255, 255, 0.85)',
      textShadowColor: 'rgba(0, 0, 0, 0.2)',
      textShadowOffset: { width: 0, height: 1 },
      textShadowRadius: 1,
    },
    decorativeElements: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      opacity: 0.1,
    },
    decorativeCircle1: {
      position: 'absolute',
      top: -20,
      right: -20,
      width: 80,
      height: 80,
      borderRadius: 40,
      backgroundColor: 'rgba(255, 255, 255, 0.1)',
    },
    decorativeCircle2: {
      position: 'absolute',
      bottom: -15,
      left: -25,
      width: 60,
      height: 60,
      borderRadius: 30,
      backgroundColor: 'rgba(255, 255, 255, 0.08)',
    },
  });
