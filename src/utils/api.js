import axios from "axios";

const api = axios.create({
  baseURL: "https://pear-fantastic-basket-clam.cyclic.cloud/api/v1",
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
