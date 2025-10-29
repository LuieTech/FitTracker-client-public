/**
 * Centralized logging utility
 * Automatically disables debug logs in production
 */

const isDevelopment = import.meta.env.DEV;

export const logger = {
  /**
   * Development-only logs (hidden in production)
   */
  log: (...args) => {
    if (isDevelopment) {
      console.log(...args);
    }
  },

  /**
   * Development-only debug logs
   */
  debug: (...args) => {
    if (isDevelopment) {
      console.debug(...args);
    }
  },

  /**
   * Always shown - use for important information
   */
  info: (...args) => {
    console.info(...args);
  },

  /**
   * Always shown - use for warnings
   */
  warn: (...args) => {
    console.warn(...args);
  },

  /**
   * Always shown - use for errors
   */
  error: (...args) => {
    console.error(...args);
  },

  /**
   * Convenience method for API errors
   */
  apiError: (context, error) => {
    console.error(`[API Error - ${context}]:`, {
      message: error.response?.data?.message || error.message,
      status: error.response?.status,
      data: error.response?.data,
    });
  }
};

