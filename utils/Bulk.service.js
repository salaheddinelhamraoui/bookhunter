import axios from "axios";

const API = "https://bookhunter.com/api/";

export const getRestrictedById = (id) => {
  console.log("getRestrictedById()");
  return axios.get(`${API}getRestrictedById/${id}`);
};

export const searchLimit = (userId, feature, cost, plan) => {
  return axios.post(`${API}searchLimit/`, { userId, feature, cost, plan });
};

export const bulkHunt = (isbns) => {
  console.log("bulkHunt()");
  return axios.post(`${API}bulkHunt/`, { isbns });
};
