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
export function validateLocalStorageCart(cart) {
  const cleanCart = [];
  if (Array.isArray(cart) && cart.length > 0) {
    cart.forEach((item) => {
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
          cleanCart.push(item);
        }
      }
    });
  }
  return cleanCart;
}

/**
 * Get the cart item count.
 * 
 * @param {CartItem[]} cart - The cart.
 * @returns {number} The count of the cart items.
 */
export function getCartItemCount(cart) {
  if (Array.isArray(cart)) {
    if (cart.length <= 0) return 0;
    if (cart.every((item) => item.hasOwnProperty("number"))) {
      return cart.reduce((count, item) => count + item.number, 0);
    } else {
      throw new Error("the cart is not a valid array");
    }
  } else {
    throw new Error("the cart is not an array");
  }
}

/**
 * Add an item in the cart.
 * 
 * @param {CartItem[]} cart - The cart.
 * @param {CartITem} itemToAdd - The item to add to the cart.
 * @returns {CartItem[]} the cart with the new cart item.
 */
export function addCartItem(cart, itemToAdd) {
  if (Array.isArray(cart)) {
    let itemToAddIsInCart = false;
    const newCart = cart.map((item) => {
      if (
        item.id === itemToAdd.id &&
        item.variant === itemToAdd.variant
      ) {
        itemToAddIsInCart = true;
        return {
          id: item.id,
          number: item.number + 1,
          variant: item.variant,
        }
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
  } else {
    throw new Error("the cart is not an array");
  }
}

/**
 * Update an item in the cart.
 * 
 * @param {CartItem[]} cart - The cart.
 * @param {CartITem} itemToUpdate - The cart item to update.
 * @returns {CartITem[]} The cart with the updated cart item.
 * @throws {Error} Throws error if the cart item to update doesnt exist in the cart.
 */
export function updateCartItem(cart, itemToUpdate) {
  let itemIsInTheCart = false;
  const newCart = cart.map((item) => {
    if (
      item.id === itemToUpdate.id &&
      item.variant === itemToUpdate.variant
    ) {
      itemIsInTheCart = true;
      return itemToUpdate;
    } else {
      return item;
    }
  });
  if (itemIsInTheCart) {
    return newCart;
  } else {
    throw new Error("The item you want to update is not in the cart");
  }
}

/**
 * Delete an item from the cart.
 * 
 * @param {CartItem[]} cart - The cart.
 * @param {CartITem} itemToDelete - The cart item to delete. 
 * @returns {CartItem[]} The cart without the item to delete.
 */
export function deleteCartItem(cart, itemToDelete) {
  return cart.filter((item) => {
    return (item.id !== itemToDelete.id) && (item.variant !== itemToDelete.variant);
  });
}