import { ICountry } from "./fetchData";
import { regionalBlocs } from "./fetchData";

interface IAxiosResponse {
  data: ICountry[];
}

export function filterCountries(data: ICountry[] | IAxiosResponse) {
  let dataToFitler: any = data;
  if (dataToFitler["data"] !== undefined) {
    dataToFitler = dataToFitler["data"];
  }

  const filtered = dataToFitler
    .filter(
      (el: ICountry): boolean =>
        el.regionalBlocs !== undefined &&
        el.regionalBlocs.find((findEl: regionalBlocs) =>
          findEl.acronym.includes("EU")
        ) !== undefined
    )
    .filter(
      (el: ICountry): boolean => !el.name.toLocaleLowerCase().includes("a")
    )
    .sort(
      (a: ICountry, b: ICountry): number =>
        a.population / a.area - b.population / b.area
    )
    .reverse();
  // console.log("filtered", filtered);
  return filtered;
}
