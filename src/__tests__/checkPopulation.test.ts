const axios = require("axios");

jest.mock("axios");

import { checkPopulation } from "../checkPopulation";
import { fetchData } from "../fetchData";
import { ICountry } from "../fetchData";
import { mockPopulation } from "../__mock__/mockPopulation";

axios.get.mockResolvedValue(mockPopulation);

test("checkPopulation", async () => {
  const data = await fetchData();

  expect(checkPopulation(data)).toBeFalsy();
});
