import {
  describe,
  expect,
  it,
  vi,
  afterEach
} from "vitest";
import {
  CART_LOCAL_STORAGE_KEY,
  getLocalStorageCart,
  updateLocalStorageCart,
  validateCart,
  cartItemIsValid,
  getCartItemCount,
  addCartItem,
  updateCartItemNumber,
  deleteCartItem,
} from "@utils/camera-cart";

describe("getLocalStorageCart", () => {
  const validateCartMock = vi.fn();

  afterEach(() => {
    validateCartMock.mockClear();
  });

  it("should return the json parsed local storage item", () => {
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
    ];
    validateCartMock.mockImplementationOnce(() => cart);
    localStorage.setItem(CART_LOCAL_STORAGE_KEY, JSON.stringify(cart));
    const localStorageCart = getLocalStorageCart(validateCartMock);
    expect(localStorageCart).toEqual(cart);
    expect(validateCartMock).toHaveBeenCalledOnce();
    expect(validateCartMock).toHaveBeenNthCalledWith(1, cart);
    localStorage.removeItem(CART_LOCAL_STORAGE_KEY);
  });
});

describe("updateLocalStorageCart", () => {
  it("should update the local storage item with a new value", () => {
    localStorage.setItem(CART_LOCAL_STORAGE_KEY, JSON.stringify("test"));
    updateLocalStorageCart("newValue");
    const localStorageCart = JSON.parse(localStorage.getItem(CART_LOCAL_STORAGE_KEY));
    expect(localStorageCart).toBe("newValue");
    localStorage.removeItem(CART_LOCAL_STORAGE_KEY);
  });
});

describe("validateCart", () => {
  const cartItemIsValidMock = vi.fn();

  afterEach(() => {
    cartItemIsValidMock.mockClear();
  });

  it("should return a valid cart when the cart is valid", () => {
    cartItemIsValidMock.mockImplementation(() => true);
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
    const validCart = validateCart(cartToTest, cartItemIsValidMock);
    expect(validCart).toEqual(cartToTest);
    expect(cartItemIsValidMock).toHaveBeenCalledTimes(2);
    expect(cartItemIsValidMock).toHaveBeenNthCalledWith(1, cartToTest[0]);
    expect(cartItemIsValidMock).toHaveBeenNthCalledWith(2, cartToTest[1]);
  });

  it("should return a filtered cart if some cart items have bad keys", () => {
    cartItemIsValidMock.mockImplementationOnce(() => false);
    cartItemIsValidMock.mockImplementationOnce(() => true);
    const cartToTest = [
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
    expect(validateCart(cartToTest, cartItemIsValidMock)).toEqual([cartToTest[1]]);
    expect(cartItemIsValidMock).toHaveBeenCalledTimes(2);
    expect(cartItemIsValidMock).toHaveBeenNthCalledWith(1, cartToTest[0]);
    expect(cartItemIsValidMock).toHaveBeenNthCalledWith(2, cartToTest[1]);
  });

  it("should return a filtered cart if some cart items have bad values", () => {
    cartItemIsValidMock.mockImplementationOnce(() => false);
    cartItemIsValidMock.mockImplementationOnce(() => true);
    const cartToTest = [
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
    expect(validateCart(cartToTest, cartItemIsValidMock)).toEqual([cartToTest[1]]);
    expect(cartItemIsValidMock).toHaveBeenCalledTimes(2);
    expect(cartItemIsValidMock).toHaveBeenNthCalledWith(1, cartToTest[0]);
    expect(cartItemIsValidMock).toHaveBeenNthCalledWith(2, cartToTest[1]);
  });

  it("should return a empty array when the cart is NOT an array", () => {
    cartItemIsValidMock.mockImplementationOnce(() => false);
    cartItemIsValidMock.mockImplementationOnce(() => false);
    const cartWithNumbers = [1, 2];
    expect(validateCart(cartWithNumbers, cartItemIsValidMock)).toEqual([]);
    expect(cartItemIsValidMock).toHaveBeenCalledTimes(2);
    expect(cartItemIsValidMock).toHaveBeenNthCalledWith(1, cartWithNumbers[0]);
    expect(cartItemIsValidMock).toHaveBeenNthCalledWith(2, cartWithNumbers[1]);
    cartItemIsValidMock.mockClear();
    cartItemIsValidMock.mockImplementationOnce(() => false);
    cartItemIsValidMock.mockImplementationOnce(() => false);
    const cartWithStrings = [ "not an object", "not an object"];
    expect(validateCart(cartWithStrings, cartItemIsValidMock)).toEqual([]);
    expect(cartItemIsValidMock).toHaveBeenCalledTimes(2);
    expect(cartItemIsValidMock).toHaveBeenNthCalledWith(1, cartWithStrings[0]);
    expect(cartItemIsValidMock).toHaveBeenNthCalledWith(2, cartWithStrings[1]);
  });

  it("should return a empty cart when the cart is an empty array", () => {
    const cartToTest = [];
    const validCart = validateCart(cartToTest, cartItemIsValidMock);
    expect(validCart).toEqual([]);
    expect(cartItemIsValidMock).toHaveBeenCalledTimes(0);
  });

  it("should return a empty cart when the cart is not an array", () => {
    const cartToTest = "not an array";
    const validCart = validateCart(cartToTest, cartItemIsValidMock);
    expect(validCart).toEqual([]);
    expect(cartItemIsValidMock).toHaveBeenCalledTimes(0);
  });
});

describe("cartItemIsValid", () => {
  it("should return true if the cart item is valid", () => {
    const item = {
      id: 1,
      number: 1,
      variant: "blue",
    }
    expect(cartItemIsValid(item)).toBeTruthy();
  });

  it("should return false if the cart item is NOT valid", () => {
    const item = {
      id: 1,
      number: "2",
      variant: "blue",
    }
    expect(cartItemIsValid(item)).toBeFalsy();
  });
});

describe("getCartItemCount", () => {
  const getCartMock = vi.fn();

  afterEach(() => {
    getCartMock.mockClear();
  });

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
    getCartMock.mockImplementationOnce(() => cart);
    const cartItemCount = getCartItemCount(getCartMock);
    expect(cartItemCount).toBe(6);
    expect(getCartMock).toHaveBeenCalledOnce();
  });

  it("should return 0 if the cart array is empty", () => {
    const cart = [];
    getCartMock.mockImplementationOnce(() => cart);
    const cartItemCount = getCartItemCount(getCartMock);
    expect(cartItemCount).toBe(0);
    expect(getCartMock).toHaveBeenCalledOnce();
  });
});

