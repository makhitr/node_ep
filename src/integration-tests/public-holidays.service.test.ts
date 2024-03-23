import {
  getListOfPublicHolidays,
  getNextPublicHolidays,
} from "../services/public-holidays.service";

describe("test public holiday service", () => {
  const year = 2024;
  const country = "GB";

  test("should return list of public holidays", async () => {
    const result = await getListOfPublicHolidays(year, country);
    expect(result[0]).not.toBeUndefined();
  });

  test("should return list of next public holidays", async () => {
    const result = await getNextPublicHolidays(country);
    expect(result[0]).not.toBeUndefined();
  });
});
