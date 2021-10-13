import { comparison } from "./comparison";
import { filterCountries } from "./filterCountries";
import { checkPopulation } from "./checkPopulation";

import { ICountry } from "./types/types";

const allCountrysKey = "Countries";
export const dataCheckLastTime = "dataCheckLastTime";

export function dataToStorage(data: ICountry[]) {
  const prevData: string | null = localStorage.getItem(allCountrysKey);

  localStorage.setItem(allCountrysKey, JSON.stringify(data));
  localStorage.setItem(dataCheckLastTime, JSON.stringify(new Date().getTime()));

  if (prevData !== null) {
    const arrayPrevData: ICountry[] = JSON.parse(prevData);

    const compareDate = comparison(data, arrayPrevData);
    compareDate.forEach((el: ICountry): void => console.log(el.name));
  }

  console.log("dataToStorage", data);

  const countries: ICountry[] = filterCountries(data);

  if (checkPopulation(countries) === true) {
    console.log(
      "Zsumowana populacja pięciu najgęściej zaludnionych państw uzyskanych z wcześniejszych operacji jest większa od 500 milionów"
    );
  } else {
    console.log(
      "Zsumowana populacja pięciu najgęściej zaludnionych państw uzyskanych z wcześniejszych operacji nie jest większa od 500 milionów"
    );
  }
}
