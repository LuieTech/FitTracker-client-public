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
    .then(res => res.data)
    .catch(err => console.error("Error while fetching in api.service file", err.response?.data?.message || err.message) )
}

export function getRapidApiImages(exerciseId) {
  return apiService.get(`/image?resolution=1080&exerciseId=${exerciseId}`, {
    responseType: "blob", // important: tells axios to return raw binary data
  })
  .then(res => {
    const imageUrl = URL.createObjectURL(res.data); // create a local object URL for <img src>
    return imageUrl;
  })
  .catch(err => {
    console.error(
      "Error while retrieving images at rapidAPI service file",
      err.response?.data?.message || err.message
    );
  });
}
