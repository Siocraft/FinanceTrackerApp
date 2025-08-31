import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { ThemedText } from '../common/ThemedText';
import { useTheme } from '../../theme';
import { createHeaderStyles } from './Header.styles';

interface HeaderProps {
  title?: string;
  subtitle?: string;
  onThemeToggle?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  title = 'Finance Tracker',
  subtitle = 'Welcome back!',
  onThemeToggle,
}) => {
  const { theme, isDark } = useTheme();
  const styles = createHeaderStyles(theme);

  return (
    <LinearGradient colors={theme.gradients.background} style={styles.header}>
      <SafeAreaView>
        <View style={styles.headerRow}>
          <View>
            <ThemedText variant='body2' color='textSecondary'>
              {subtitle}
            </ThemedText>
            <ThemedText variant='h2' weight='700'>
              {title}
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
