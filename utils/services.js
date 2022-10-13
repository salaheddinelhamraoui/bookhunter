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

export const sortVendorsSell = (vendors) => {
  const sortedArr = _.sortBy(vendors, (obj) =>
    parseFloat(obj.price.replace("$", ""))
  );

  return sortedArr.reverse();
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

export const sortRent = (vendors) => {
  const items = [];
  try {
    vendors.map((vendor) => {
      const { duration } = vendor;
      const itemIndex = items.findIndex((item) => item.duration === duration);
      if (itemIndex === -1) {
        items.push({ duration, vendors: [vendor] });
      } else {
        items[itemIndex] = {
          duration,
          vendors: [...items[itemIndex].vendors, vendor],
        };
      }
    });
  } catch (error) {
    console.log(error);
  }

  const sortedItems = sortByDuration(items);
  const itemDurationDefined = sortedItems.filter(
    (item) => item.duration !== undefined
  );
  const itemDurationUnDefined = sortedItems.filter(
    (item) => item.duration === undefined
  );

  return [...itemDurationDefined, ...itemDurationUnDefined];
};

const sortByDuration = (data) => {
  return _.sortBy(data, (o) => o.duration).reverse();
};
