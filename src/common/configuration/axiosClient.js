import axios from  'axios';
import queryString from 'query-string';

const axiosClient = axios.create({
  timeout: 1000,
  headers: {'Content-type': 'application/json'},
  paramsSerializer: params => queryString.stringify(params)
});


axiosClient.interceptors.response.use((response) => {
  return response;
}, (error) => {
  // Handle errors
  throw error;
});

export default axiosClient;
