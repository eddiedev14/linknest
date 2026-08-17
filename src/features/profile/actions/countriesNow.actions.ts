import { countriesNowApi } from "../api/countriesNow.api";
import type { SelectOption } from "@/shared/components/forms/fields/SelectField";
import type { CitiesResponse, CountriesResponse } from "../types/countriesNow.response.type";
import { normalizeUniqueAndSort } from "../utils/countriesNow.helper";

const citiesCache = new Map<string, SelectOption[]>();

const getAllCountries = async (): Promise<SelectOption[]> => {
  const response = await countriesNowApi.get<CountriesResponse>("/positions");

  return response.data.data.map((country) => ({
    label: country.name,
    value: country.name,
  }));
};

const getCitiesFromCountry = async (country: string): Promise<SelectOption[]> => {
  //* Cache implementation
  if (citiesCache.has(country)) {
    return citiesCache.get(country)!;
  }

  const response = await countriesNowApi.post<CitiesResponse>("/cities", { country });
  const normalizedData = normalizeUniqueAndSort(response.data.data);
  const citiesOptions: SelectOption[] = normalizedData.map((city) => ({
    label: city,
    value: city,
  }));

  citiesCache.set(country, citiesOptions);
  return citiesOptions;
};

export { getAllCountries, getCitiesFromCountry };
