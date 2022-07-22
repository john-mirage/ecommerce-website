import currencyFormatter from "@utils/currency-formatter";
import { describe, it, expect } from "vitest";

describe("currencyFormatter", () => {
  it("should be an instance of Intl.NumberFormat", () => {
    expect(currencyFormatter).toBeInstanceOf(Intl.NumberFormat);
  });
});