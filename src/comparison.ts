import { ICountry } from "./types/types";

export function comparison(
  newData: ICountry[],
  prevnewData: ICountry[]
): Array<ICountry> {
  console.log(newData);
  // console.log("comparison", newData);
  return newData.filter((el: ICountry) => {
    const prevCountrynewData = prevnewData.find(
      (prevEl: ICountry) => prevEl.name === el.name
    )!;
    // console.log(el.population);
    // console.log(prevCountrynewData);
    // console.log(el.population !== prevCountrynewData.population);
    return el.population !== prevCountrynewData.population;
  });
}
