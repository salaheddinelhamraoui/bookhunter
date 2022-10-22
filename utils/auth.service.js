const API = "https://bookhunter.com/api/";

export const signUpAPI = async (
  username,
  firstName,
  lastName,
  email,
  password,
  confirmPassword
) => {
  console.log("fetching data");
  const params = {
    username,
    firstName,
    lastName,
    email,
    password,
    confirmPassword,
  };

  try {
    const request = await fetch(`${API}auth/signup`, {
      body: params,
      method: "POST",
    });
    const data = await request.json();
    console.log(data);

    if (data.message.includes("Failed")) {
      return {
        error: true,
        data,
      };
    } else {
      return {
        error: false,
        data,
      };
    }
  } catch (error) {
    return {
      error: true,
      data: null,
    };
  }
};
