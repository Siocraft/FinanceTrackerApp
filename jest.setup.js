// Mock React Native components
jest.mock('react-native', () => {
  const RN = jest.requireActual('react-native');
  return {
    ...RN,
    // Mock specific components as needed
    Alert: {
      alert: jest.fn(),
    },
    Linking: {
      openURL: jest.fn(),
    },
    Platform: {
      OS: 'ios',
      select: jest.fn(),
    },
  };
});

// Mock TurboModuleRegistry separately
jest.mock('react-native/Libraries/TurboModule/TurboModuleRegistry', () => ({
  getEnforcing: jest.fn(() => ({
    addListener: jest.fn(),
    removeListeners: jest.fn(),
  })),
  get: jest.fn(() => null),
}));

// Mock Expo modules
jest.mock('expo-linear-gradient', () => 'LinearGradient');
jest.mock('expo-status-bar', () => 'StatusBar');
jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock')
);

// Mock React Navigation
jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({
    navigate: jest.fn(),
    goBack: jest.fn(),
  }),
  useRoute: () => ({
    params: {},
  }),
}));

// Mock React Query
jest.mock('@tanstack/react-query', () => ({
  useQuery: jest.fn(),
  useMutation: jest.fn(),
  useQueryClient: jest.fn(),
}));

// Global test setup
global.console = {
  ...console,
  // Uncomment to ignore a specific log level
  // log: jest.fn(),
  // debug: jest.fn(),
  // info: jest.fn(),
  // warn: jest.fn(),
  error: jest.fn(),
};
