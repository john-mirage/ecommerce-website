import { describe, expect, it } from "vitest";
import { Cart } from "@utils/cart";

describe("Cart constructor", () => {
  it("should have cart property untouched if the localstorage cart is valid", () => {
    localStorage.setItem("orinoco-cart", '[{"id":"5be9bc241c9d440000a730e7","number":1},{"id":"5be1ef211c9d44000030b062","number":1}]');
    const cart = new Cart();
    expect(cart.cart).toEqual([
      {
        id: "5be9bc241c9d440000a730e7",
        number: 1
      }, {
        id: "5be1ef211c9d44000030b062",
        number: 1
      }
    ]);
    localStorage.removeItem("orinoco-cart");
  });

  it("should have cart property filtered or empty if the localstorage cart is a partially valid array", () => {
    localStorage.setItem("orinoco-cart", '[{"badKey":"5be9bc241c9d440000a730e7","number":1},{"id":"5be1ef211c9d44000030b062","number":1}]');
    expect(new Cart().cart).toEqual([
      {
        id: "5be1ef211c9d44000030b062",
        number: 1
      }
    ]);
    localStorage.setItem("orinoco-cart", '[{"badKey":"5be9bc241c9d440000a730e7","number":1},{"id":"5be1ef211c9d44000030b062","badKey":1}]');
    expect(new Cart().cart).toEqual([]);
    localStorage.removeItem("orinoco-cart");
  });

  it("should have cart property empty if the localstorage cart is not an object", () => {
    localStorage.setItem("orinoco-cart", '1');
    expect(new Cart().cart).toEqual([]);
    localStorage.setItem("orinoco-cart", '"word"');
    expect(new Cart().cart).toEqual([]);
    localStorage.setItem("orinoco-cart", '{"id":"0000","number":1}');
    expect(new Cart().cart).toEqual([]);
    localStorage.removeItem("orinoco-cart");
  });
});