export interface ThemeColors {
  primary: string;
  primaryVariant: string;
  secondary: string;
  secondaryVariant: string;
  background: string;
  surface: string;
  error: string;
  success: string;
  warning: string;
  info: string;
  onPrimary: string;
  onSecondary: string;
  onBackground: string;
  onSurface: string;
  onError: string;
  text: string;
  textSecondary: string;
  border: string;
  disabled: string;
  placeholder: string;
  backdrop: string;
  notification: string;
  card: string;
  income: string;
  expense: string;
  neutral: string;
}

export interface ThemeGradients {
  primary: string[];
  secondary: string[];
  background: string[];
  card: string[];
  income: string[];
  expense: string[];
  neutral: string[];
}

export interface ThemeSpacing {
  xs: number;
  sm: number;
  md: number;
  lg: number;
  xl: number;
  xxl: number;
}

export interface ThemeBorderRadius {
  xs: number;
  sm: number;
  md: number;
  lg: number;
  xl: number;
  round: number;
}

export interface ThemeTypography {
  h1: {
    fontSize: number;
    fontWeight: string;
    lineHeight: number;
  };
  h2: {
    fontSize: number;
    fontWeight: string;
    lineHeight: number;
  };
  h3: {
    fontSize: number;
    fontWeight: string;
    lineHeight: number;
  };
  body1: {
    fontSize: number;
    fontWeight: string;
    lineHeight: number;
  };
  body2: {
    fontSize: number;
    fontWeight: string;
    lineHeight: number;
  };
  caption: {
    fontSize: number;
    fontWeight: string;
    lineHeight: number;
  };
  button: {
    fontSize: number;
    fontWeight: string;
    lineHeight: number;
  };
}

export interface AppTheme {
  name: string;
  dark: boolean;
  colors: ThemeColors;
  gradients: ThemeGradients;
  spacing: ThemeSpacing;
  borderRadius: ThemeBorderRadius;
  typography: ThemeTypography;
}

export type ThemeType = 'light' | 'dark' | 'system';

export interface ThemeContextType {
  theme: AppTheme;
  themeType: ThemeType;
  setThemeType: (type: ThemeType) => void;
  isDark: boolean;
}