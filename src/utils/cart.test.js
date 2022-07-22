import { describe, expect, it } from "vitest";
import {
  getLocalStorageItem,
  updateLocalStorageItem,
  validateLocalStorageCart,
  getCartItemCount,
  addCartItem
} from "@utils/cart";

const LOCAL_STORAGE_KEY = "orinoco-cart";

describe("getLocalStorageItem", () => {
  it("should return the json parsed local storage item", () => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify("test"));
    const localStorageCart = getLocalStorageItem(LOCAL_STORAGE_KEY);
    expect(localStorageCart).toBe("test");
    localStorage.removeItem(LOCAL_STORAGE_KEY);
  });
});

describe("updateLocalStorageItem", () => {
  it("should update the local storage item with a new value", () => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify("test"));
    updateLocalStorageItem(LOCAL_STORAGE_KEY, "newValue");
    const localStorageCart = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    expect(localStorageCart).toBe("newValue");
    localStorage.removeItem(LOCAL_STORAGE_KEY);
  });
});

describe("validateLocalStorageCart", () => {
  it("should return a valid cart when the local storage cart is valid", () => {
    const cartToTest = [
      {
        id: 1,
        number: 1,
        variant: "blue"
      },
      {
        id: 2,
        number: 2,
        variant: "red"
      },
    ];
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(cartToTest));
    const validCart = validateLocalStorageCart(cartToTest);
    expect(validCart).toEqual(cartToTest);
    localStorage.removeItem(LOCAL_STORAGE_KEY);
  });

  it("should return a filtered cart when the local storage cart is an array of partially valid objects", () => {
    const cartWithBadKeys = [
      {
        badKey: 1,
        number: 1,
        variant: "blue"
      },
      {
        id: 2,
        number: 2,
        variant: "red"
      },
    ];
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(cartWithBadKeys));
    expect(validateLocalStorageCart(cartWithBadKeys)).toEqual([cartWithBadKeys[1]]);
    const cartWithBadValueTypes = [
      {
        id: "string instead of number",
        number: 1,
        variant: "blue"
      },
      {
        id: 2,
        number: 2,
        variant: "red"
      },
    ];
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(cartWithBadValueTypes));
    expect(validateLocalStorageCart(cartWithBadValueTypes)).toEqual([cartWithBadValueTypes[1]]);
    localStorage.removeItem(LOCAL_STORAGE_KEY);
  });

  it("should return a empty cart when the local storage cart is NOT an array of valid objects", () => {
    const cartWithNotValidObjects = [
      {
        badKey: 1,
        number: 1,
        variant: "blue"
      },
      {
        id: 2,
        number: 2,
        badKey: "red"
      },
    ];
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(cartWithNotValidObjects));
    expect(validateLocalStorageCart(cartWithNotValidObjects)).toEqual([]);
    const cartWithStrings = [
      "not an object",
      "not an object"
    ];
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(cartWithStrings));
    expect(validateLocalStorageCart(cartWithStrings)).toEqual([]);
    localStorage.removeItem(LOCAL_STORAGE_KEY);
  });

  it("should return a empty cart when the local storage cart is not an array", () => {
    const cartToTest = "not an array";
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(cartToTest));
    const validCart = validateLocalStorageCart(cartToTest);
    expect(validCart).toEqual([]);
    localStorage.removeItem(LOCAL_STORAGE_KEY);
  });
});

describe("getCartItemCount", () => {
  it("should return the cart item count if the cart array is valid", () => {
    const cart = [
      { number: 2 },
      { number: 1 },
      { number: 3 },
    ];
    const cartItemCount = getCartItemCount(cart);
    expect(cartItemCount).toBe(6);
  });

  it("should return 0 if the cart array is empty", () => {
    const cart = [];
    const cartItemCount = getCartItemCount(cart);
    expect(cartItemCount).toBe(0);
  });

  it("should throw an error if the cart is not an array", () => {
    const cart = "not an array";
    expect(() => getCartItemCount(cart)).toThrow("the cart is not an array");
  });

  it("should throw an error if the cart is not a valid array", () => {
    const cart = [
      {id: 1},
      {number: 2},
    ];
    expect(() => getCartItemCount(cart)).toThrow("the cart is not a valid array");
  });
});

describe("addCartItem", () => {
  it("should return the cart with the new item if the cart array is valid and the item doesnt exist", () => {
    const cart = [
      {
        id: 1,
        number: 2,
        variant: "red",
      },
      {
        id: 2,
        number: 2,
        variant: "blue",
      },
    ];
    const itemToAdd = {
      id: 3,
      variant: "green",
    }
    const newCart = addCartItem(cart, itemToAdd);
    expect(newCart).toEqual([
      {
        id: 1,
        number: 2,
        variant: "red",
      },
      {
        id: 2,
        number: 2,
        variant: "blue",
      },
      {
        id: 3,
        number: 1,
        variant: "green",
      }
    ]);
  });

  it("should return the cart with the new item if the cart array is valid and the item exist", () => {
    const cart = [
      {
        id: 1,
        number: 2,
        variant: "red",
      },
      {
        id: 2,
        number: 2,
        variant: "blue",
      },
    ];
    const itemToAdd = {
      id: 2,
      variant: "blue",
    }
    const newCart = addCartItem(cart, itemToAdd);
    expect(newCart).toEqual([
      {
        id: 1,
        number: 2,
        variant: "red",
      },
      {
        id: 2,
        number: 3,
        variant: "blue",
      }
    ]);
  });

  it("should return the cart with the new item if the cart array is empty", () => {
    const cart = [];
    const itemToAdd = {
      id: 2,
      variant: "blue",
    }
    const newCart = addCartItem(cart, itemToAdd);
    expect(newCart).toEqual([
      {
        id: 2,
        number: 1,
        variant: "blue",
      }
    ]);
  });
});