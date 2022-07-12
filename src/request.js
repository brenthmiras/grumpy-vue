import axios from 'axios';

const BASE_URL = 'https://api.thecatapi.com/v1/';
const API_KEY = '019b8f6a-f5fb-4584-8d10-51467cbaf26e';

/* 
  Configure an axios instance with preconfigured base url
  and the api-key which is sent on every request
*/
const instance = axios.create({
  baseURL: BASE_URL,
  headers: {'x-api-key': API_KEY}
});

export default instance;
