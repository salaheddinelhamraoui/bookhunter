import axios from "axios";

const API = "https://bookhunter.com/api/";

export const getRestrictedById = (id) => {
  return axios.get(`${API}getRestrictedById/${id}`);
};

export const searchLimit = (userId, feature, cost, plan) => {
  return axios.post(`${API}searchLimit/`, { userId, feature, cost, plan });
};

export const bookSearch = (isbn, type) => {
  return axios.post(`${API}bookSearch/`, { isbn, type });
};

export const triggersScanResult = (isbn, type) => {
  return axios.post(`${API}triggersResult/`, { isbn });
};

export const bulkHunt = (isbns) => {
  return axios.post(`${API}bulkHunt/`, { isbns });
};

export const addRecentlySearched = (isbn, cover, vendors) => {
  return axios.put(`${API}addRecentlySearched/`, { isbn, cover, vendors });
};
