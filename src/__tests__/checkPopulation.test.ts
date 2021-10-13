const axios = require("axios");

jest.mock("axios");

import { checkPopulation } from "../checkPopulation";
import { fetchData } from "../fetchData";
import { ICountry } from "../fetchData";
import { mockPopulation } from "../__mock__/mockPopulation";
import { mockValues } from "../__mock__/mock";

test("returns fals because the values ​​passed are less than 500000000", async () => {
  axios.get.mockResolvedValue(mockPopulation);
  const data = await fetchData();

  expect(checkPopulation(data)).toBeFalsy();
});

test("returns true because the values ​​passed are greater than 500000000", async () => {
  axios.get.mockResolvedValue(mockValues);
  const data = await fetchData();

  expect(checkPopulation(data)).toBeTruthy();
});
