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

// exercise.service.js
service.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error?.response?.status;

    if (status === 401 || status === 403) {
      console.warn("Token expired/invalid. Clearing storage…");
      localStorage.removeItem("authToken");
      localStorage.removeItem("refreshToken");

      // Don't nuke the page while debugging
      if (!import.meta.env.DEV) {
        window.location.reload();
      }
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

