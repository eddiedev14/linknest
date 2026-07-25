import axios from "axios";

export const imageKitApi = axios.create({
  baseURL: "/api",
});
