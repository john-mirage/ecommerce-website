import { describe, it, expect } from "vitest";
import { formatLocale, formatOptions, formatCameraPrice } from "@utils/camera-price-formatter";

describe("formatCameraPrice", () => {
  it("should return the camera price in french format", () => {
    const price = 2400;
    const formatter = new Intl.NumberFormat(formatLocale, formatOptions);
    const formattedPrice = formatter.format(price / 100);
    expect(formatCameraPrice(price)).toBe(formattedPrice);
  });
});