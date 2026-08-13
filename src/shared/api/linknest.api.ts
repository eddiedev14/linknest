import axios from "axios";

export const linknestApi = axios.create({
  baseURL: "/api",
});
