import axios from "axios";

// Vite env variable
const BASE_URL = import.meta.env.VITE_API_URL || "https://medcity-backend-t66f.onrender.com";

const API = axios.create({
  baseURL: "https://medcity-backend-t66f.onrender.com",
});

export default API;
