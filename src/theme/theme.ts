import {
  AppTheme,
  ThemeSpacing,
  ThemeBorderRadius,
  ThemeTypography,
} from '../types/theme';
import {
  darkColors,
  lightColors,
  darkGradients,
  lightGradients,
} from './colors';

// Spacing configuration
export const spacing: ThemeSpacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

// Border radius configuration
export const borderRadius: ThemeBorderRadius = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  round: 50,
};

// Typography configuration
export const typography: ThemeTypography = {
  h1: {
    fontSize: 32,
    fontWeight: '700',
    lineHeight: 40,
  },
  h2: {
    fontSize: 24,
    fontWeight: '600',
    lineHeight: 32,
  },
  h3: {
    fontSize: 20,
    fontWeight: '600',
    lineHeight: 28,
  },
  body1: {
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 24,
  },
  body2: {
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 20,
  },
  caption: {
    fontSize: 12,
    fontWeight: '400',
    lineHeight: 16,
  },
  button: {
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 24,
  },
};

// Dark theme
export const darkTheme: AppTheme = {
  name: 'dark',
  dark: true,
  colors: darkColors,
  gradients: darkGradients,
  spacing,
  borderRadius,
  typography,
};

// Light theme
export const lightTheme: AppTheme = {
  name: 'light',
  dark: false,
  colors: lightColors,
  gradients: lightGradients,
  spacing,
  borderRadius,
  typography,
};

// Theme map for easy access
export const themes = {
  light: lightTheme,
  dark: darkTheme,
};
