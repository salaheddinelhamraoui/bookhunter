import axios from "axios";

const API = "https://bookhunter.com/api/";

export const getRestrictedById = (id) => {
  return axios.get(`${API}getRestrictedById/${id}`);
};

export const searchLimit = (userId, feature, cost, plan) => {
  return axios.post(`${API}searchLimit/`, { userId, feature, cost, plan });
};

const bookSearch = (isbn, type) => {
  console.log("Search Book");
  return axios.post(`${API}bookSearch/`, { isbn, type });
};

export const bulkHunt = (isbns) => {
  return axios.post(`${API}bulkHunt/`, { isbns });
};
