const axios = require("axios");

jest.mock("axios");

import { fetchData } from "./fetchData";
import { filterCountries } from "./filterCountries";
import { mockValues } from "./__mock__/mock";

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
    expect(
      dataAfterFilter.every((el: ICountry) => el.regionalBlocs)
    ).toBeTruthy();
    // expect(
    //   dataAfterFilter.every((el) =>
    //     el.regionalBlocs.every((elEvery: regionalBlocs) =>
    //       elEvery.acronym.indexOf("EU")
    //     )
    //   )
    // ).toBeTruthy();
    // console.log(
    //   dataAfterFilter.map((el: ICountry) =>
    //     el.regionalBlocs.every(
    //       (reginalBlockEl) => reginalBlockEl.acronym === "EU"
    //     )
    //   )
    // );
    // console.log(dataAfterFilter[0]);

    expect(
      dataAfterFilter.map((el: ICountry) =>
        el.regionalBlocs.every(
          (reginalBlockEl) => reginalBlockEl.acronym === "EU"
        )
      )
    ).toBeTruthy();

    expect(
      dataAfterFilter.filter(
        (el: ICountry) => !el.name.toLocaleLowerCase().includes("a")
      )
    ).toBeTruthy();

    expect(dataAfterFilter[0].name).toEqual("Belgium");
    expect(
      dataAfterFilter[0].population / dataAfterFilter[0].area
    ).toBeGreaterThan(dataAfterFilter[1].population / dataAfterFilter[1].area);

    // expect(axios.get).toHaveBeenCalledTimes(1);
    // expect(axios.get).toHaveBeenCalledWith("https://restcountries.com/v2/all");
  });
});
