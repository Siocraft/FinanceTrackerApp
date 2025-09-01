import React from 'react';
import { View } from 'react-native';
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
  icon?: keyof typeof Ionicons.glyphMap;
}

export const Header: React.FC<HeaderProps> = ({
  title,
  subtitle,
  icon = 'wallet',
}) => {
  const { t } = useTranslation();
  const { theme } = useTheme();
  const styles = createHeaderStyles(theme);

  const displayTitle = title || t('header.title');
  const displaySubtitle = subtitle || t('header.subtitle');

  return (
    <LinearGradient
      colors={[
        theme.colors.primary,
        theme.colors.secondary || `${theme.colors.primary}88`,
        theme.colors.primary + '99',
      ]}
      style={styles.header}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      {/* Decorative Elements */}
      <View style={styles.decorativeElements}>
        <View style={styles.decorativeCircle1} />
        <View style={styles.decorativeCircle2} />
      </View>

      <SafeAreaView>
        <View style={styles.headerRow}>
          <View style={styles.headerContent}>
            <ThemedText variant='body2' style={styles.subtitleText}>
              {displaySubtitle}
            </ThemedText>
            <View style={styles.titleRow}>
              <View style={styles.titleIcon}>
                <Ionicons name={icon} size={20} color='#FFFFFF' />
              </View>
              <ThemedText variant='h2' weight='700' style={styles.titleText}>
                {displayTitle}
              </ThemedText>
            </View>
          </View>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
};
