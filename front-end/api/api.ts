import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3333", // seu back-end
  headers: { "Content-Type": "application/json" }
});

export default api;
