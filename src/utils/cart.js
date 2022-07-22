const LOCAL_STORAGE_KEY = "orinoco-cart";

export function getLocalStorageCart(validateCart, cartItemIsValid) {
  const cart = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
  return validateCart(cart, cartItemIsValid);
}

export function updateLocalStorageCart(newValue) {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(value));
}

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

export function getCartItemCount(getCart) {
  const cart = getCart();
  return cart.length > 0 ? cleanCart.reduce((count, item) => count + item.number, 0) : 0;
}

export function addCartItem(getCart, itemToAdd, itemIsValid) {
  const cart = getCart();
  const itemToAddIsValid = itemIsValid(itemToAdd);
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

export function updateCartItemNumber(getCart, itemToUpdate, itemIsValid, itemNumber) {
  const cart = getCart();
  const itemToUpdateIsValid = itemIsValid(itemToUpdate);
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

export function deleteCartItem(getCart, itemToDelete, itemIsValid) {
  const cart = getCart();
  const itemToDeleteIsValid = itemIsValid(itemToDelete);
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

 export async function getCartWithCameras(getCart, getCameraFromApi) {
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