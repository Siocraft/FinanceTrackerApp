import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';
import { ThemedText } from '../common/ThemedText';
import { useTheme } from '../../theme';
import { createHeaderStyles } from './Header.styles';

interface HeaderProps {
  title?: string;
  subtitle?: string;
  onThemeToggle?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  title,
  subtitle,
  onThemeToggle,
}) => {
  const { t } = useTranslation();
  const { theme, isDark } = useTheme();
  const styles = createHeaderStyles(theme);

  const displayTitle = title || t('header.title');
  const displaySubtitle = subtitle || t('header.subtitle');

  return (
    <LinearGradient colors={theme.gradients.background} style={styles.header}>
      <SafeAreaView>
        <View style={styles.headerRow}>
          <View>
            <ThemedText variant='body2' color='textSecondary'>
              {displaySubtitle}
            </ThemedText>
            <ThemedText variant='h2' weight='700'>
              {displayTitle}
            </ThemedText>
          </View>
          {onThemeToggle && (
            <TouchableOpacity
              style={styles.themeButton}
              onPress={onThemeToggle}
            >
              <Ionicons
                name={isDark ? 'sunny' : 'moon'}
                size={20}
                color={theme.colors.text}
              />
            </TouchableOpacity>
          )}
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
};
