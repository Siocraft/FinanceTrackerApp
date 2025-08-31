import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';
import { Appearance, ColorSchemeName } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ThemeContextType, ThemeType, AppTheme } from '../types/theme';
import { lightTheme, darkTheme } from './theme';

const THEME_STORAGE_KEY = '@FinanceTracker:theme';

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [themeType, setThemeType] = useState<ThemeType>('system');
  const [systemColorScheme, setSystemColorScheme] = useState<ColorSchemeName>(
    Appearance.getColorScheme()
  );

  // Determine the current theme based on themeType and system preference
  const getCurrentTheme = (): AppTheme => {
    if (themeType === 'system') {
      return systemColorScheme === 'dark' ? darkTheme : lightTheme;
    }
    return themeType === 'dark' ? darkTheme : lightTheme;
  };

  const theme = getCurrentTheme();
  const isDark = theme.dark;

  // Load saved theme preference on app start
  useEffect(() => {
    const loadTheme = async () => {
      try {
        const savedTheme = await AsyncStorage.getItem(THEME_STORAGE_KEY);
        if (savedTheme && ['light', 'dark', 'system'].includes(savedTheme)) {
          setThemeType(savedTheme as ThemeType);
        }
      } catch (error) {
        console.error('Error loading theme preference:', error);
      }
    };

    loadTheme();
  }, []);

  // Listen to system color scheme changes
  useEffect(() => {
    const subscription = Appearance.addChangeListener(({ colorScheme }) => {
      setSystemColorScheme(colorScheme);
    });

    return () => subscription?.remove();
  }, []);

  // Save theme preference when it changes
  const handleSetThemeType = async (newThemeType: ThemeType) => {
    try {
      setThemeType(newThemeType);
      await AsyncStorage.setItem(THEME_STORAGE_KEY, newThemeType);
    } catch (error) {
      console.error('Error saving theme preference:', error);
    }
  };

  const contextValue: ThemeContextType = {
    theme,
    themeType,
    setThemeType: handleSetThemeType,
    isDark,
  };

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
