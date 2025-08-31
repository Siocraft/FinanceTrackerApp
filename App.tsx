import React from 'react';
import { ThemeProvider } from './src/theme';
import { HomeScreen } from './src/screens/HomeScreen';

export default function App() {
  return (
    <ThemeProvider>
      <HomeScreen />
    </ThemeProvider>
  );
}
