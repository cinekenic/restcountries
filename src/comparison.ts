import { ICountry } from "./types/types";

export function comparison(
  newData: ICountry[],
  prevnewData: ICountry[]
): Array<ICountry> {
  console.log(newData);

  return newData.filter((el: ICountry) => {
    const prevCountrynewData = prevnewData.find(
      (prevEl: ICountry) => prevEl.name === el.name
    )!;

    return el.population !== prevCountrynewData.population;
  });
}
