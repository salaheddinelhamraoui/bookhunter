import axios from "axios";

const DATABACKUP_API = "https://bookhunter.com/api/";

// send ISBN to backend
const AddDataBackUp = (
  isbn,
  Title,
  Author,
  ISBN_10,
  ISBN_13,
  Published_date,
  Publisher,
  Image,
  Graph,
  SalesRank,
  AmazonVendors,
  MinAmazonPrice,
  Vendors,
  ebayNew,
  ebayUsed,
  tracker,
  profitFBA,
  amazonPrice,
  buyBox,
  usedObject,
  newObject,
  weight,
  fba,
  storage,
  avg30,
  avg90,
  avg180
) => {
  return axios.put(`${DATABACKUP_API}AddDataBackUp/`, {
    isbn,
    Title,
    Author,
    ISBN_10,
    ISBN_13,
    Published_date,
    Publisher,
    Image,
    Graph,
    SalesRank,
    AmazonVendors,
    MinAmazonPrice,
    Vendors,
    ebayNew,
    ebayUsed,
    tracker,
    profitFBA,
    amazonPrice,
    buyBox,
    usedObject,
    newObject,
    weight,
    fba,
    storage,
    avg30,
    avg90,
    avg180,
  });
};

const AddDataBackUpHunt = (
  isbn10,
  isbn13,
  salesRank,
  ebayNew,
  ebayUsed,
  tracker,
  profitFBA,
  amazonPrice,
  buyBox,
  usedObject,
  newObject,
  graph,
  title,
  datePublished,
  publisher,
  bookCover,
  author,
  weight,
  fba,
  storage,
  avg30,
  avg90,
  avg180,
  vendors
) => {
  return axios.put(`${DATABACKUP_API}AddDataBackUpHunt/`, {
    isbn10,
    isbn13,
    salesRank,
    ebayNew,
    ebayUsed,
    tracker,
    profitFBA,
    amazonPrice,
    buyBox,
    usedObject,
    newObject,
    graph,
    title,
    datePublished,
    publisher,
    bookCover,
    author,
    weight,
    fba,
    storage,
    avg30,
    avg90,
    avg180,
    vendors,
  });
};

const AddDataBackUpBulkHunt1 = (
  isbn10,
  isbn13,
  salesRank,
  tracker,
  profitFBA,
  title,
  avg,
  Vendors,
  Shipping
) => {
  return axios.put(`${DATABACKUP_API}AddDataBackUpBulkHunt1/`, {
    isbn10,
    isbn13,
    salesRank,
    tracker,
    profitFBA,
    title,
    avg,
    Vendors,
    Shipping,
  });
};

const AddDataBackUpBulkHunt2 = (
  isbn13,
  tracker,
  buyBox,
  usedObject,
  newObject,
  weight,
  fba,
  storageFees,
) => {
  return axios.put(`${DATABACKUP_API}AddDataBackUpBulkHunt2/`, {
    isbn13,
    tracker,
    buyBox,
    usedObject,
    newObject,
    weight,
    fba,
    storageFees,
  });
};

const AddDataBackUpBulkHunt3 = (
  isbn13,
  tracker,
  amazonPrice,
) => {
  return axios.put(`${DATABACKUP_API}AddDataBackUpBulkHunt3/`, {
    isbn13,
    tracker,
    amazonPrice,
  });
};



const AddSellVendors = (isbn, Vendors) => {
  return axios.put(`${DATABACKUP_API}AddSellVendors/`, { isbn, Vendors });
};

const AddBuyVendors = (isbn, Vendors) => {
  return axios.put(`${DATABACKUP_API}AddBuyVendors/`, { isbn, Vendors });
};

const AddRentVendors = (isbn, Vendors) => {
  return axios.put(`${DATABACKUP_API}AddRentVendors/`, { isbn, Vendors });
};

const GetDataBackUp = (isbn) => {
  return axios.post(`${DATABACKUP_API}GetDataBackup/`, { isbn });
};
// const getAllRestricted = () => {
//   return axios.get(`${DATABACKUP_API}getAllRestricted/`,{});
// };
// const updateRestrictedById = (id,status) => {
//   return axios.get(`${DATABACKUP_API}updateRestrictedById/${id}/${status}`);
// };
// };
// const deleteRestrictedById = (id) => {
//   return axios.get(`${DATABACKUP_API}deleteRestrictedById/${id}/`);
// };

// const addRestrictedWithStatus = (id,status) => {
//   return axios.put(`${DATABACKUP_API}addRestrictedWithStatus/`,{id,status});
// };

// const bulkAddRestrictedWithStatus = (array) => {
//   return axios.put(`${DATABACKUP_API}bulkAddRestrictedWithStatus/`,{array});
// };

export default {
  AddDataBackUp,
  AddSellVendors,
  AddBuyVendors,
  AddRentVendors,
  GetDataBackUp,
  AddDataBackUpHunt,
  AddDataBackUpBulkHunt1,
  AddDataBackUpBulkHunt2,
  AddDataBackUpBulkHunt3,
  //   getAllRestricted,
  //   updateRestrictedById,
  //   deleteRestrictedById,
  //   addRestrictedWithStatus,
  //   bulkAddRestrictedWithStatus
};
