import type { SelectOption } from "@/shared/components/forms/FormField";
import type { CitiesResponse, CountriesResponse } from "../types/countriesNow.response.type";

const citiesCache = new Map<string, SelectOption[]>();

const getAllCountries = async (): Promise<SelectOption[]> => {
  const res = await fetch("https://countriesnow.space/api/v0.1/countries/positions");
  const data: CountriesResponse = await res.json();
  return data.data.map((country) => ({
    label: country.name,
    value: country.name,
  }));
};

const getCitiesFromCountry = async (country: string): Promise<SelectOption[]> => {
  if (citiesCache.has(country)) {
    return citiesCache.get(country)!;
  }

  const res = await fetch("https://countriesnow.space/api/v0.1/countries/cities", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ country }),
  });

  const data: CitiesResponse = await res.json();
  const citiesOptions: SelectOption[] = data.data.map((city) => ({
    label: city,
    value: city,
  }));

  citiesCache.set(country, citiesOptions);
  return citiesOptions;
};

export { getAllCountries, getCitiesFromCountry };
