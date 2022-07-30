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
  constructor(cartFromLocalStorage) {
    //const cartFromLocalStorage = JSON.parse(localStorage.getItem(CART_LOCAL_STORAGE_KEY));
    this.cart = new Map();
    const cartIsAnArray = Array.isArray(cartFromLocalStorage);
    const cartIsNotEmpty = cartFromLocalStorage.length > 0;
    if (cartIsAnArray && cartIsNotEmpty) {
      cartFromLocalStorage.forEach((item) => {
        const itemIsAnArray = Array.isArray(item);
        const itemHasTwoValues = item.length === 2;
        const uuidIsValid = typeof item[0] === "string";
        const lensesIsAnArray = Array.isArray(item[1]);
        const lensesIsNotEmpty = item[1].length > 0;
        const lensesAreValid = item[1].every((lens) => {
          const lensIsAnArray = Array.isArray(lens);
          const lensHasTwoValues = lens.length === 2;
          const lensNameIsValid = typeof lens[0] === "string";
          const lensNumberIsValid = typeof lens[1] === "number";
          return lensIsAnArray && lensHasTwoValues && lensNameIsValid && lensNumberIsValid;
        });
        if (itemIsAnArray && itemHasTwoValues && uuidIsValid && lensesIsAnArray && lensesIsNotEmpty && lensesAreValid) {
          const lensMap = new Map(item[1]);
          this.cart.set(item[0], lensMap);
        }
      });
    }
    console.log(this.cart);
  }

  get count() {
    let count = 0;
    if (this.cart.size > 0) {
      const items = this.cart.values();
      for (const item of items) {
        const itemNumbers = item.values();
        for (const itemNumber of itemNumbers) {
          count += itemNumber;
        }
      }
    }
    return count;
  }

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
    } else {
      throw new Error("One or more parameters are not valid");
    }
  }

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
        }
      }
    } else {
      throw new Error("One or more parameters are not valid");
    }
  }

  deleteCameraByUuid(uuid) {
    if (typeof uuid === "string") {
      if (this.cart.has(uuid)) {
        this.cart.delete(uuid);
      }
    } else {
      throw new Error("The uuid is not a string");
    }
  }

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
          }
        }
      }
    } else {
      throw new Error("One or more parameters are not valid");
    }
  }

  clear() {
    this.cart.clear();
  }

  save() {
    if (this.cart.size > 0) {
      const cartAsArray = Array.from(this.cart);
      const cartAndCameraAsArray = cartAsArray.map((item) => Array.from(item));
      localStorage.setItem(CART_LOCAL_STORAGE_KEY, JSON.stringify(cartAndCameraAsArray));
    } else if (localStorage.getItem(CART_LOCAL_STORAGE_KEY)) {
      localStorage.removeItem(CART_LOCAL_STORAGE_KEY);
    }
  }
}
