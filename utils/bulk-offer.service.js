import axios from "axios";

const BULKOFFER = "https://bookhunter.com/api/";

// send ISBN to backend
const bulkOffer = (isbns) => {
  return axios.post(`${BULKOFFER}bulkOffer/`, { isbns });
};

export default bulkOffer;
