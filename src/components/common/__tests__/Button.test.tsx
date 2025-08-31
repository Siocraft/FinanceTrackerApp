import React from 'react';
import { render } from '@testing-library/react-native';
import { Button } from '../Button';

// Mock the theme hook
jest.mock('../../../theme', () => ({
  useTheme: () => ({
    theme: {
      colors: {
        primary: '#6C63FF',
        secondary: '#FF6B9D',
        onPrimary: '#FFFFFF',
        onSecondary: '#FFFFFF',
        disabled: '#BDBDBD',
      },
      spacing: {
        sm: 8,
        md: 16,
        lg: 24,
        xl: 32,
      },
      borderRadius: {
        md: 12,
      },
      typography: {
        button: {
          fontSize: 16,
          fontWeight: '600',
          lineHeight: 24,
        },
      },
    },
  }),
}));

describe('Button Component', () => {
  it('renders correctly with default props', () => {
    const onPress = jest.fn();
    const { getByText } = render(
      <Button title='Test Button' onPress={onPress} />
    );

    expect(getByText('Test Button')).toBeTruthy();
  });
});
