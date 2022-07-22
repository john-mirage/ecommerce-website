/**
 * Get the local storage item.
 * 
 * @param {string} key - The key of the local storage item to get.
 * @returns {any} The local storage item.
 */
export function getLocalStorageItem(key) {
  return JSON.parse(localStorage.getItem(key));
}

/**
 * Update the local storage item.
 * 
 * @param {string} key - The key of the local storage item to update.
 * @param {any} value - the value of the local storage item to update. 
 */
export function updateLocalStorageItem(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

/**
 * Validate the local storage cart.
 * 
 * @param {any} cart - The cart retrieved from the local storage.
 * @returns {Array} The valid cart.
 */
export function validateCart(cart, itemIsValid) {
  const cleanCart = [];
  if (Array.isArray(cart) && cart.length > 0) {
    cart.forEach((item) => {
      const itemToTestIsValid = itemIsValid(item);
      if (itemToTestIsValid) cleanCart.push(item);
    });
  }
  return cleanCart;
}

export function cartItemIsValid(item) {
  if (
    item.hasOwnProperty("id") &&
    item.hasOwnProperty("number") &&
    item.hasOwnProperty("variant")
  ) {
    if (
      typeof item.id === "number" &&
      typeof item.number === "number" &&
      typeof item.variant === "string"
    ) {
      return true;
    } else {
      return false;
    }
  }
  return false;
}

/**
 * Get the cart item count.
 * 
 * @param {CartItem[]} cart - The cart.
 * @returns {number} The count of the cart items.
 */
export function getCartItemCount(cart, validateCart) {
  const cleanCart = validateCart(cart);
  return cleanCart.length > 0 ? cleanCart.reduce((count, item) => count + item.number, 0) : 0;
}

/**
 * Add an item in the cart.
 * 
 * @param {CartItem[]} cart - The cart.
 * @param {CartITem} itemToAdd - The item to add to the cart.
 * @returns {CartItem[]} the cart with the new cart item.
 */
export function addCartItem(cart, validateCart, itemToAdd, itemIsValid) {
  const cleanCart = validateCart(cart);
  const itemToAddIsValid = itemIsValid(itemToAdd);
  if (itemToAddIsValid) {
    let itemToAddIsInCart = false;
    const newCart = cleanCart.map((item) => {
      if (
        item.id === itemToAdd.id &&
        item.variant === itemToAdd.variant
      ) {
        itemToAddIsInCart = true;
        return {...item, number: item.number + 1}
      } else {
        return item;
      }
    });
    if (!itemToAddIsInCart) {
      return [
        ...cart,
        {
          id: itemToAdd.id,
          number: 1,
          variant: itemToAdd.variant,
        }
      ];
    } else {
      return newCart;
    }
  }
  throw new Error("the item you want to add is not valid");
}

/**
 * Update an item in the cart.
 * 
 * @param {CartItem[]} cart - The cart.
 * @param {CartITem} itemToUpdate - The cart item to update.
 * @returns {CartITem[]} The cart with the updated cart item.
 * @throws {Error} Throws error if the cart item to update doesnt exist in the cart.
 */
export function updateCartItemNumber(cart, validateCart, itemToUpdate, itemIsValid, itemNumber) {
  const cleanCart = validateCart(cart);
  const itemToUpdateIsValid = itemIsValid(itemToUpdate);
  if (cleanCart.length > 0) {
    if (itemToUpdateIsValid) {
      let itemIsInTheCart = false;
      const newCart = cleanCart.map((item) => {
        if (
          item.id === itemToUpdate.id &&
          item.variant === itemToUpdate.variant
        ) {
          itemIsInTheCart = true;
          return {...item, number: itemNumber};
        } else {
          return item;
        }
      });
      if (itemIsInTheCart) {
        return newCart;
      } else {
        throw new Error("The item you want to update is not in the cart");
      }
    } else {
      throw new Error("the item you want to update is not valid");
    }
  } else {
    throw new Error("the cart is empty");
  }
}

/**
 * Delete an item from the cart.
 * 
 * @param {CartItem[]} cart - The cart.
 * @param {CartITem} itemToDelete - The cart item to delete. 
 * @returns {CartItem[]} The cart without the item to delete.
 */
export function deleteCartItem(cart, validateCart, itemToDelete, itemIsValid) {
  const cleanCart = validateCart(cart);
  const itemToDeleteIsValid = itemIsValid(itemToDelete);
  if (cleanCart.length > 0) {
    if (itemToDeleteIsValid) {
      return cleanCart.filter((item) => {
        return (item.id !== itemToDelete.id) && (item.variant !== itemToDelete.variant);
      });
    } else {
      throw new Error("the item you want to delete is not valid");
    }
  } else {
    throw new Error("the cart is empty");
  }
}