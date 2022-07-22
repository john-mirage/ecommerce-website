import { describe, expect, it, vi } from "vitest";
import {
  getLocalStorageItem,
  updateLocalStorageItem,
  validateCart,
  getCartItemCount,
  addCartItem
} from "@utils/cart";

const LOCAL_STORAGE_KEY = "orinoco-cart";

const validateCartMock = vi.fn();
const itemIsValidMock = vi.fn();

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

describe("validateCart", () => {
  it("should return a valid cart when the cart is valid", () => {
    itemIsValidMock.mockImplementation(() => true);
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
    const validCart = validateCart(cartToTest, itemIsValidMock);
    expect(validCart).toEqual(cartToTest);
    expect(itemIsValidMock).toHaveBeenCalledTimes(2);
    expect(itemIsValidMock).toHaveBeenNthCalledWith(1, cartToTest[0]);
    expect(itemIsValidMock).toHaveBeenNthCalledWith(2, cartToTest[1]);
    localStorage.removeItem(LOCAL_STORAGE_KEY);
    itemIsValidMock.mockClear();
  });

  it("should return a filtered cart when the cart is an array of partially valid objects", () => {
    itemIsValidMock.mockImplementationOnce(() => false);
    itemIsValidMock.mockImplementationOnce(() => true);
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
    expect(validateCart(cartWithBadKeys, itemIsValidMock)).toEqual([cartWithBadKeys[1]]);
    expect(itemIsValidMock).toHaveBeenCalledTimes(2);
    expect(itemIsValidMock).toHaveBeenNthCalledWith(1, cartWithBadKeys[0]);
    expect(itemIsValidMock).toHaveBeenNthCalledWith(2, cartWithBadKeys[1]);
    itemIsValidMock.mockClear();
    itemIsValidMock.mockImplementationOnce(() => false);
    itemIsValidMock.mockImplementationOnce(() => true);
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
    expect(validateCart(cartWithBadValueTypes, itemIsValidMock)).toEqual([cartWithBadValueTypes[1]]);
    expect(itemIsValidMock).toHaveBeenCalledTimes(2);
    expect(itemIsValidMock).toHaveBeenNthCalledWith(1, cartWithBadValueTypes[0]);
    expect(itemIsValidMock).toHaveBeenNthCalledWith(2, cartWithBadValueTypes[1]);
    localStorage.removeItem(LOCAL_STORAGE_KEY);
    itemIsValidMock.mockClear();
  });

  it("should return a empty cart when the cart is NOT an array of valid objects", () => {
    itemIsValidMock.mockImplementationOnce(() => false);
    itemIsValidMock.mockImplementationOnce(() => false);
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
    expect(validateCart(cartWithNotValidObjects, itemIsValidMock)).toEqual([]);
    expect(itemIsValidMock).toHaveBeenCalledTimes(2);
    expect(itemIsValidMock).toHaveBeenNthCalledWith(1, cartWithNotValidObjects[0]);
    expect(itemIsValidMock).toHaveBeenNthCalledWith(2, cartWithNotValidObjects[1]);
    itemIsValidMock.mockClear();
    itemIsValidMock.mockImplementationOnce(() => false);
    itemIsValidMock.mockImplementationOnce(() => false);
    const cartWithStrings = [
      "not an object",
      "not an object"
    ];
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(cartWithStrings));
    expect(validateCart(cartWithStrings, itemIsValidMock)).toEqual([]);
    expect(itemIsValidMock).toHaveBeenCalledTimes(2);
    expect(itemIsValidMock).toHaveBeenNthCalledWith(1, cartWithStrings[0]);
    expect(itemIsValidMock).toHaveBeenNthCalledWith(2, cartWithStrings[1]);
    itemIsValidMock.mockClear();
    localStorage.removeItem(LOCAL_STORAGE_KEY);
    itemIsValidMock.mockClear();
  });

  it("should return a empty cart when the cart is a empty array", () => {
    const cartToTest = [];
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(cartToTest));
    const validCart = validateCart(cartToTest, itemIsValidMock);
    expect(validCart).toEqual([]);
    localStorage.removeItem(LOCAL_STORAGE_KEY);
  });

  it("should return a empty cart when the cart is not an array", () => {
    const cartToTest = "not an array";
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(cartToTest));
    const validCart = validateCart(cartToTest, itemIsValidMock);
    expect(validCart).toEqual([]);
    localStorage.removeItem(LOCAL_STORAGE_KEY);
  });
});

