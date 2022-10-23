import axios from "axios";

const API = "https://bookhunter.com/api/";

export const signUpAPI = (username, firstName, lastName, email, password) => {
  return axios.post(`${API}auth/signup`, {
    username: username,
    firstName: firstName.toLowerCase(),
    lastName: lastName.toLowerCase(),
    email: email,
    password,
  });
};

export const signInAPI = (username, password) => {
  return axios.post(`${API}auth/signin`, {
    username,
    password,
  });
};
