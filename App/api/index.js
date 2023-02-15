import axios from "axios";
import apiUrls from "./apiUrls";

axios.defaults.baseURL = apiUrls.baseUrl;

export const apiPostMethod = (url, data, token) => {
  let headers = {
    "Content-Type": "multipart/form-data",
    Accept: "application/json",
  };
  if (token) headers.authorization = "Bearer " + token;
  return axios({
    url,
    method: "POST",
    data,
    headers,
  });
};

export const apiGetMethod = (url, token) => {
  let headers = {
    "Content-Type": "multipart/form-data",
    Accept: "application/json",
  };
  if (token) headers.authorization = "Bearer " + token;
  return axios({
    url,
    method: "GET",
    headers,
  });
};
