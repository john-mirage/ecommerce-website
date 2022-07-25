export const CART_LOCAL_STORAGE_KEY = "orinoco-cart";

export function validateCart(
  cart,
  _cartItemIsValid = cartItemIsValid
) {
  const cleanCart = [];
  if (Array.isArray(cart) && cart.length > 0) {
    cart.forEach((item) => {
      const itemToTestIsValid = _cartItemIsValid(item);
      if (itemToTestIsValid) cleanCart.push(item);
    });
  }
  return cleanCart;
}

export function cartIsValid(
  cart,
  _cartItemIsValid = cartItemIsValid
) {
  if (Array.isArray(cart)) {
    return cart.length > 0 ? cart.every((item) => _cartItemIsValid(item)) : true;
  }
  return false;
}

export function cartItemIsValid(
  item
) {
  if (
    Object.keys(item).length === 3 &&
    item.hasOwnProperty("uuid") &&
    item.hasOwnProperty("number") &&
    item.hasOwnProperty("lens")
  ) {
    if (
      typeof item.uuid === "string" &&
      typeof item.number === "number" &&
      typeof item.lens === "string"
    ) {
      return true;
    } else {
      return false;
    }
  }
  return false;
}

export function getLocalStorageCart(
  _validateCart = validateCart
) {
  const cart = JSON.parse(localStorage.getItem(CART_LOCAL_STORAGE_KEY));
  return _validateCart(cart);
}

export function updateLocalStorageCart(
  cart,
  _cartIsValid = cartIsValid
) {
  const cartIsValid = _cartIsValid(cart);
  if (cartIsValid) {
    localStorage.setItem(CART_LOCAL_STORAGE_KEY, JSON.stringify(cart));
  } else {
    throw new Error("The cart is not valid");
  }
}

export function getCartItemCount(
  _getCart = getLocalStorageCart
) {
  const cart = _getCart();
  return cart.length > 0 ? cart.reduce((count, item) => count + item.number, 0) : 0;
}

export function addCartItem(
  itemToAdd,
  _getCart = getLocalStorageCart,
  _cartItemIsValid = cartItemIsValid
) {
  const cart = _getCart();
  const itemToAddIsValid = _cartItemIsValid(itemToAdd);
  if (itemToAddIsValid) {
    let itemToAddIsInCart = false;
    const newCart = cart.map((item) => {
      if (
        item.uuid === itemToAdd.uuid &&
        item.lens === itemToAdd.lens
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
          uuid: itemToAdd.uuid,
          number: 1,
          variant: itemToAdd.lens,
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
  _getCart = getLocalStorageCart,
  _cartItemIsValid = cartItemIsValid
) {
  const cart = _getCart();
  const itemToUpdateIsValid = _cartItemIsValid(itemToUpdate);
  if (cart.length > 0) {
    if (itemToUpdateIsValid) {
      let itemIsInTheCart = false;
      const newCart = cart.map((item) => {
        if (
          item.uuid === itemToUpdate.uuid &&
          item.lens === itemToUpdate.lens
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
  _getCart = getLocalStorageCart,
  _cartItemIsValid = cartItemIsValid
) {
  const cart = _getCart();
  const itemToDeleteIsValid = _cartItemIsValid(itemToDelete);
  if (cart.length > 0) {
    if (itemToDeleteIsValid) {
      return cart.filter((item) => {
        return (item.uuid !== itemToDelete.uuid) && (item.lens !== itemToDelete.lens);
      });
    } else {
      throw new Error("the item you want to delete is not valid");
    }
  } else {
    throw new Error("the cart is empty");
  }
}

export function getCartItemsForCameras(cart, cameras) {
  const filteredCart = [];
  const filteredCameras = [];
  cart.forEach((item) => {
    const camera = cameras.find((camera) => camera._id === item.uuid && camera.lenses.includes(item.lens));
    if (camera) {
      filteredCart.push(item);
      const cameraHasNotBeenPushed = filteredCameras.findIndex((filteredCamera) => filteredCamera._id === item.uuid) < 0;
      if (cameraHasNotBeenPushed) filteredCameras.push(camera);
    }
  });
  return { filteredCart, filteredCameras };
}