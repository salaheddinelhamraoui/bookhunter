import axios from "axios";

const API = "https://bookhunter.com/api/";

export const getSubscriptionData = async (userId) => {
  const user = await getUserData(userId);
  try {
    const req = await axios.get(`${API}user/getQuantity/${userId}`);
    const data = await req.data;
    return { ...data, ...user };
  } catch (error) {
    throw new Error(error);
  }
};

const getUserData = async (userId) => {
  try {
    const req = await axios.get(`${API}user/getUser/${userId}`);
    const data = await req.data;
    return data;
  } catch (error) {
    throw new Error(error);
  }
};
