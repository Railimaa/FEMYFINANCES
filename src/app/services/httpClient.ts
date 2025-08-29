import axios from 'axios';

export const httpClient = axios.create({
  baseURL: 'https://15wyte4cg4.execute-api.us-east-1.amazonaws.com',
});

// httpClient.interceptors.response.use(async (data) => {
//   await new Promise((resolve) => setTimeout(resolve, 1000));

//   return data;
// });
