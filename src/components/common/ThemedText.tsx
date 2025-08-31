import React from 'react';
import { Text, TextProps, TextStyle } from 'react-native';
import { useTheme } from '../../theme';

interface ThemedTextProps extends TextProps {
  variant?: 'h1' | 'h2' | 'h3' | 'body1' | 'body2' | 'caption' | 'button';
  color?:
    | 'primary'
    | 'secondary'
    | 'text'
    | 'textSecondary'
    | 'error'
    | 'success'
    | 'warning'
    | 'info'
    | 'income'
    | 'expense'
    | 'onPrimary';
  align?: 'left' | 'center' | 'right';
  weight?:
    | 'normal'
    | 'bold'
    | '100'
    | '200'
    | '300'
    | '400'
    | '500'
    | '600'
    | '700'
    | '800'
    | '900';
}

export const ThemedText: React.FC<ThemedTextProps> = ({
  children,
  variant = 'body1',
  color = 'text',
  align = 'left',
  weight,
  style,
  ...props
}) => {
  const { theme } = useTheme();

  const getTextColor = () => {
    const colorMap = {
      primary: theme.colors.primary,
      secondary: theme.colors.secondary,
      text: theme.colors.text,
      textSecondary: theme.colors.textSecondary,
      error: theme.colors.error,
      success: theme.colors.success,
      warning: theme.colors.warning,
      info: theme.colors.info,
      income: theme.colors.income,
      expense: theme.colors.expense,
      onPrimary: theme.colors.onPrimary,
    };
    return colorMap[color];
  };

  const textStyle: TextStyle = {
    ...theme.typography[variant],
    color: getTextColor(),
    textAlign: align,
    fontWeight: weight || (theme.typography[variant].fontWeight as any),
  };

  return (
    <Text style={[textStyle, style]} {...props}>
      {children}
    </Text>
  );
};
