import { ThemeColors, ThemeGradients } from '../types/theme';

// Dark Theme Colors
export const darkColors: ThemeColors = {
  primary: '#6C63FF',
  primaryVariant: '#5A52E8',
  secondary: '#FF6B9D',
  secondaryVariant: '#E85A8A',
  background: '#0F0F23',
  surface: '#1A1A2E',
  error: '#FF5252',
  success: '#4CAF50',
  warning: '#FF9800',
  info: '#2196F3',
  onPrimary: '#FFFFFF',
  onSecondary: '#FFFFFF',
  onBackground: '#E8E8F0',
  onSurface: '#E8E8F0',
  onError: '#FFFFFF',
  text: '#E8E8F0',
  textSecondary: '#A0A0B8',
  border: '#2A2A3E',
  disabled: '#4A4A5E',
  placeholder: '#6A6A7E',
  backdrop: 'rgba(15, 15, 35, 0.8)',
  notification: '#FF6B9D',
  card: '#16213E',
  income: '#00E676',
  expense: '#FF5722',
  neutral: '#9E9E9E',
};

// Light Theme Colors
export const lightColors: ThemeColors = {
  primary: '#6C63FF',
  primaryVariant: '#5A52E8',
  secondary: '#FF6B9D',
  secondaryVariant: '#E85A8A',
  background: '#F8F9FA',
  surface: '#FFFFFF',
  error: '#D32F2F',
  success: '#388E3C',
  warning: '#F57C00',
  info: '#1976D2',
  onPrimary: '#FFFFFF',
  onSecondary: '#FFFFFF',
  onBackground: '#1A1A2E',
  onSurface: '#1A1A2E',
  onError: '#FFFFFF',
  text: '#1A1A2E',
  textSecondary: '#6A6A7E',
  border: '#E0E0E0',
  disabled: '#BDBDBD',
  placeholder: '#9E9E9E',
  backdrop: 'rgba(0, 0, 0, 0.5)',
  notification: '#FF6B9D',
  card: '#FFFFFF',
  income: '#4CAF50',
  expense: '#F44336',
  neutral: '#757575',
};

// Dark Theme Gradients
export const darkGradients: ThemeGradients = {
  primary: ['#6C63FF', '#9C88FF'] as const,
  secondary: ['#FF6B9D', '#FF8FB3'] as const,
  background: ['#0F0F23', '#1A1A2E'] as const,
  card: ['#16213E', '#1A1A2E'] as const,
  income: ['#00E676', '#69F0AE'] as const,
  expense: ['#FF5722', '#FF8A65'] as const,
  neutral: ['#424242', '#616161'] as const,
};

// Light Theme Gradients
export const lightGradients: ThemeGradients = {
  primary: ['#6C63FF', '#9C88FF'] as const,
  secondary: ['#FF6B9D', '#FF8FB3'] as const,
  background: ['#F8F9FA', '#FFFFFF'] as const,
  card: ['#FFFFFF', '#F5F5F5'] as const,
  income: ['#4CAF50', '#81C784'] as const,
  expense: ['#F44336', '#E57373'] as const,
  neutral: ['#E0E0E0', '#F5F5F5'] as const,
};