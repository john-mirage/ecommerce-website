import { describe, it, expect } from "vitest";
import { URLHasId, getUrlPathname } from "@utils/url";

describe("urlHasId", () => {
  it("should return true if the url has an id", () => {
    expect(URLHasId("https://google.fr?id=1")).toBe(true);
  });

  it("should return false if the url has no id", () => {
    expect(URLHasId("https://google.fr")).toBe(false);
  });

  it("should throw an error if the url is not valid", () => {
    expect(() => URLHasId("badURL")).toThrow();
  });
});

describe("getURLWithoutParams", () => {
  it("should return the url with no parameters", () => {
    expect(getUrlPathname("https://google.fr?id=1")).toBe("/");
  });

  it("should return the url with no parameters", () => {
    expect(getUrlPathname("https://google.fr/user?id=1")).toBe("/user");
  });

  it("should return the url with no parameters", () => {
    expect(getUrlPathname("https://google.fr/user/")).toBe("/user");
  });

  it("should throw an error if the url is not valid", () => {
    expect(() => getUrlPathname("badURL")).toThrow();
  });
});