/**
 * Token utility functions for JWT management
 */

/**
 * Decode JWT token (without verification - for client-side only)
 * @param {string} token - JWT token
 * @returns {object|null} Decoded token payload or null if invalid
 */
export function decodeToken(token) {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    return JSON.parse(jsonPayload);
  } catch (error) {
    return null;
  }
}

/**
 * Check if token is expired
 * @param {string} token - JWT token
 * @returns {boolean} True if token is expired
 */
export function isTokenExpired(token) {
  const decoded = decodeToken(token);
  if (!decoded || !decoded.exp) {
    return true;
  }
  
  const currentTime = Date.now() / 1000;
  return decoded.exp < currentTime;
}

/**
 * Check if token will expire soon (within the next 5 minutes)
 * @param {string} token - JWT token
 * @param {number} bufferSeconds - Buffer time in seconds (default: 300 = 5 minutes)
 * @returns {boolean} True if token will expire soon
 */
export function willTokenExpireSoon(token, bufferSeconds = 300) {
  const decoded = decodeToken(token);
  if (!decoded || !decoded.exp) {
    return true;
  }
  
  const currentTime = Date.now() / 1000;
  return decoded.exp < (currentTime + bufferSeconds);
}

/**
 * Get token expiration time
 * @param {string} token - JWT token
 * @returns {Date|null} Expiration date or null if invalid
 */
export function getTokenExpiration(token) {
  const decoded = decodeToken(token);
  if (!decoded || !decoded.exp) {
    return null;
  }
  
  return new Date(decoded.exp * 1000);
}

/**
 * Get time until token expiration in seconds
 * @param {string} token - JWT token
 * @returns {number} Seconds until expiration (negative if already expired)
 */
export function getTimeUntilExpiration(token) {
  const decoded = decodeToken(token);
  if (!decoded || !decoded.exp) {
    return -1;
  }
  
  const currentTime = Date.now() / 1000;
  return decoded.exp - currentTime;
}

