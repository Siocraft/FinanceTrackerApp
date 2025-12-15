import Constants from 'expo-constants';

// Define the expected environment variables
interface EnvConfig {
  API_BASE_URL: string;
  API_TIMEOUT: number;
  APP_NAME: string;
  APP_VERSION: string;
  DEBUG: boolean;
  LOG_LEVEL: string;
}

// Helper function to get environment variables with fallbacks
const getEnvVar = (key: string, fallback: string = ''): string => {
  // Try to get from Expo Constants first
  const expoValue = Constants.expoConfig?.extra?.[key];
  if (expoValue) return String(expoValue);

  // Fallback to process.env (for development)
  if (typeof process !== 'undefined' && process.env) {
    const processValue = process.env[key];
    if (processValue) return String(processValue);
  }

  // Use fallback
  return fallback;
};

// Parse environment variables with type safety
const parseEnvConfig = (): EnvConfig => {
  const apiBaseUrl = getEnvVar('API_BASE_URL');

  // Warn if using localhost (this won't work on physical devices)
  // Note: For real devices, you MUST use your local network IP address
  if (apiBaseUrl.includes('localhost') && !apiBaseUrl.includes('127.0.0.1')) {
    const isDev =
      typeof __DEV__ !== 'undefined'
        ? __DEV__
        : process.env.NODE_ENV !== 'production';
    if (isDev) {
      console.warn(
        '⚠️  WARNING: Using localhost for API_BASE_URL.\n' +
          '   This will NOT work on a physical device!\n' +
          '   Please update app.json extra.API_BASE_URL to use your local network IP.\n' +
          '   Example: http://192.168.1.100:3000\n' +
          '   Find your IP with: ifconfig | grep "inet " | grep -v 127.0.0.1'
      );
    }
  }

  const config: EnvConfig = {
    API_BASE_URL: apiBaseUrl,
    API_TIMEOUT: parseInt(getEnvVar('API_TIMEOUT', '10000'), 10),
    APP_NAME: getEnvVar('APP_NAME', 'Finance Tracker'),
    APP_VERSION: getEnvVar('APP_VERSION', '1.0.0'),
    DEBUG: getEnvVar('DEBUG', 'false').toLowerCase() === 'true',
    LOG_LEVEL: getEnvVar('LOG_LEVEL', 'info'),
  };

  // Validation
  if (!config.API_BASE_URL) {
    throw new Error('API_BASE_URL is required');
  }

  if (config.API_TIMEOUT <= 0) {
    console.warn('Invalid API_TIMEOUT, using default 10000ms');
    config.API_TIMEOUT = 10000;
  }

  return config;
};

// Export the configuration
export const env = parseEnvConfig();

// Development helper
if (env.DEBUG) {
  console.log('🔧 Environment Configuration:', {
    API_BASE_URL: env.API_BASE_URL,
    API_TIMEOUT: env.API_TIMEOUT,
    DEBUG: env.DEBUG,
    LOG_LEVEL: env.LOG_LEVEL,
  });
}
