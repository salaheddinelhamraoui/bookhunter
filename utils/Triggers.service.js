import axios from "axios";

const API = "https://bookhunter.com/api/";
//TRIGGERS SET
export const getTriggersSet = (userId) => {
  return axios.get(`${API}getTriggersSet/${userId}`);
};

export const getTriggerSet = (triggerSetId) => {
  return axios.get(`${API}getTriggerSet/${triggerSetId}`);
};

export const addTriggersSet = (userId) => {
  return axios.put(`${API}setTriggersSet/${userId}`);
};

export const deleteTriggerSet = (triggerSetId) => {
  return axios.delete(`${API}deleteTriggerSet/${triggerSetId}`);
};

export const updateTriggerSet = (userId, triggerSet) => {
  return axios.put(`${API}setTriggersSet/${userId}`, { ...triggerSet });
};

//TRIGGERS
export const getTriggers = (triggerSetId) => {
  return axios.get(`${API}getTriggers/${triggerSetId}`);
};

export const addTrigger = (userId, triggerId) => {
  const triggerData = {
    minTracker: "-",
    maxTracker: "-",
    minRank: "-",
    maxRank: "-",
    minAveRank: "-",
    maxAveRank: "-",
    FBASlot: "Skip",
    usedSlot: "Highest",
    BBCompare: "Yes",
    offAmazon: "10",
    targetProfit: "5",
    alwaysReject: "No",
    idCard: triggerId,
  };
  return axios.post(`${API}setTriggers/${userId}`, { ...triggerData });
};

export const updateTriggerById = (triggerId, triggerData) => {
  return axios.put(`${API}updateTrigger/${triggerId}`, { ...triggerData });
};

export const deleteTriggerById = (triggerId) => {
  return axios.delete(`${API}deleteTrigger/${triggerId}`);
};
