import _ from "lodash";
const API = "https://bookhunter.com/api/";

export const getISBNResult = async (isbn, type) => {
  const isbn13ToIsbn10 = verifyIfISBNLong(isbn);
  const request = await fetch(`${API}bookSearch/`, {
    body: JSON.stringify({
      isbn: isbn13ToIsbn10,
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

const verifyIfISBNLong = (isbn) => {
  if (isbn.length >= 13) {
    return convISBN13toISBN10(isbn);
  } else return isbn;
};

function convISBN13toISBN10(str) {
  var s;
  var c;
  var checkDigit = 0;
  var result = "";

  s = str.substring(3, str.length);
  for (let i = 10; i > 1; i--) {
    c = s.charAt(10 - i);
    checkDigit += (c - 0) * i;
    result += c;
  }
  checkDigit = (11 - (checkDigit % 11)) % 11;
  result += checkDigit == 10 ? "X" : checkDigit + "";
  console.log(result);
  return result;
}
