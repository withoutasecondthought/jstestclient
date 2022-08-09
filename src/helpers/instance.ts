import axios, { AxiosInstance } from 'axios';
import { BASE_URL } from './const';

const instance: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  method: 'GET, POST',
});

export default instance;
