import axios from "axios";

const API = "https://bookhunter.com/api/";

export const getTriggersSet = (id) => {
  return axios.get(`${API}getTriggersSet/${id}`);
};
