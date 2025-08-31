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
  const config: EnvConfig = {
    API_BASE_URL: getEnvVar('API_BASE_URL', 'http://localhost:3000'),
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