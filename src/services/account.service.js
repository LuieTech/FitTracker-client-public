import axios from "axios";

const service = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_BASE_URL,
});

service.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken");
    if (
      token &&
      config.url !== "/auth/register" &&
      config.url !== "/auth/login"
    ) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

service.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 403) {
      console.warn("Token expirado o inválido. Limpiando localStorage y recargando...");
      localStorage.removeItem("authToken");
      localStorage.removeItem("refreshToken");
      // Reload the page to trigger auto-login in AccountContext
      // Only reload in production, not during development
      if (!import.meta.env.DEV) {
        window.location.reload();
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

