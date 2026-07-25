import axios from "axios";

export const countriesNowApi = axios.create({
  baseURL: "https://countriesnow.space/api/v0.1/countries",
});
