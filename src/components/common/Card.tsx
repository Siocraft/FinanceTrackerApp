import React, { ReactNode } from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '../../theme';

interface CardProps {
  children: ReactNode;
  style?: ViewStyle;
  gradient?: boolean;
  gradientColors?: string[];
  elevation?: number;
  padding?: 'none' | 'small' | 'medium' | 'large';
}

export const Card: React.FC<CardProps> = ({
  children,
  style,
  gradient = false,
  gradientColors,
  elevation = 2,
  padding = 'medium',
}) => {
  const { theme } = useTheme();

  const getPaddingStyle = () => {
    const paddingStyles = {
      none: {},
      small: { padding: theme.spacing.sm },
      medium: { padding: theme.spacing.md },
      large: { padding: theme.spacing.lg },
    };
    return paddingStyles[padding];
  };

  const cardStyle: ViewStyle = {
    backgroundColor: theme.colors.card,
    borderRadius: theme.borderRadius.lg,
    shadowColor: theme.colors.text,
    shadowOffset: {
      width: 0,
      height: elevation,
    },
    shadowOpacity: theme.dark ? 0.3 : 0.1,
    shadowRadius: elevation * 2,
    elevation: elevation,
    ...getPaddingStyle(),
  };

  if (gradient) {
    const colors = gradientColors || theme.gradients.card;
    return (
      <LinearGradient
        colors={colors}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={[cardStyle, { backgroundColor: 'transparent' }, style]}
      >
        {children}
      </LinearGradient>
    );
  }

  return (
    <View style={[cardStyle, style]}>
      {children}
    </View>
  );
};