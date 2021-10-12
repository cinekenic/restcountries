import axios from "axios";
const urlApi = "https://restcountries.com/v2/all";

export interface regionalBlocs {
  acronym: string;
}

export interface ICountry {
  name: string;
  population: number;
  regionalBlocs: Array<regionalBlocs>;
  area: number;
}

export async function fetchData(): Promise<ICountry[]> {
  //: [] | string
  const response: ICountry[] = await axios.get(urlApi);

  // @ts-ignore
  return response;
}
