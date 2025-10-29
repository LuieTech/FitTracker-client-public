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

export function createClient(body) {
  return service
    .post("/clients", body)
    .then((res) => res.data)
    .catch((error) => {
      console.error("Error while creating client in service: ", error);
      throw error;
    });
}

export function getClients(trainerId) {
  return service
    .get(`/trainers/clients/` + trainerId)
    .then((response) => response.data)
    .catch((error) => {
      console.error("Error fetching clients:", error.response.data.message);
      return [];
    });
}

export function getClientById(clientId) {

  return service
    .get("/clients/" + clientId)
    .then(response => response.data)
    .catch((error) => {
      console.error("Error fetching clientById: ", error.response.data.message);
      return {};
    });

}

//Delete
export function deleteClientById(clientId) {
  return service
    .delete("/clients/" + clientId)
    .then((res) => res.data)
    .catch((error) => {
      if (error.response?.status === 404) {
        return Promise.reject("Client not found");
      } else {
        console.error("Error deleting client:", error.response?.data?.message || error.message);
        throw error;
      }
    });
}