describe("getCartItemCount", () => {
  it("should return the cart item count", () => {
    const cart = [
      {
        id: 1,
        number: 2,
        variant: "red",
      },
      {
        id: 2,
        number: 1,
        variant: "blue",
      },
      {
        id: 3,
        number: 3,
        variant: "green",
      },
    ];
    validateCartMock.mockImplementationOnce(() => cart);
    const cartItemCount = getCartItemCount(cart, validateCartMock);
    expect(cartItemCount).toBe(6);
    expect(validateCartMock).toHaveBeenCalledOnce();
    expect(validateCartMock).toHaveBeenNthCalledWith(1, cart);
    validateCartMock.mockClear();
  });

  it("should return 0 if the cart array is empty", () => {
    const cart = [];
    validateCartMock.mockImplementationOnce(() => cart);
    const cartItemCount = getCartItemCount(cart, validateCartMock);
    expect(cartItemCount).toBe(0);
    expect(validateCartMock).toHaveBeenCalledOnce();
    expect(validateCartMock).toHaveBeenNthCalledWith(1, cart);
    validateCartMock.mockClear();
  });
});

describe.only("addCartItem", () => {
  it("should return the cart with the new item if the item doesnt exist", () => {
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
    validateCartMock.mockImplementationOnce(() => cart);
    itemIsValidMock.mockImplementationOnce(() => true);
    const newCart = addCartItem(cart, validateCartMock, itemToAdd, itemIsValidMock);
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
    expect(validateCartMock).toHaveBeenCalledOnce();
    expect(validateCartMock).toHaveBeenNthCalledWith(1, cart);
    expect(itemIsValidMock).toHaveBeenCalledOnce();
    expect(itemIsValidMock).toHaveBeenNthCalledWith(1, itemToAdd);
    validateCartMock.mockClear();
    itemIsValidMock.mockClear();
  });

  it("should return the cart with the new item if the item exist", () => {
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
    validateCartMock.mockImplementationOnce(() => cart);
    itemIsValidMock.mockImplementationOnce(() => true);
    const newCart = addCartItem(cart, validateCartMock, itemToAdd, itemIsValidMock);
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
    expect(validateCartMock).toHaveBeenCalledOnce();
    expect(validateCartMock).toHaveBeenNthCalledWith(1, cart);
    expect(itemIsValidMock).toHaveBeenCalledOnce();
    expect(itemIsValidMock).toHaveBeenNthCalledWith(1, itemToAdd);
    validateCartMock.mockClear();
    itemIsValidMock.mockClear();
  });

  it("should return the cart with the new item if the cart array is empty", () => {
    const cart = [];
    const itemToAdd = {
      id: 2,
      variant: "blue",
    }
    validateCartMock.mockImplementationOnce(() => cart);
    itemIsValidMock.mockImplementationOnce(() => true);
    const newCart = addCartItem(cart, validateCartMock, itemToAdd, itemIsValidMock);
    expect(newCart).toEqual([
      {
        id: 2,
        number: 1,
        variant: "blue",
      }
    ]);
    expect(validateCartMock).toHaveBeenCalledOnce();
    expect(validateCartMock).toHaveBeenNthCalledWith(1, cart);
    expect(itemIsValidMock).toHaveBeenCalledOnce();
    expect(itemIsValidMock).toHaveBeenNthCalledWith(1, itemToAdd);
    validateCartMock.mockClear();
    itemIsValidMock.mockClear();
  });

  it("should throw an error if the item to add is not valid", () => {
    const cart = [];
    const itemToAdd = "badItem";
    validateCartMock.mockImplementationOnce(() => cart);
    itemIsValidMock.mockImplementationOnce(() => false);
    expect(() => addCartItem(cart, validateCartMock, itemToAdd, itemIsValidMock)).toThrow("the item you want to add is not valid");
    expect(validateCartMock).toHaveBeenCalledOnce();
    expect(validateCartMock).toHaveBeenNthCalledWith(1, cart);
    expect(itemIsValidMock).toHaveBeenCalledOnce();
    expect(itemIsValidMock).toHaveBeenNthCalledWith(1, itemToAdd);
    validateCartMock.mockClear();
    itemIsValidMock.mockClear();
  });
});