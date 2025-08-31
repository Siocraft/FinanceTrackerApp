# Components Organization

This directory contains all the reusable React Native components organized into logical groups.

## Structure

```
components/
├── common/           # Reusable components used across the app
│   ├── Button.tsx
│   ├── Card.tsx
│   ├── ThemedText.tsx
│   └── index.ts
├── layout/           # Structural layout components
│   ├── Header.tsx
│   ├── Header.styles.ts
│   └── index.ts
├── cards/            # Data display card components
│   ├── BalanceCard.tsx
│   ├── BalanceCard.styles.ts
│   ├── TransactionCard.tsx
│   ├── TransactionCard.styles.ts
│   ├── MonthlyStats.tsx
│   ├── MonthlyStats.styles.ts
│   └── index.ts
├── states/           # Loading, error, and empty state components
│   ├── LoadingState.tsx
│   ├── LoadingState.styles.ts
│   ├── ErrorState.tsx
│   ├── ErrorState.styles.ts
│   ├── EmptyState.tsx
│   ├── EmptyState.styles.ts
│   ├── QuickActions.tsx
│   ├── QuickActions.styles.ts
│   ├── TransactionsList.tsx
│   ├── TransactionsList.styles.ts
│   └── index.ts
└── index.ts         # Main export file
```

## Component Categories

### Common Components (`common/`)
- **Button**: Reusable button component with multiple variants
- **Card**: Base card component with gradient support
- **ThemedText**: Text component with theme integration

### Layout Components (`layout/`)
- **Header**: App header with theme toggle functionality

### Card Components (`cards/`)
- **BalanceCard**: Displays total balance and monthly stats
- **TransactionCard**: Individual transaction display
- **MonthlyStats**: Monthly statistics summary

### State Components (`states/`)
- **LoadingState**: Loading spinner with message
- **ErrorState**: Error display with retry functionality
- **EmptyState**: Empty state with customizable message
- **QuickActions**: Quick action buttons
- **TransactionsList**: List of transactions with toggle functionality

## Usage

Import components from the main index:

```typescript
import { Button, Header, BalanceCard, LoadingState } from '../components';
```

Or import from specific categories:

```typescript
import { Button, Card, ThemedText } from '../components/common';
import { Header } from '../components/layout';
import { BalanceCard, TransactionCard } from '../components/cards';
import { LoadingState, ErrorState } from '../components/states';
```

## Styling

Each component has its own `.styles.ts` file that exports a `createComponentStyles(theme)` function. This ensures proper theme integration and type safety.

## Adding New Components

1. Create the component file in the appropriate category folder
2. Create a corresponding `.styles.ts` file
3. Update the category's `index.ts` file to export the new component
4. The main `index.ts` will automatically include it through the category exports
