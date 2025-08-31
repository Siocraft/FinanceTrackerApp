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
import { useTranslation } from 'react-i18next';
import { ThemedText, Card } from '../components';
import { useTheme } from '../theme';
import { useLanguageSelector } from '../i18n/LanguageSelector';

export const SettingsScreen: React.FC = () => {
  const { t } = useTranslation();
  const { theme, themeType, setThemeType, isDark } = useTheme();
  const { currentLanguage, showLanguageSelector } = useLanguageSelector();

  const toggleTheme = () => {
    const nextTheme = themeType === 'light' ? 'dark' : 'light';
    setThemeType(nextTheme);
  };

  const showAbout = () => {
    Alert.alert(
      t('settings.alerts.about.title'),
      t('settings.alerts.about.message'),
      [{ text: t('common.ok') }]
    );
  };

  const showDataInfo = () => {
    Alert.alert(
      t('settings.alerts.dataManagement.title'),
      t('settings.alerts.dataManagement.message'),
      [{ text: t('common.ok') }]
    );
  };

  const showSupport = () => {
    Alert.alert(
      t('settings.alerts.support.title'),
      t('settings.alerts.support.message'),
      [{ text: t('common.ok') }]
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
          {t('settings.title')}
        </ThemedText>
      </SafeAreaView>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Appearance Section */}
        <View style={styles.section}>
          <Card padding='none'>
            <SettingItem
              icon='color-palette'
              title={t('settings.items.theme.title')}
              subtitle={t('settings.items.theme.subtitle')}
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
                    {t('settings.items.theme.light')}
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
                    {t('settings.items.theme.dark')}
                  </ThemedText>
                </TouchableOpacity>
              </View>
            </SettingItem>
          </Card>
        </View>

        {/* Language Section */}
        <View style={styles.section}>
          <Card padding='none'>
            <SettingItem
              icon='language'
              title={t('settings.items.language.title')}
              subtitle={`${t('settings.items.language.subtitle')} - ${currentLanguage.nativeName}`}
              onPress={showLanguageSelector}
              isLast
            />
          </Card>
        </View>

        {/* Data Section */}
        <View style={styles.section}>
          <Card padding='none'>
            <SettingItem
              icon='server'
              title={t('settings.items.dataManagement.title')}
              subtitle={t('settings.items.dataManagement.subtitle')}
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
              title={t('settings.items.helpSupport.title')}
              subtitle={t('settings.items.helpSupport.subtitle')}
              onPress={showSupport}
            />
            <SettingItem
              icon='information-circle'
              title={t('settings.items.about.title')}
              subtitle={t('settings.items.about.subtitle')}
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
            {t('settings.footer.version')}
          </ThemedText>
          <ThemedText
            variant='caption'
            color='textSecondary'
            style={{ textAlign: 'center', marginTop: theme.spacing.xs }}
          >
            {t('settings.footer.built')}
          </ThemedText>
        </View>
      </ScrollView>
    </View>
  );
};
