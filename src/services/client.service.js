import axios from "axios"

const service = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_BASE_URL,
});

service.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken");
    if (token && config.url !== '/auth/register' && config.url !== '/auth/login') {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export function createClient(body) {
  return service
    .post("/clients", body)
    .then((res) => res.data)
    .catch((error) =>
      console.log("Error while creating client in service: ", error)
    );
}

export function getClients(trainerId){
  return service
    .get(`/trainers/clients/` + trainerId)
    .then((response) => response.data)
    .catch((error) => {
      console.error("Error fetching clients:", error.response.data.message);
      return [];
    });
}

export function getClientsByTrainerId(trainerId) {
  return service
    .get(`/trainers/clients/` + trainerId)
    .then((response) => response.data)
    .catch((error) => {
      console.error("Error fetching clients:", error.response.data.message);
      return [];
    });
}