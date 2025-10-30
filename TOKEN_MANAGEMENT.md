# Token Management & Authentication

## Overview
This document explains how JWT token management works in the FitTracker application and best practices implemented.

## Current Implementation

### 1. **Automatic Token Refresh** ✅
When your access token expires, the app automatically:
- Detects the 401/403 error
- Uses the refresh token to get a new access token
- Retries the failed request with the new token
- **No page reload needed!**

### 2. **Request Queue Management** ✅
If multiple requests fail simultaneously due to token expiration:
- Only ONE refresh request is made
- Other requests are queued
- All queued requests retry with the new token

### 3. **Token Storage**
- `authToken` - Short-lived JWT token (set by backend)
- `refreshToken` - Long-lived token for refreshing access tokens
- Both stored in `localStorage`

## How It Works

### Flow Diagram
```
1. User makes API request
   ↓
2. Token added to request header (interceptor)
   ↓
3. Request sent to backend
   ↓
4a. Success → Return response
   OR
4b. 401/403 Error → Token expired
   ↓
5. Automatic refresh token flow:
   - Call /auth/refresh with refreshToken
   - Get new authToken + refreshToken
   - Store new tokens
   - Retry original request
   ↓
6. If refresh fails → Redirect to login
```

## Files Modified

### `src/services/account.service.js`
**Key Features:**
- `refreshAccessToken()` - Calls `/auth/refresh` endpoint
- `isRefreshing` flag - Prevents multiple simultaneous refresh calls
- `failedRequestsQueue` - Queues requests during token refresh
- Response interceptor - Auto-handles 401/403 errors

### `src/utils/token.js` (NEW)
**Utility functions for token management:**
- `decodeToken(token)` - Decode JWT payload
- `isTokenExpired(token)` - Check if expired
- `willTokenExpireSoon(token, bufferSeconds)` - Check if expires soon
- `getTokenExpiration(token)` - Get expiration date
- `getTimeUntilExpiration(token)` - Get seconds until expiration

## Advanced: Proactive Token Refresh (Optional)

You can implement proactive refresh BEFORE token expires:

### Example: Add to `AccountContext`
```javascript
import { willTokenExpireSoon } from "../utils/token";

useEffect(() => {
  // Check token every minute
  const interval = setInterval(() => {
    const token = localStorage.getItem("authToken");
    
    if (token && willTokenExpireSoon(token, 300)) {
      // Token expires in 5 minutes, refresh it proactively
      refreshAccessToken()
        .then((newToken) => {
          console.log("Token refreshed proactively");
        })
        .catch((error) => {
          console.error("Proactive refresh failed:", error);
        });
    }
  }, 60000); // Check every minute

  return () => clearInterval(interval);
}, []);
```

## Token Duration

Your backend controls token lifetime. Common durations:
- **Access Token**: 15 minutes - 1 hour
- **Refresh Token**: 7 days - 30 days

To check your current token duration:
```javascript
import { getTokenExpiration, getTimeUntilExpiration } from './utils/token';

const token = localStorage.getItem("authToken");
console.log("Expires at:", getTokenExpiration(token));
console.log("Expires in:", Math.floor(getTimeUntilExpiration(token) / 60), "minutes");
```

## Testing

### Test Token Refresh
1. Open DevTools → Application → Local Storage
2. Check `authToken` value
3. Wait for token to expire or manually trigger a 401 error
4. Make any API request
5. Watch Network tab - you'll see:
   - Original request (fails with 401)
   - `/auth/refresh` request (gets new token)
   - Original request retry (succeeds with new token)

### Check Token in DevTools
```javascript
// Paste in browser console
const token = localStorage.getItem("authToken");
const payload = JSON.parse(atob(token.split('.')[1]));
console.log("Token payload:", payload);
console.log("Expires:", new Date(payload.exp * 1000));
console.log("Issued:", new Date(payload.iat * 1000));
```

## Best Practices Implemented ✅

1. ✅ **Never store sensitive data in tokens** - Only user ID/email
2. ✅ **Use HTTPS in production** - Protects tokens in transit
3. ✅ **Automatic token refresh** - Better UX, no interruptions
4. ✅ **Queue management** - Prevents race conditions
5. ✅ **Logout on refresh failure** - Security best practice
6. ✅ **Exclude refresh from auth headers** - Prevents loops

## Troubleshooting

### "Token expired" errors persist
- Check if refresh token is also expired
- Verify backend `/auth/refresh` endpoint works
- Check backend token expiration settings

### Infinite refresh loops
- Ensure `/auth/refresh` is excluded from interceptor
- Check `_retry` flag is working properly

### Token not refreshing
- Check Network tab for `/auth/refresh` calls
- Verify refresh token is in localStorage
- Check backend logs for refresh endpoint errors

## Security Notes

⚠️ **Important:**
- Never log full tokens in production
- Consider using `httpOnly` cookies for tokens (requires backend change)
- Implement token revocation on logout
- Consider session timeout after extended inactivity

## Backend Integration

Your backend endpoints used:
- `POST /api/auth/login` - Returns `{ token, refreshToken }`
- `POST /api/auth/refresh` - Accepts `{ token: refreshToken }`, returns new tokens
- `GET /api/auth/me` - Returns current user data (requires valid token)

## Summary

**What you get now:**
- ✅ Automatic token refresh when expired
- ✅ No page reloads needed
- ✅ Better user experience
- ✅ Handles multiple simultaneous requests
- ✅ Proper error handling and logout
- ✅ Utility functions for advanced use cases

**Token duration is controlled by your BACKEND**, not frontend. The frontend now efficiently manages whatever tokens the backend provides!

