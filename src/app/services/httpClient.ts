import axios from 'axios';

export const httpClient = axios.create({
  baseURL: 'https://api.myfinances.app.br',
});

// httpClient.interceptors.response.use(async (data) => {
//   await new Promise((resolve) => setTimeout(resolve, 1000));

//   return data;
// });
