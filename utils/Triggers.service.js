import axios from "axios";

const API = "https://bookhunter.com/api/";

export const getTriggersSet = (id) => {
  return axios.get(`${API}getTriggersSet/${id}`);
};

export const addTriggersSet = (id) => {
  return axios.put(`${API}setTriggersSet/${id}`);
};

export const deleteTriggerSet = (id) => {
  return axios.delete(`${API}deleteTriggerSet/${id}`);
};

export const updateTriggerSet = (id, trigger) => {
  console.log(trigger);
  return axios.put(`${API}setTriggersSet/${id}`, { ...trigger });
};
