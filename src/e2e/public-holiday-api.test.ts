import * as request from "supertest";
import { PUBLIC_HOLIDAYS_API_URL, SUPPORTED_COUNTRIES } from "../config";
import { PublicHoliday } from "../types";

const mockedData: PublicHoliday = {
  date: expect.any(String),
  localName: expect.any(String),
  name: expect.any(String),
  countryCode: expect.any(String),
  fixed: expect.any(Boolean),
  global: expect.any(Boolean),
  types: expect.any(Array),
  launchYear: null,
  counties: null,
};

const setValue = (holiday: PublicHoliday): void => {
  if (holiday.launchYear === null) {
    mockedData.launchYear = null;
  } else {
    mockedData.launchYear = expect.any(Number);
  }

  if (holiday.counties === null) {
    mockedData.counties = null;
  } else {
    mockedData.counties = expect.any(Array);
  }
};

describe("Public Holidays API", () => {
  test("should return 200 and list of public holidays", async () => {
    const year = 2024;
    const country = SUPPORTED_COUNTRIES[0];
    const { status, body } = await request(PUBLIC_HOLIDAYS_API_URL).get(
      `/PublicHolidays/${year}/${country}`
    );

    body.forEach((holiday: PublicHoliday) => {
      setValue(holiday);

      expect(status).toEqual(200);
      expect(holiday).toEqual(mockedData);
    });
  });

  test("should return 200 and list of next public holidays", async () => {
    const country = SUPPORTED_COUNTRIES[0];
    const { status, body } = await request(PUBLIC_HOLIDAYS_API_URL).get(
      `/NextPublicHolidays/${country}`
    );

    body.forEach((holiday: PublicHoliday) => {
      setValue(holiday);

      expect(status).toEqual(200);
      expect(holiday).toEqual(mockedData);
    });
  });
});
