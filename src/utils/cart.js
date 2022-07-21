export function getLocalCart() {
  return JSON.parse(localStorage.getItem("orinoco-cart"));
}

export function getLocalCartNumber(cart) {
  return cart ? cart.reduce((previous, current) => previous + current.number, 0) : 0;
}

export function addItemToLocalCart(cart, id) {
  if (cart) {
    let idIsInLocalCart = false;
    const newCart = cart.map((item) => {
      if (item.id === id) {
        idIsInLocalCart = true;
        return {
          id: item.id,
          number: item.number + 1
        }
      } else {
        return item;
      }
    });
    if (!idIsInLocalCart) {
      localStorage.setItem("orinoco-cart", JSON.stringify([...cart, {id: id, number: 1 }]));
    } else {
      localStorage.setItem("orinoco-cart", JSON.stringify(newCart));
    }
  } else {
    localStorage.setItem("orinoco-cart", JSON.stringify([{ id, number: 1 }]));
  }
}

export function editItemInLocalCart(cart, id, number) {
  let isFound = false;
  localStorage.setItem(JSON.stringify(cart.map((item) => {
    if (item.id === id) {
      isFound = true;
      return {id, number}
    }
  })));
  if (!isFound) throw new Error("The item you want to edit is not in the cart");
}

export function removeItemFromLocalCart(cart, id) {
  localStorage.setItem(JSON.stringify(cart.filter((item) => item.id !== id)));
}

export class Cart {
  constructor() {
    this.cart = this.getCartFromLocalStorage();
  }

  getCartFromLocalStorage() {
    const baseCart = JSON.parse(localStorage.getItem("orinoco-cart"));
    const cleanCart = [];
    if (Array.isArray(baseCart) && baseCart.length > 0) {
      baseCart.forEach((item) => {
        if (item.hasOwnProperty("id") && item.hasOwnProperty("number")) {
          cleanCart.push(item);
        }
      });
    }
    return cleanCart;
  }
}