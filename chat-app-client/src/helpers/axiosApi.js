import axios from "axios";

// apply base url for axios
const API_URL = import.meta.env.VITE_API_URL;
// const API_URL = 'https://932b-2409-40c2-1037-6c9f-b823-c1ec-43e4-4a1c.ngrok-free.app'
console.log(API_URL)
export const axiosApi = axios.create({
  baseURL: API_URL,
});

// Add a request interceptor
axiosApi.interceptors.request.use(
  (config) => {
    console.log(config);
    if (!config.url.includes("login") && !config.url.includes("register")) {
        console.log('hello')
      const token = localStorage.getItem(accessToken);
      if (token) {
        config.headers["Authorization"] = "Bearer " + token;
      }
      config.headers["Content-Type"] = "application/json";
      return config;
    }
  },
  (error) => {
    console.log('hh')
    Promise.reject(error);
  }
);

axiosApi.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error)
);


export async function get(url, config = {}) {
  // eslint-disable-next-line no-return-await
  return axiosApi
    .get(url, { ...config })
    .then((response) => response.data);
}

export async function post(url, data, config = {}) {
  return axiosApi
    .post(url, data, { ...config })
    .then((response) => response.data);
}

export async function postMultipart(
  url,
  data
  // config = {}
) {
  console.log("axios", data);
  return axiosApi
    .post(url, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((response) => response.data);
}

export async function put(url, data, config = {}) {
  return axiosApi
    .put(url, { ...data }, { ...config })
    .then((response) => response.data);
}

export async function del(url, config = {}) {
  // eslint-disable-next-line no-return-await
  return await axiosApi
    .delete(url, { ...config })
    .then((response) => response.data);
}
