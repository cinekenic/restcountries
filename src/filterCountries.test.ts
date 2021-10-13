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
  });
});

test("reginalBlockEl.acronym should be EU", async () => {
  const data = await fetchData();
  const dataAfterFilter = filterCountries(data);
  expect(
    dataAfterFilter.map((el: ICountry) =>
      el.regionalBlocs.every(
        (reginalBlockEl) => reginalBlockEl.acronym === "EU"
      )
    )
  ).toBeTruthy();
});
test("country names should not have letter a", async () => {
  const data = await fetchData();
  const dataAfterFilter = filterCountries(data);
  expect(
    dataAfterFilter.filter(
      (el: ICountry) => !el.name.toLocaleLowerCase().includes("a")
    )
  ).toBeTruthy();
});
test("first country should be Belgium", async () => {
  const data = await fetchData();
  const dataAfterFilter = filterCountries(data);
  expect(dataAfterFilter[0].name).toEqual("Belgium");
});
test("population density first country should be greater than second country", async () => {
  const data = await fetchData();
  const dataAfterFilter = filterCountries(data);
  expect(
    dataAfterFilter[0].population / dataAfterFilter[0].area
  ).toBeGreaterThan(dataAfterFilter[1].population / dataAfterFilter[1].area);
});

// expect(axios.get).toHaveBeenCalledTimes(1);
// expect(axios.get).toHaveBeenCalledWith("https://restcountries.com/v2/all");