describe("addCartItem", () => {
  const getCartMock = vi.fn();
  const cartItemIsValidMock = vi.fn();

  afterEach(() => {
    getCartMock.mockClear();
    cartItemIsValidMock.mockClear();
  });

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
    getCartMock.mockImplementationOnce(() => cart);
    cartItemIsValidMock.mockImplementationOnce(() => true);
    const newCart = addCartItem(itemToAdd, getCartMock, cartItemIsValidMock);
    expect(newCart).toEqual([...cart, {...itemToAdd, number: 1}]);
    expect(getCartMock).toHaveBeenCalledOnce();
    expect(cartItemIsValidMock).toHaveBeenCalledOnce();
    expect(cartItemIsValidMock).toHaveBeenNthCalledWith(1, itemToAdd);
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
    getCartMock.mockImplementationOnce(() => cart);
    cartItemIsValidMock.mockImplementationOnce(() => true);
    const newCart = addCartItem(itemToAdd, getCartMock, cartItemIsValidMock);
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
    expect(getCartMock).toHaveBeenCalledOnce();
    expect(cartItemIsValidMock).toHaveBeenCalledOnce();
    expect(cartItemIsValidMock).toHaveBeenNthCalledWith(1, itemToAdd);
  });

  it("should return the cart with the new item if the cart array is empty", () => {
    const cart = [];
    const itemToAdd = {
      id: 2,
      variant: "blue",
    }
    getCartMock.mockImplementationOnce(() => cart);
    cartItemIsValidMock.mockImplementationOnce(() => true);
    const newCart = addCartItem(itemToAdd, getCartMock, cartItemIsValidMock);
    expect(newCart).toEqual([
      {
        id: 2,
        number: 1,
        variant: "blue",
      }
    ]);
    expect(getCartMock).toHaveBeenCalledOnce();
    expect(cartItemIsValidMock).toHaveBeenCalledOnce();
    expect(cartItemIsValidMock).toHaveBeenNthCalledWith(1, itemToAdd);
  });

  it("should throw an error if the item to add is not valid", () => {
    const cart = [];
    const itemToAdd = "badItem";
    getCartMock.mockImplementationOnce(() => cart);
    cartItemIsValidMock.mockImplementationOnce(() => false);
    expect(() => addCartItem(itemToAdd, getCartMock, cartItemIsValidMock)).toThrow("the item you want to add is not valid");
    expect(getCartMock).toHaveBeenCalledOnce();
    expect(cartItemIsValidMock).toHaveBeenCalledOnce();
    expect(cartItemIsValidMock).toHaveBeenNthCalledWith(1, itemToAdd);
  });
});

