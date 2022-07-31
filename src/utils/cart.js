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


export class Cart {

  /**
   * Initialize the cart by getting the cart from the local storage
   * if there is one. This cart is validated to be a valid cart.
   * 
   * @constructor
   */
  constructor() {
    const cartFromLocalStorage = JSON.parse(localStorage.getItem(CART_LOCAL_STORAGE_KEY));
    this.cart = new Map();
    if (
      Array.isArray(cartFromLocalStorage) && // cart is an array
      cartFromLocalStorage.length > 0 // cart is not empty
    ) {
      cartFromLocalStorage.forEach((camera) => {
        if (
          Array.isArray(camera) && // camera is an array
          camera.length === 2 && // camera has two values
          typeof camera[0] === "string" && // camera uuid is a string
          Array.isArray(camera[1]) && // camera lenses is an array
          camera[1].length > 0 // camera lenses is not empty
        ) {
          const lensesAreValid = camera[1].every((lens) => {
            return (
              Array.isArray(lens) && // lens is an array
              lens.length === 2 && // lens has two values
              typeof lens[0] === "string" && // lens name is a string
              typeof lens[1] === "number" // lens number is a number
            )
          });
          if (lensesAreValid) {
            const lensMap = new Map(camera[1]);
            this.cart.set(camera[0], lensMap);
          }
        }
      });
    }
    this.save();
  }

  /**
   * Get the items number.
   */
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

  /**
   * Add cameras in the cart depending of the lens.
   * 
   * @param {string} uuid - The camera uuid.
   * @param {string} lens - The camera lens name.
   * @param {number} amount - The camera amount.
   * @throws {Error} throws an error if the parameters are not valid.
   */
  addCameraByLens(uuid, lens, amount) {
    if (
      typeof uuid === "string" &&
      typeof lens === "string" &&
      typeof amount === "number"
    ) {
      if (this.cart.has(uuid)) {
        const cameraMap = this.cart.get(uuid);
        if (cameraMap.has(lens)) {
          const previousAmount = cameraMap.get(lens);
          cameraMap.set(lens, previousAmount + amount);
        } else {
          cameraMap.set(lens, amount);
        }
      } else {
        const cameraMap = new Map();
        cameraMap.set(lens, amount);
        this.cart.set(uuid, cameraMap);
      }
      this.save();
    } else {
      throw new Error("invalid parameters");
    }
  }

  /**
   * Update cameras number in the cart depending of the lens.
   * 
   * @param {string} uuid - The camera uuid.
   * @param {string} lens - The camera lens name.
   * @param {number} amount - The camera amount.
   * @throws {Error} throws an error if the parameters are not valid.
   * @throws {Error} throws an error if the cart do not contain the camera uuid.
   * @throws {Error} throws an error if the cart do not contain the camera lens name for the camera uuid.
   */
  updateCameraByLens(uuid, lens, amount) {
    if (
      typeof uuid === "string" &&
      typeof lens === "string" &&
      typeof amount === "number"
    ) {
      if (this.cart.has(uuid)) {
        const cameraMap = this.cart.get(uuid);
        if (cameraMap.has(lens)) {
          cameraMap.set(lens, amount);
          this.save();
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

  /**
   * Delete cameras from the cart depending of the provided camera uuid.
   * 
   * @param {string} uuid - The camera uuid.
   * @throws {Error} throws an error if the parameters are not valid.
   * @throws {Error} throws an error if the cart do not contain the camera uuid.
   */
  deleteCameraByUuid(uuid) {
    if (typeof uuid === "string") {
      if (this.cart.has(uuid)) {
        this.cart.delete(uuid);
        this.save();
      } else {
        throw new Error("The cart do not contain the camera uuid");
      }
    } else {
      throw new Error("invalid parameters");
    }
  }

  /**
   * Delete cameras from the cart depending of the provided lens name.
   * 
   * @param {string} uuid - The camera uuid.
   * @param {string} lens - The camera lens name.
   * @throws {Error} throws an error if the parameters are not valid.
   * @throws {Error} throws an error if the cart do not contain the camera uuid.
   * @throws {Error} throws an error if the cart do not contain the camera lens name for the camera uuid.
   */
  deleteCameraByLens(uuid, lens) {
    if (
      typeof uuid === "string" &&
      typeof lens === "string"
    ) {
      if (this.cart.has(uuid)) {
        const cameraMap = this.cart.get(uuid);
        if (cameraMap.has(lens)) {
          cameraMap.delete(lens);
          if (cameraMap.size <= 0) {
            this.cart.delete(uuid);
            this.save();
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

  /**
   * Delete all the cameras from the cart.
   */
  clear() {
    if (this.cart.size > 0) {
      this.cart.clear();
      this.save();
    }
  }

  /**
   * Save the cart in the localstorage.
   */
  save() {
    if (this.cart.size > 0) {
      const cartAsArray = Array.from(this.cart);
      const cartAndCamerasAsArray = cartAsArray.map((camera) => [camera[0], Array.from(camera[1])]);
      localStorage.setItem(CART_LOCAL_STORAGE_KEY, JSON.stringify(cartAndCamerasAsArray));
    } else if (localStorage.getItem(CART_LOCAL_STORAGE_KEY)) {
      localStorage.removeItem(CART_LOCAL_STORAGE_KEY);
    }
  }
}

export const cart = new Cart();
