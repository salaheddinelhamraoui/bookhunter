const API = "https://bookhunter.com/api/";

export const getISBNResult = async (isbn, type) => {
  const request = await fetch(`${API}bookSearch/`, {
    body: JSON.stringify({
      isbn,
      type,
    }),
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });
  return request;
};
