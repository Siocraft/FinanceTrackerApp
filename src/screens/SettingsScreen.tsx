import React from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { ThemedText, Card } from '../components';
import { useTheme } from '../theme';

export const SettingsScreen: React.FC = () => {
  const { theme, themeType, setThemeType, isDark } = useTheme();

  const toggleTheme = () => {
    const nextTheme = themeType === 'light' ? 'dark' : 'light';
    setThemeType(nextTheme);
  };

  const showAbout = () => {
    Alert.alert(
      'About Finance Tracker',
      'A simple and elegant finance tracking app built with React Native and TypeScript.\n\nVersion 1.0.0',
      [{ text: 'OK' }]
    );
  };

  const showDataInfo = () => {
    Alert.alert(
      'Data Management',
      'Your transaction data is stored locally and synced with our secure API. All data is encrypted and private.',
      [{ text: 'OK' }]
    );
  };

  const showSupport = () => {
    Alert.alert(
      'Support',
      'For support or feedback, please contact us at support@financetracker.com',
      [{ text: 'OK' }]
    );
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
    content: {
      flex: 1,
      paddingHorizontal: theme.spacing.lg,
    },
    section: {
      marginBottom: theme.spacing.lg,
    },
    settingItem: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: theme.spacing.md,
      paddingHorizontal: theme.spacing.lg,
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.border,
    },
    settingIcon: {
      marginRight: theme.spacing.md,
    },
    settingContent: {
      flex: 1,
    },
    settingTitle: {
      marginBottom: theme.spacing.xs,
    },

    themeToggle: {
      flexDirection: 'row',
      alignItems: 'center',
      marginLeft: 'auto',
    },
    themeOption: {
      paddingHorizontal: theme.spacing.sm,
      paddingVertical: theme.spacing.xs,
      borderRadius: theme.borderRadius.sm,
      marginLeft: theme.spacing.xs,
    },
    themeOptionActive: {
      backgroundColor: theme.colors.primary,
    },
    lastItem: {
      borderBottomWidth: 0,
    },
  });

  const SettingItem: React.FC<{
    icon: string;
    title: string;
    subtitle?: string;
    onPress: () => void;
    showArrow?: boolean;
    children?: React.ReactNode;
    isLast?: boolean;
  }> = ({
    icon,
    title,
    subtitle,
    onPress,
    showArrow = true,
    children,
    isLast = false,
  }) => (
    <TouchableOpacity
      style={[styles.settingItem, isLast && styles.lastItem]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <Ionicons
        name={icon as any}
        size={24}
        color={theme.colors.primary}
        style={styles.settingIcon}
      />
      <View style={styles.settingContent}>
        <ThemedText variant='body1' weight='600' style={styles.settingTitle}>
          {title}
        </ThemedText>
        {subtitle && (
          <ThemedText variant='body2' color='textSecondary'>
            {subtitle}
          </ThemedText>
        )}
      </View>
      {children}
      {showArrow && (
        <Ionicons
          name='chevron-forward'
          size={20}
          color={theme.colors.textSecondary}
        />
      )}
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <StatusBar style={isDark ? 'light' : 'dark'} />

      <SafeAreaView style={styles.header}>
        <ThemedText variant='h2' weight='700'>
          Settings
        </ThemedText>
      </SafeAreaView>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Appearance Section */}
        <View style={styles.section}>
          <Card padding='none'>
            <SettingItem
              icon='color-palette'
              title='Theme'
              subtitle='Choose your preferred theme'
              onPress={toggleTheme}
              showArrow={false}
              isLast
            >
              <View style={styles.themeToggle}>
                <TouchableOpacity
                  style={[
                    styles.themeOption,
                    themeType === 'light' && styles.themeOptionActive,
                  ]}
                  onPress={() => setThemeType('light')}
                >
                  <ThemedText
                    variant='body2'
                    weight='600'
                    color={themeType === 'light' ? 'onPrimary' : 'text'}
                  >
                    Light
                  </ThemedText>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.themeOption,
                    themeType === 'dark' && styles.themeOptionActive,
                  ]}
                  onPress={() => setThemeType('dark')}
                >
                  <ThemedText
                    variant='body2'
                    weight='600'
                    color={themeType === 'dark' ? 'onPrimary' : 'text'}
                  >
                    Dark
                  </ThemedText>
                </TouchableOpacity>
              </View>
            </SettingItem>
          </Card>
        </View>

        {/* Data Section */}
        <View style={styles.section}>
          <Card padding='none'>
            <SettingItem
              icon='server'
              title='Data Management'
              subtitle='Learn about how your data is handled'
              onPress={showDataInfo}
              isLast
            />
          </Card>
        </View>

        {/* Support Section */}
        <View style={styles.section}>
          <Card padding='none'>
            <SettingItem
              icon='help-circle'
              title='Help & Support'
              subtitle='Get help or send feedback'
              onPress={showSupport}
            />
            <SettingItem
              icon='information-circle'
              title='About'
              subtitle='App version and information'
              onPress={showAbout}
              isLast
            />
          </Card>
        </View>

        {/* Version Info */}
        <View style={[styles.section, { marginBottom: theme.spacing.xl }]}>
          <ThemedText
            variant='body2'
            color='textSecondary'
            style={{ textAlign: 'center' }}
          >
            Finance Tracker v1.0.0
          </ThemedText>
          <ThemedText
            variant='caption'
            color='textSecondary'
            style={{ textAlign: 'center', marginTop: theme.spacing.xs }}
          >
            Built with React Native & TypeScript
          </ThemedText>
        </View>
      </ScrollView>
    </View>
  );
};
