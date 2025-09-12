import axios from "axios"

const service = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_BASE_URL,
});

export function createClient(body) {
  return service
    .post("/clients", body)
    .then(res => res.data)
    .catch(err => console.error("Error while creating client in service: ", err)
    )
}

export function getClients(trainerId){
  return service
    .get("/trainers/clients/" + trainerId)
    .then(res => {
      console.log("this is the response from database: ", res);
      
      res.data
    })
    .catch(err => {
        console.log("Error fetching clients at client.service:", err.response.data.message)
        return [];
      }
    )
}