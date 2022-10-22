import axios from "axios";

const API = "https://bookhunter.com/api/";

export const signUpAPI = (username, firstName, lastName, email, password) => {
  console.log({
    username,
    firstName,
    lastName,
    email,
    password,
  });

  return axios.post(`${API}auth/signup`, {
    username,
    firstName,
    lastName,
    email,
    password,
  });

  // try {
  //   const request = await fetch(`${API}auth/signup`, {
  //     body: {
  //       firstName,
  //       username: username.toLowerCase(),
  //       lastName,
  //       email,
  //       password,
  //     },
  //     method: "POST",
  //   });
  //   const data = await request.json();
  //   console.log(data);

  //   if (data.message.includes("Failed")) {
  //     return {
  //       error: true,
  //       data,
  //     };
  //   } else {
  //     return {
  //       error: false,
  //       data,
  //     };
  //   }
  // } catch (error) {
  //   return {
  //     error: true,
  //     data: null,
  //   };
  // }
};
