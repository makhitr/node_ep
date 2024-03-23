import { SUPPORTED_COUNTRIES } from "../config";
import { validateInput, shortenPublicHoliday } from "../helpers";

const mockHoliday = {
  date: "string",
  localName: "string",
  name: "string",
  countryCode: "string",
  fixed: true,
  global: true,
  counties: null,
  launchYear: null,
  types: [],
};

const mockShortenHoliday = {
  name: "string",
  localName: "string",
  date: "string",
};

describe("test validate input", () => {
  describe("should throw Error", () => {
    test("should throw Error with invalid country", () => {
      const country = "AA";
      expect(() => validateInput({ country })).toThrow(
        new Error(`Country provided is not supported, received: ${country}`)
      );
    });
    test("should throw Error with invalid year", () => {
      const year = 1999;
      expect(() => validateInput({ year })).toThrow(
        new Error(`Year provided not the current, received: ${year}`)
      );
    });
  });
  describe("should pass validation", () => {
    const country = SUPPORTED_COUNTRIES[0];
    const year = 2024;
    test("should pass validation when country is valid", () => {
      expect(validateInput({ country })).toBeTruthy();
    });
    test("should pass validation when year is valid", () => {
      expect(validateInput({ year })).toBeTruthy();
    });
    test("should pass validation when country and year is valid", () => {
      expect(validateInput({ country, year })).toBeTruthy();
    });
  });
});

describe("test shortenPublicHoliday", () => {
  test("should return shorten holiday", () => {
    expect(shortenPublicHoliday(mockHoliday)).toEqual(mockShortenHoliday);
  });
});
