import axios from 'axios'

const apiService = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    'x-rapidapi-host': import.meta.env.VITE_RAPIDAPI_HOST,
    'x-rapidapi-key': import.meta.env.VITE_RAPIDAPI_KEY,
  }
})

export function getRapidApi(){
  return apiService.get('/exercises')
    .then(res => {
      console.log("This is rsponse from api.service file", res.data);
      return res.data
      
    })
    .catch(err => console.error("Error while fetching in api.service file", err) )
}