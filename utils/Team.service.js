import axios from "axios";
const API = "https://bookhunter.com/api/";

export const addMember = async (userId, member) => {
  try {
    const req = await axios.post(`${API}member/addMember/${userId}`, {
      ...member,
    });
    const message = req.data;
    return message;
  } catch (error) {
    console.log(JSON.stringify(error));
    throw Error(error);
  }
};

export const getMembers = async (userId) => {
  try {
    const req = await axios.get(`${API}member/getMembers/${userId}`);
    const data = req.data;
    return data;
  } catch (error) {
    console.log(JSON.stringify(error));
    throw Error(error);
  }
};
