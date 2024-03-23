import axios from "axios";
import {
  getListOfPublicHolidays,
  checkIfTodayIsPublicHoliday,
  getNextPublicHolidays,
} from "../services/public-holidays.service";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("test public holiday service", () => {
  const year = 2024;
  const country = "GB";
  const publicHolidays = [
    {
      name: "New Year's Day",
      date: "2023-01-01",
    },
    {
      name: "Good Friday",
      date: "2024-03-29",
    },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("should return a list of public holidays", async () => {
    mockedAxios.get.mockResolvedValueOnce({ data: publicHolidays });
    const result = await getListOfPublicHolidays(year, country);

    expect(result).toEqual(publicHolidays);
  });
  test("should return an empty array when an error occurs during API call", async () => {
    mockedAxios.get.mockRejectedValueOnce(Error);
    const result = await getListOfPublicHolidays(year, country);

    expect(result).toEqual([]);
  });

  test("should return true if today is a public holiday", async () => {
    mockedAxios.get.mockResolvedValueOnce({ status: 200 });
    const result = await checkIfTodayIsPublicHoliday(country);

    expect(result).toBe(true);
  });
  test("should return false if today is NOT a public holiday", async () => {
    mockedAxios.get.mockRejectedValueOnce(Error);
    const result = await checkIfTodayIsPublicHoliday(country);

    expect(result).not.toBe(true);
  });

  test("should return a list of next public holiday", async ()=> {
    mockedAxios.get.mockResolvedValueOnce({ data: publicHolidays });
    const result = await getNextPublicHolidays(country);

    expect(result).toEqual(publicHolidays);
  })
  test("should return an empty array when an error occurs during API call", async () => {
    mockedAxios.get.mockRejectedValueOnce(Error);
    const result = await getNextPublicHolidays(country);

    expect(result).toEqual([]);
  });
});
