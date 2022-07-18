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