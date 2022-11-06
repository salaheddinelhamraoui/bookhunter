import axios from "axios";

const API = "https://bookhunter.com/api/";

export const getSubscriptionData = async (userId, strapiId) => {
  try {
    const user = await getUserData(userId);
    const strapi = await getStrapiSubscription(userId, strapiId);
    const req = await axios.get(`${API}user/getQuantity/${userId}`);
    const subscription = await req.data;
    return { subscription, user, strapi };
  } catch (error) {
    throw new Error(error);
  }
};

export const getQuantity = async (userId) => {
  try {
    const req = await axios.get(`${API}user/getQuantity/${userId}`);
    const data = await req.data;
    return data;
  } catch (error) {
    throw new Error(error);
  }
};

export const getStrapiSubscription = async (userId, strapiId) => {
  try {
    const req = await axios.get(`${API}subscriptions/${userId}/${strapiId}`);
    const data = await req.data;
    return { ...data };
  } catch (error) {
    throw new Error(error);
  }
};

export const getUserData = async (userId) => {
  try {
    const req = await axios.get(`${API}user/getUser/${userId}`);
    const data = await req.data;
    return data;
  } catch (error) {
    throw new Error(error);
  }
};
