const axios = require("axios");
jest.mock("axios");

import { fetchData } from "./fetchData";
import { comparison } from "./comparison";
import { mockPopulation } from "./__mock__/mockPopulation";
import { mockForComparison } from "./__mock__/mockForComparison";
import { mockForComparison2 } from "./__mock__/mockForComparison";

test("compare different data to get true", async () => {
  axios.get.mockResolvedValue(mockPopulation);
  const data = await fetchData();
  expect(comparison(data, mockPopulation)).toBeTruthy();
});
test("compare the identical data to get false", async () => {
  expect(comparison(mockForComparison2, mockForComparison).length > 0).toBe(
    false
  );
});
