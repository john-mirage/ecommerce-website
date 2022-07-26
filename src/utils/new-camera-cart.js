export const CART_LOCAL_STORAGE_KEY = "orinoco-cart";

/*
{
  "0000-0000-0000-0001": {
    numberByLens: {
      "50mm": 2,
      "45mm": 4,
    },
  },
  "0000-0000-0000-0002": {
    numberByLens: {
      "50mm": 2,
      "45mm": 4,
    },
  }
}

{
  "0000-0000-0000-0001": {
    name: "name",
    price: 2300,
    imageUrl: "/path/to/image",
    numberByLens: {
      "50mm": 2,
      "45mm": 4,
    },
  },
  "0000-0000-0000-0002": {
    name: "name",
    price: 2500,
    imageUrl: "/path/to/image",
    numberByLens: {
      "50mm": 2,
      "45mm": 4,
    },
  }
}
*/

export function getLocalStorageCart() {
  return JSON.parse(localStorage.getItem(CART_LOCAL_STORAGE_KEY));
}

export function updateLocalStorageCart(cart) {
  localStorage.setItem(CART_LOCAL_STORAGE_KEY, JSON.stringify(cart));
}

export function getCamerasNumberFromCart(cart) {
  let totalCameraCount = 0;
  Object.values(cart).forEach((camera) => {
    let cameraCount = 0;
    Object.values(camera.numberByLens).forEach((cameraNumberForCurrentLens) => {
      cameraCount += cameraNumberForCurrentLens;
    });
    totalCameraCount += cameraCount;
  });
  return totalCameraCount;
}

export function addCamerasToCartBasedOnLens(
  cart,
  cameraUuid,
  cameraLensName,
  cameraNumber
) {
  const camera = cart[cameraUuid];
  if (camera) {
    const cameraNumberForSelectedLens = camera.numberByLens[cameraLensName];
    const cloneOfCamera = { ...camera };
    cloneOfCamera.numberByLens[cameraLensName] = cameraNumberForSelectedLens ? cameraNumberForSelectedLens + cameraNumber : cameraNumber;
    return {
      ...cart,
      [cameraUuid]: cloneOfCamera
    }
  }
  return {
    ...cart,
    [cameraUuid]: {
      numberByLens: {
        [cameraLensName]: cameraNumber,
      }
    }
  }
}

export function updateCamerasFromCartBasedOnLens(
  cart,
  cameraUuid,
  cameraLensName,
  cameraNumber
) {
  const camera = cart[cameraUuid];
  if (camera) {
    const cameraHasLens = camera.numberByLens.hasOwnProperty(cameraLensName);
    if (cameraHasLens) {
      const cloneOfCamera = { ...camera };
      cloneOfCamera.numberByLens[cameraLensName] = cameraNumber;
      return {
        ...cart,
        [cameraUuid]: cloneOfCamera
      }
    } else {
      throw new Error("the camera lens is not in the cart");
    }
  }
  throw new Error("the camera is not in the cart");
}

export function deleteCamerasFromCartBasedOnLens(
  cart,
  cameraUuid,
  cameraLensName,
  _deleteCamerasFromCartBasedOnUuid = deleteCamerasFromCartBasedOnUuid
) {
  const camera = cart[cameraUuid];
  if (camera) {
    const cameraHasLens = camera.numberByLens.hasOwnProperty(cameraLensName);
    if (cameraHasLens) {
      if (Object.keys(camera.numberByLens).length === 1) {
        return _deleteCamerasFromCartBasedOnUuid(cart, cameraUuid);
      } else {
        const cloneOfCamera = { ...camera };
        delete cloneOfCamera.numberByLens[cameraLensName];
        return {
          ...cart,
          [cameraUuid]: cloneOfCamera,
        }
      }
    } else {
      throw new Error(`Their is no cameras to delete for this lens: ${cameraLensName}`);
    }
  }
  throw new Error(`Their is no cameras to delete for this uuid: ${cameraUuid}`);
}

export function deleteCamerasFromCartBasedOnUuid(
  cart,
  cameraUuid
) {
  const camera = cart[cameraUuid];
  if (camera) {
    const cloneOfCameras = { ...cart };
    delete cloneOfCameras[cameraUuid];
    return cloneOfCameras;
  }
  throw new Error("the camera is not in the cart");
}

export function getCartWithApiData(
  cart,
  cameras
) {
  return cameras.map((cameraFromApi) => {
    const cameraFromCart = cart[cameraFromApi._id];
    if (cameraFromCart) {
      return {
        uuid: cameraFromApi._id,
        name: cameraFromApi.name,
        description: cameraFromApi.description,
        price: cameraFromApi.price,
        imageUrl: cameraFromApi.imageUrl,
        numberByLens: cameraFromCart.numberByLens,
      }
    }
    throw new Error("The localstorage do not contain the camera from the api");
  });
}