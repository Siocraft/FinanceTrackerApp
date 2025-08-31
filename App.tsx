import React from 'react';
import { ThemeProvider } from './src/theme';
import { QueryProvider } from './src/providers/QueryProvider';
import { HomeScreen } from './src/screens/HomeScreen';

export default function App() {
  return (
    <QueryProvider>
      <ThemeProvider>
        <HomeScreen />
      </ThemeProvider>
    </QueryProvider>
  );
}
