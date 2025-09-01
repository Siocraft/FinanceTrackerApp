import React, { useEffect, useRef } from 'react';
import { View, Animated } from 'react-native';
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
  scrollY?: Animated.Value;
}

export const Header: React.FC<HeaderProps> = ({
  title,
  subtitle,
  icon = 'wallet',
  scrollY,
}) => {
  const { t } = useTranslation();
  const { theme } = useTheme();
  const styles = createHeaderStyles(theme);

  const displayTitle = title || t('header.title');
  const displaySubtitle = subtitle || t('header.subtitle');

  // Animation values
  const headerHeight = useRef(new Animated.Value(1)).current;
  const subtitleOpacity = useRef(new Animated.Value(1)).current;
  const titleScale = useRef(new Animated.Value(1)).current;
  const iconScale = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (!scrollY) return;

    const listener = scrollY.addListener(({ value }) => {
      // Start animation at 30px scroll, complete by 80px
      const scrollThreshold = 30;
      const maxScroll = 80;
      const progress = Math.min(
        Math.max((value - scrollThreshold) / (maxScroll - scrollThreshold), 0),
        1
      );

      // Animate header height (from 1 to 0.6)
      Animated.timing(headerHeight, {
        toValue: 1 - progress * 0.4,
        duration: 0,
        useNativeDriver: false,
      }).start();

      // Animate subtitle opacity (from 1 to 0)
      Animated.timing(subtitleOpacity, {
        toValue: 1 - progress,
        duration: 0,
        useNativeDriver: true,
      }).start();

      // Animate title scale (from 1 to 0.85)
      Animated.timing(titleScale, {
        toValue: 1 - progress * 0.15,
        duration: 0,
        useNativeDriver: true,
      }).start();

      // Animate icon scale (from 1 to 0.8)
      Animated.timing(iconScale, {
        toValue: 1 - progress * 0.2,
        duration: 0,
        useNativeDriver: true,
      }).start();
    });

    return () => scrollY.removeListener(listener);
  }, [scrollY, headerHeight, subtitleOpacity, titleScale, iconScale]);

  return (
    <Animated.View
      style={[
        styles.headerContainer,
        {
          transform: [{ scaleY: headerHeight }],
        },
      ]}
    >
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
              <Animated.View style={{ opacity: subtitleOpacity }}>
                <ThemedText variant='body2' style={styles.subtitleText}>
                  {displaySubtitle}
                </ThemedText>
              </Animated.View>
              <View style={styles.titleRow}>
                <Animated.View
                  style={[
                    styles.titleIcon,
                    { transform: [{ scale: iconScale }] },
                  ]}
                >
                  <Ionicons name={icon} size={20} color='#FFFFFF' />
                </Animated.View>
                <Animated.View style={{ transform: [{ scale: titleScale }] }}>
                  <ThemedText
                    variant='h2'
                    weight='700'
                    style={styles.titleText}
                  >
                    {displayTitle}
                  </ThemedText>
                </Animated.View>
              </View>
            </View>
          </View>
        </SafeAreaView>
      </LinearGradient>
    </Animated.View>
  );
};
