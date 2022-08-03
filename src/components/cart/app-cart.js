export const CART_LOCAL_STORAGE_KEY = "orinoco-cart";

/*
[
  ["0000-0000-0000-0001", [
    ["50mm", 2],
    ["40mm", 1],
  ]],
  ["0000-0000-0000-0002", [
    ["100mm", 2],
    ["250mm", 3],
  ]],
]
*/

class AppCart extends HTMLElement {
  constructor() {
    super();
    this.initialCall = true;
    this.listElement = document.createElement("ul");
  }

  connectedCallback() {
    if (this.initialCall) {
      this.append(this.listElement);
      this.initialCall = false;
    }
  }

  get cart() {
    const cartFromLocalStorage = JSON.parse(localStorage.getItem(CART_LOCAL_STORAGE_KEY));
    const cart = new Map();
    if (Array.isArray(cartFromLocalStorage) && cartFromLocalStorage.length > 0) {
      cartFromLocalStorage.forEach((camera) => {
        if (Array.isArray(camera) && camera.length === 2 && typeof camera[0] === "string" && Array.isArray(camera[1]) && camera[1].length > 0) {
          const lensesAreValid = camera[1].every((lens) => Array.isArray(lens) && lens.length === 2 && typeof lens[0] === "string" && typeof lens[1] === "number");
          if (lensesAreValid) {
            const lensMap = new Map(camera[1]);
            cart.set(camera[0], lensMap);
          }
        }
      });
    }
    return cart;
  }

  get itemsNumber() {
    let total = 0;
    if (this.cart.size > 0) {
      const items = this.cart.values();
      for (const item of items) {
        const itemNumbers = item.values();
        for (const itemNumber of itemNumbers) {
          total += itemNumber;
        }
      }
    }
    return total;
  }

  set cart(cart) {
    if (cart.size > 0) {
      const cartAsArray = Array.from(cart);
      const cartAndCamerasAsArray = cartAsArray.map((camera) => [camera[0], Array.from(camera[1])]);
      localStorage.setItem(CART_LOCAL_STORAGE_KEY, JSON.stringify(cartAndCamerasAsArray));
    } else if (localStorage.getItem(CART_LOCAL_STORAGE_KEY)) {
      localStorage.removeItem(CART_LOCAL_STORAGE_KEY);
    }
  }

  addCameraByLens(uuid, lens, amount) {
    if (
      typeof uuid === "string" &&
      typeof lens === "string" &&
      typeof amount === "number"
    ) {
      const cart = new Map(this.cart);
      if (cart.has(uuid)) {
        const cameraMap = cart.get(uuid);
        if (cameraMap.has(lens)) {
          const previousAmount = cameraMap.get(lens);
          cameraMap.set(lens, previousAmount + amount);
        } else {
          cameraMap.set(lens, amount);
        }
      } else {
        const cameraMap = new Map();
        cameraMap.set(lens, amount);
        cart.set(uuid, cameraMap);
      }
      this.cart = cart;
    } else {
      throw new Error("invalid parameters");
    }
  }
  
  updateCameraByLens(uuid, lens, amount) {
    if (
      typeof uuid === "string" &&
      typeof lens === "string" &&
      typeof amount === "number"
    ) {
      const cart = new Map(this.cart);
      if (cart.has(uuid)) {
        const cameraMap = cart.get(uuid);
        if (cameraMap.has(lens)) {
          cameraMap.set(lens, amount);
          this.cart = cart;
        } else {
          throw new Error("The cart do not contain the camera lens for this camera uuid");
        }
      } else {
        throw new Error("The cart do not contain the camera uuid");
      }
    } else {
      throw new Error("invalid parameters");
    }
  }

  deleteCameraByUuid(uuid) {
    if (typeof uuid === "string") {
      const cart = new Map(this.cart);
      if (cart.has(uuid)) {
        cart.delete(uuid);
        this.cart = cart;
      } else {
        throw new Error("The cart do not contain the camera uuid");
      }
    } else {
      throw new Error("invalid parameters");
    }
  }

  deleteCameraByLens(uuid, lens) {
    if (
      typeof uuid === "string" &&
      typeof lens === "string"
    ) {
      const cart = new Map(this.cart);
      if (cart.has(uuid)) {
        const cameraMap = cart.get(uuid);
        if (cameraMap.has(lens)) {
          cameraMap.delete(lens);
          if (cameraMap.size <= 0) {
            cart.delete(uuid);
            this.cart = cart;
          }
        } else {
          throw new Error("The cart do not contain the camera lens for this camera uuid");
        }
      } else {
        throw new Error("The cart do not contain the camera uuid");
      }
    } else {
      throw new Error("invalid parameters");
    }
  }
}

export default AppCart;
