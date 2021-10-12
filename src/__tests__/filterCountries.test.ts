const axios = require("axios");

jest.mock("axios");

import { fetchData } from "../fetchData";
import { filterCountries } from "../filterCountries";
import { mockValues } from "../__mock__/mock";

interface regionalBlocs {
  acronym: string;
}

interface ICountry {
  name: string;
  population: number;
  acronym: string;
  regionalBlocs: Array<regionalBlocs>;
  area: number;
}

axios.get.mockResolvedValue({ data: mockValues });

describe("filterCountries", () => {
  test("countries", async () => {
    const data: any = await fetchData();

    const dataAfterFilter = filterCountries(data);
    expect(dataAfterFilter.length).toBeLessThan(data.data.length);
    // expect(dataAfterFilter.every((el) => el.regionalBlocs)).toBeTruthy();
    // expect(
    //   dataAfterFilter.every((el) =>
    //     el.regionalBlocs.every(
    //       (elEvery: regionalBlocs) =>
    //         elEvery.acronym.toLocaleLowerCase().indexOf("a") !== -1
    //     )
    //   )
    // ).toBeTruthy();
    // expect(axios.get).toHaveBeenCalledTimes(1);
    // expect(axios.get).toHaveBeenCalledWith("https://restcountries.com/v2/all");
  });
});
