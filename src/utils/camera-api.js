import { cartIsValid } from "@utils/camera-cart";

const API_URL = "http://localhost:3000/api/cameras/";

/**
 * Get all the cameras from the API.
 * 
 * @returns {Object} The fetch response.
 */
export async function getAllCameras() {
  let data = false;
  let error = false;
  const response = await fetch(API_URL)
    .then(response => response)
    .catch(() => false);
  if (response) {
    if (response.ok) {
      data = await response.json();
    } else {
      error = "ERROR";
    }
  } else {
    error = "ERROR";
  }
  return { data, error };
}

/**
 * Get one camera from the API.
 * 
 * @param {string} uuid - The camera uuid.
 * @returns {Object} The fetch response.
 */
export async function getOneCamera(uuid) {
  if (typeof uuid === "string") {
    let data = false;
    let error = false;
    const response = await fetch(API_URL + uuid)
      .then(response => response)
      .catch(() => false);
    if (response) {
      if (response.ok) {
        data = await response.json();
      } else {
        error = "NOT_FOUND";
      }
    } else {
      error = "ERROR";
    }
    return { data, error };
  }
  throw new Error("The uuid parameter must be a string");
}

/**
 * Get the cameras corresponding to the cart.
 * 
 * @param {CartItem[]} cart - The cart items. 
 * @param {(uuid) => Object} - The function used to retrieve a camera from the API.
 */
export async function getCartCameras(
  cart,
  _cartIsValid = cartIsValid,
  _getOneCamera = getOneCamera
) {
  if (_cartIsValid(cart)) {
    let data = {
      cart: false,
      cameras: false,
    };
    let isError = false;
    let isDegraded = false;
    if (cart.length > 0) {
      const uuids = new Set(cart.map((item) => item.uuid));
      for (const uuid of uuids) {
        const response = await _getOneCamera(uuid);
        if (typeof response.error === "string") {
          if (response.error === "ERROR") {
            isError = true;
            break;
          } else if (response.error === "NOT_FOUND" && !isDegraded) {
            isDegraded = true;
          } else {
            throw new Error("unknown error");
          }
        } else {
          const cartItems = cart.filter((item) => response.data._id === item.uuid)
          data.cart = Array.isArray(data.cart) ? [...data.cart, ...cartItems] : [...cartItems];
          data.cameras = Array.isArray(data.cameras) ? data.cameras.push(response.data) : [response.data];
        }
      }
      return { data, isError, isDegraded };
    }
    return { data, isError, isDegraded };
  }
  throw new Error("The cart is not valid");
}
