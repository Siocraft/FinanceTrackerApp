# FinanceTracker

A modern React Native Expo app for tracking personal finances with beautiful UI components and comprehensive theming support.

## Features

### 🎨 Modern UI & Theming
- **Multi-theme support**: Light, Dark, and System themes
- **Beautiful gradients**: Custom gradient system for cards and buttons
- **Consistent design**: Unified spacing, typography, and color system
- **React Native Paper integration**: Professional UI components
- **Custom components**: Themed buttons, cards, and text components

### 💰 Financial Tracking
- **Transaction management**: Track income and expenses
- **Category system**: Organized transaction categories
- **Balance overview**: Real-time balance calculations
- **Monthly statistics**: Income, expenses, and savings tracking
- **Transaction history**: Detailed transaction listings

### 📱 User Experience
- **Responsive design**: Works on all screen sizes
- **Smooth animations**: React Native Reanimated integration
- **Gesture support**: Touch-friendly interactions
- **Safe area handling**: Proper screen edge handling

## Tech Stack

- **React Native**: Cross-platform mobile development
- **Expo**: Development platform and tools
- **TypeScript**: Type-safe development
- **React Native Paper**: UI component library
- **Expo Linear Gradient**: Beautiful gradient effects
- **AsyncStorage**: Local data persistence
- **Expo Vector Icons**: Comprehensive icon library

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Button.tsx       # Themed button component
│   ├── Card.tsx         # Themed card component
│   ├── ThemedText.tsx   # Typography component
│   ├── TransactionCard.tsx # Transaction display
│   ├── BalanceCard.tsx  # Balance overview
│   └── index.ts         # Component exports
├── screens/             # App screens
│   └── HomeScreen.tsx   # Main dashboard
├── theme/               # Theming system
│   ├── colors.ts        # Color definitions
│   ├── theme.ts         # Theme configuration
│   ├── ThemeContext.tsx # Theme provider
│   └── index.ts         # Theme exports
├── types/               # TypeScript definitions
│   ├── theme.ts         # Theme types
│   ├── financial.ts     # Financial data types
│   └── index.ts         # Type exports
└── utils/               # Utility functions
```

## Theme System

The app features a comprehensive theming system that supports:

### Colors
- Primary and secondary colors
- Background and surface colors
- Text and border colors
- Semantic colors (success, error, warning, info)
- Financial colors (income, expense)

### Gradients
- Primary and secondary gradients
- Background gradients
- Card gradients
- Financial gradients (income/expense)

### Typography
- Consistent font sizes and weights
- Proper line heights
- Semantic text variants (h1, h2, h3, body1, body2, caption, button)

### Spacing & Layout
- Consistent spacing scale (xs, sm, md, lg, xl, xxl)
- Border radius system
- Elevation and shadows

## Getting Started

### Prerequisites
- Node.js (v14 or later)
- npm or yarn
- Expo CLI
- iOS Simulator or Android Emulator (for testing)

### Installation

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Start the development server**:
   ```bash
   npm start
   ```

3. **Run on specific platform**:
   ```bash
   npm run ios     # iOS Simulator
   npm run android # Android Emulator
   npm run web     # Web browser
   ```

## Usage

### Using Theme Components

```tsx
import { ThemedText, Button, Card } from './src/components';
import { useTheme } from './src/theme';

function MyComponent() {
  const { theme } = useTheme();
  
  return (
    <Card gradient={true}>
      <ThemedText variant="h2" color="primary">
        Welcome to FinanceTracker
      </ThemedText>
      <Button 
        title="Get Started" 
        variant="primary" 
        gradient={true}
        onPress={() => console.log('Pressed!')}
      />
    </Card>
  );
}
```

### Switching Themes

```tsx
import { useTheme } from './src/theme';

function ThemeToggle() {
  const { themeType, setThemeType } = useTheme();
  
  const toggleTheme = () => {
    const nextTheme = themeType === 'light' ? 'dark' : 'light';
    setThemeType(nextTheme);
  };
  
  return (
    <Button title="Toggle Theme" onPress={toggleTheme} />
  );
}
```

## Financial Data Types

The app includes comprehensive TypeScript types for financial data:

- **Transaction**: Individual income/expense entries
- **Categories**: Predefined income and expense categories
- **MonthlyStats**: Monthly financial summaries
- **Budget**: Budget tracking and limits
- **Goal**: Financial goals and targets

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.