import { ICountry } from "./fetchData";

export function checkPopulation(countries: Array<ICountry>): boolean {
  countries.pop();
  //console.log("countries", countries);
  const populationArray: Array<number> = countries.map(
    (el: ICountry): number => el.population
  );
  // console.log("checkPopulation", populationArray);
  // console.log(
  //   populationArray.reduce((a: number, b: number): number => a + b, 0) >
  //     500000000
  // );
  console.log(
    populationArray.reduce((a: number, b: number): number => a + b, 0) >
      500000000
  );

  return (
    populationArray.reduce((a: number, b: number): number => a + b, 0) >
    500000000
  );
}
