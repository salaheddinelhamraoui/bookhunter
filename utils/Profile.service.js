import axios from "axios";

const API = "https://bookhunter.com/api/";

export const getSubscriptionData = async (userId, stripId) => {
  try {
    const req = await axios.get(`${API}subscriptions/${userId}/${stripId}`);
    const data = await req.data;
    return data;
  } catch (error) {
    throw new Error(error);
  }
};
