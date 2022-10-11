import _ from "lodash";
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

export const sortVendorsBuy = (vendors) => {
  let greaterThanZero;
  let equalZero;
  const sortedArr = _.sortBy(vendors, (obj) =>
    parseFloat(obj.price.replace("$", ""))
  );

  equalZero = sortedArr.filter(
    (item) => parseFloat(item.price.replace("$", "")) === 0
  );

  greaterThanZero = sortedArr.filter(
    (item) => parseFloat(item.price.replace("$", "")) > 0
  );

  return [...greaterThanZero, ...equalZero];
};
