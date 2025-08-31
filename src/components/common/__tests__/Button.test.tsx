import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
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
      <Button title="Test Button" onPress={onPress} />
    );

    expect(getByText('Test Button')).toBeTruthy();
  });

  it('calls onPress when pressed', () => {
    const onPress = jest.fn();
    const { getByText } = render(
      <Button title="Test Button" onPress={onPress} />
    );

    fireEvent.press(getByText('Test Button'));
    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it('renders with different variants', () => {
    const onPress = jest.fn();
    const { getByText, rerender } = render(
      <Button title="Primary" onPress={onPress} variant="primary" />
    );

    expect(getByText('Primary')).toBeTruthy();

    rerender(
      <Button title="Secondary" onPress={onPress} variant="secondary" />
    );
    expect(getByText('Secondary')).toBeTruthy();

    rerender(
      <Button title="Outline" onPress={onPress} variant="outline" />
    );
    expect(getByText('Outline')).toBeTruthy();
  });

  it('renders disabled state correctly', () => {
    const onPress = jest.fn();
    const { getByText } = render(
      <Button title="Disabled Button" onPress={onPress} disabled={true} />
    );

    const button = getByText('Disabled Button');
    expect(button).toBeTruthy();
  });

  it('renders loading state correctly', () => {
    const onPress = jest.fn();
    const { getByText } = render(
      <Button title="Loading Button" onPress={onPress} loading={true} />
    );

    expect(getByText('Loading Button')).toBeTruthy();
  });
});
