export const CART_LOCAL_STORAGE_KEY = "orinoco-cart";

export function getLocalStorageCart(
  validateCart = validateCart
) {
  const cart = JSON.parse(localStorage.getItem(CART_LOCAL_STORAGE_KEY));
  return validateCart(cart);
}

export function updateLocalStorageCart(
  newValue
) {
  localStorage.setItem(CART_LOCAL_STORAGE_KEY, JSON.stringify(newValue));
}

export function validateCart(
  cart,
  cartItemIsValid = cartItemIsValid
) {
  const cleanCart = [];
  if (Array.isArray(cart) && cart.length > 0) {
    cart.forEach((item) => {
      const itemToTestIsValid = cartItemIsValid(item);
      if (itemToTestIsValid) cleanCart.push(item);
    });
  }
  return cleanCart;
}

export function cartItemIsValid(
  item
) {
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

export function getCartItemCount(
  getCart = getLocalStorageCart
) {
  const cart = getCart();
  return cart.length > 0 ? cart.reduce((count, item) => count + item.number, 0) : 0;
}

export function addCartItem(
  itemToAdd,
  getCart = getLocalStorageCart,
  cartItemIsValid = cartItemIsValid
) {
  const cart = getCart();
  const itemToAddIsValid = cartItemIsValid(itemToAdd);
  if (itemToAddIsValid) {
    let itemToAddIsInCart = false;
    const newCart = cart.map((item) => {
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

export function updateCartItemNumber(
  itemToUpdate,
  itemNumber,
  getCart = getLocalStorageCart,
  cartItemIsValid = cartItemIsValid
) {
  const cart = getCart();
  const itemToUpdateIsValid = cartItemIsValid(itemToUpdate);
  if (cart.length > 0) {
    if (itemToUpdateIsValid) {
      let itemIsInTheCart = false;
      const newCart = cart.map((item) => {
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

export function deleteCartItem(
  itemToDelete,
  getCart = getLocalStorageCart,
  cartItemIsValid = cartItemIsValid
) {
  const cart = getCart();
  const itemToDeleteIsValid = cartItemIsValid(itemToDelete);
  if (cart.length > 0) {
    if (itemToDeleteIsValid) {
      return cart.filter((item) => {
        return (item.id !== itemToDelete.id) && (item.variant !== itemToDelete.variant);
      });
    } else {
      throw new Error("the item you want to delete is not valid");
    }
  } else {
    throw new Error("the cart is empty");
  }
}

export async function getCartWithCameras(
  getCameraFromApi,
  getCart = getLocalStorageCart
) {
  const cart = getCart();
  let fullResponse = {
    status: "OK",
    cameras: [],
  };
  for (const item of cart) {
    const response = await getCameraFromApi(item.id);
    if (response.status === "ERROR") {
      fullResponse = { status: "ERROR" };
      break;
    } else {
      fullResponse.cameras.push({
        ...response.camera,
        number: item.number,
        variant: item.variant,
      });
    }
  };
  return fullResponse;
}