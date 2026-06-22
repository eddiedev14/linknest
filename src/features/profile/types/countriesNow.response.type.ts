export interface CountriesResponse {
  error: boolean;
  msg: string;
  data: Datum[];
}

export interface Datum {
  name: string;
  iso2: string;
  long: number | string;
  lat: number | string;
}

export interface CitiesResponse {
  error: boolean;
  msg: string;
  data: string[];
}
