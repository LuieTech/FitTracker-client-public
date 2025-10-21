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
      window.location.reload();
    }
    return Promise.reject(error);
  }
);

export function addExercise(exercise) {
  return service
    .post("/exercises", exercise)
    .then((res) => res.data)
    .catch((error) => {
      console.error("Error while adding exercise in service file: ", error);
      throw error;
    });
}

export function getExercisesByClientId(clientId) {
  return service
    .get(`/exercises/client/${clientId}`)
    .then((response) => response.data)
    .catch((error) => {
      console.error("Error fetching exercises by client:", error);
      return [];
    });
}