describe("updateCartItemNumber", () => {
  const getCartMock = vi.fn();
  const cartItemIsValidMock = vi.fn();

  afterEach(() => {
    getCartMock.mockClear();
    cartItemIsValidMock.mockClear();
  });

  it("should return the cart with the updated item number", () => {
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
    const itemToUpdate = {
      id: 1,
      variant: "red",
    }
    const itemNumber = 5;
    getCartMock.mockImplementationOnce(() => cart);
    cartItemIsValidMock.mockImplementationOnce(() => true);
    const newCart = updateCartItemNumber(itemToUpdate, itemNumber, getCartMock, cartItemIsValidMock);
    expect(newCart).toEqual([
      {
        id: 1,
        number: 5,
        variant: "red",
      },
      {
        id: 2,
        number: 2,
        variant: "blue",
      },
    ]);
    expect(getCartMock).toHaveBeenCalledOnce();
    expect(cartItemIsValidMock).toHaveBeenCalledOnce();
    expect(cartItemIsValidMock).toHaveBeenNthCalledWith(1, itemToUpdate);
  });

  it("should throw an error if the item to update is not in the cart", () => {
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
    const itemToUpdate = {
      id: 1,
      variant: "blue",
    }
    const itemNumber = 5;
    getCartMock.mockImplementationOnce(() => cart);
    cartItemIsValidMock.mockImplementationOnce(() => true);
    expect(() => updateCartItemNumber(itemToUpdate, itemNumber, getCartMock, cartItemIsValidMock)).toThrow("The item you want to update is not in the cart");
    expect(getCartMock).toHaveBeenCalledOnce();
    expect(cartItemIsValidMock).toHaveBeenCalledOnce();
    expect(cartItemIsValidMock).toHaveBeenNthCalledWith(1, itemToUpdate);
  });

  it("should throw an error if the cart is empty", () => {
    const cart = [];
    const itemToUpdate = {
      id: 1,
      variant: "blue",
    }
    const itemNumber = 5;
    getCartMock.mockImplementationOnce(() => cart);
    cartItemIsValidMock.mockImplementationOnce(() => true);
    expect(() => updateCartItemNumber(itemToUpdate, itemNumber, getCartMock, cartItemIsValidMock)).toThrow("the cart is empty");
    expect(getCartMock).toHaveBeenCalledOnce();
    expect(cartItemIsValidMock).toHaveBeenCalledOnce();
    expect(cartItemIsValidMock).toHaveBeenNthCalledWith(1, itemToUpdate);
  });

  it("should throw an error if the item to update is not valid", () => {
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
    const itemToUpdate = {
      id: "1",
      variant: "blue",
    }
    const itemNumber = 5;
    getCartMock.mockImplementationOnce(() => cart);
    cartItemIsValidMock.mockImplementationOnce(() => false);
    expect(() => updateCartItemNumber(itemToUpdate, itemNumber, getCartMock, cartItemIsValidMock)).toThrow("the item you want to update is not valid");
    expect(getCartMock).toHaveBeenCalledOnce();
    expect(cartItemIsValidMock).toHaveBeenCalledOnce();
    expect(cartItemIsValidMock).toHaveBeenNthCalledWith(1, itemToUpdate);
  });
});

describe("deleteCartItem", () => {
  const getCartMock = vi.fn();
  const cartItemIsValidMock = vi.fn();

  afterEach(() => {
    getCartMock.mockClear();
    cartItemIsValidMock.mockClear();
  });

  it("should return the cart without the item to delete", () => {
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
    const itemToDelete = {
      id: 1,
      variant: "red",
    }
    getCartMock.mockImplementationOnce(() => cart);
    cartItemIsValidMock.mockImplementationOnce(() => true);
    const newCart = deleteCartItem(itemToDelete, getCartMock, cartItemIsValidMock);
    expect(newCart).toEqual([cart[1]]);
    expect(getCartMock).toHaveBeenCalledOnce();
    expect(cartItemIsValidMock).toHaveBeenCalledOnce();
    expect(cartItemIsValidMock).toHaveBeenNthCalledWith(1, itemToDelete);
  });

  it("should throw an error if the cart is empty", () => {
    const cart = [];
    const itemToDelete = {
      id: 1,
      variant: "red",
    }
    getCartMock.mockImplementationOnce(() => cart);
    cartItemIsValidMock.mockImplementationOnce(() => true);
    expect(() => deleteCartItem(itemToDelete, getCartMock, cartItemIsValidMock)).toThrow("the cart is empty");
    expect(getCartMock).toHaveBeenCalledOnce();
    expect(cartItemIsValidMock).toHaveBeenCalledOnce();
    expect(cartItemIsValidMock).toHaveBeenNthCalledWith(1, itemToDelete);
  });

  it("should throw an error if the item to delete is not valid", () => {
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
    const itemToDelete = {
      id: 1,
      variant: 1256,
    }
    getCartMock.mockImplementationOnce(() => cart);
    cartItemIsValidMock.mockImplementationOnce(() => false);
    expect(() => deleteCartItem(itemToDelete, getCartMock, cartItemIsValidMock)).toThrow("the item you want to delete is not valid");
    expect(getCartMock).toHaveBeenCalledOnce();
    expect(cartItemIsValidMock).toHaveBeenCalledOnce();
    expect(cartItemIsValidMock).toHaveBeenNthCalledWith(1, itemToDelete);
  });
});