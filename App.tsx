import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ThemeProvider } from './src/theme';
import { QueryProvider } from './src/providers/QueryProvider';
import { TabNavigator } from './src/navigation';

export default function App() {
  return (
    <SafeAreaProvider>
      <QueryProvider>
        <ThemeProvider>
          <NavigationContainer>
            <TabNavigator />
          </NavigationContainer>
        </ThemeProvider>
      </QueryProvider>
    </SafeAreaProvider>
  );
}
