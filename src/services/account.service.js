import axios from "axios";

const service = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_BASE_URL,
});

// Variable to track if we're currently refreshing the token
let isRefreshing = false;
// Queue of failed requests waiting for token refresh
let failedRequestsQueue = [];

// Function to process queued requests after token refresh
const processQueue = (error, token = null) => {
  failedRequestsQueue.forEach((promise) => {
    if (error) {
      promise.reject(error);
    } else {
      promise.resolve(token);
    }
  });
  failedRequestsQueue = [];
};

// Function to refresh the access token using the refresh token
const refreshAccessToken = async () => {
  try {
    const refreshToken = localStorage.getItem("refreshToken");
    if (!refreshToken) {
      throw new Error("No refresh token available");
    }

    const response = await axios.post(
      `${import.meta.env.VITE_BACKEND_BASE_URL}/auth/refresh`,
      { token: refreshToken }
    );

    const { token: newToken, refreshToken: newRefreshToken } = response.data;
    
    // Store new tokens
    localStorage.setItem("authToken", newToken);
    localStorage.setItem("refreshToken", newRefreshToken);
    
    return newToken;
  } catch (error) {
    // Refresh failed - clear tokens and reload
    localStorage.removeItem("authToken");
    localStorage.removeItem("refreshToken");
    window.location.href = "/"; // Redirect to home/login
    throw error;
  }
};

// Request interceptor: Add token to every request
service.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken");
    if (
      token &&
      config.url !== "/auth/register" &&
      config.url !== "/auth/login" &&
      config.url !== "/auth/refresh"
    ) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor: Handle token expiration and auto-refresh
service.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Handle 401 Unauthorized (token expired or invalid)
    if (
      error.response &&
      (error.response.status === 401 || error.response.status === 403) &&
      !originalRequest._retry &&
      originalRequest.url !== "/auth/login" &&
      originalRequest.url !== "/auth/refresh"
    ) {
      if (isRefreshing) {
        // If already refreshing, queue this request
        return new Promise((resolve, reject) => {
          failedRequestsQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            return service(originalRequest);
          })
          .catch((err) => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const newToken = await refreshAccessToken();
        isRefreshing = false;
        processQueue(null, newToken);

        // Retry the original request with new token
        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return service(originalRequest);
      } catch (refreshError) {
        isRefreshing = false;
        processQueue(refreshError, null);
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export function loginTrainer(body) {
  return service
    .post("/auth/login", body)
    .then((response) => {
      localStorage.setItem("authToken", response.data.token);
      localStorage.setItem("refreshToken", response.data.refreshToken);
      return service.get("/auth/me");
    })
    .then((res) => res.data)
    .catch((error) => {
      throw error;
    });
}

export function refreshTrainerData() {
  return service
    .get("/auth/me")
    .then((res) => res.data)
    .catch((error) => {
      throw error;
    });
}

