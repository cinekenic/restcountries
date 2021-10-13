import { ICountry } from "./fetchData";

export function comparison(
  data: ICountry[],
  prevData: ICountry[]
): Array<ICountry> {
  console.log(data);
  // console.log("comparison", data);
  return data.filter((el: ICountry) => {
    const prevCountryData = prevData.find(
      (prevEl: ICountry) => prevEl.name === el.name
    )!;
    // console.log(el.population);
    // console.log(prevCountryData);
    // console.log(el.population !== prevCountryData.population);
    return el.population !== prevCountryData.population;
  });
}
