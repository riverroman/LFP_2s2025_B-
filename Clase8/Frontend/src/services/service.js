// services/service.js
import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:4000",
  headers: {
    "Content-Type": "application/json",
  },
});

export const apiService = {
  analyzer: (code) => API.post("/analizar", { code }),
};