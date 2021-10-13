import axios from "axios";
import { ICountry } from "./types/types";
const urlApi = "https://restcountries.com/v2/all";

export async function fetchData(): Promise<ICountry[]> {
  const response: ICountry[] = await axios.get(urlApi);

  return response;
}
