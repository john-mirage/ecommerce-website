const API_URL = "http://localhost:3000/api/cameras/";

/**
 * Get all the cameras from the API.
 * 
 * @returns {Object} The fetch response.
 */
export async function getAllCameras() {
  let data = [];
  let isError = false;
  const response = await fetch(API_URL)
    .then(response => response)
    .catch(() => false);
  if (response) {
    if (response.ok) {
      data = await response.json();
    } else {
      isError = true;
    }
  } else {
    isError = true;
  }
  return { data, isError };
}

/**
 * Get some cameras from the API.
 * 
 * @param {uuids} uuids - The camera uuids.
 * @param {(uuid) => Object} _getOneCamera - The function used to retrieve one camera from the API.
 */
export async function getSomeCameras(
  uuids,
  _getOneCamera = getOneCamera
) {
  const uuidsAreValid = Array.isArray(uuids) && uuids.every((uuid) => typeof uuid === "string");
  if (uuidsAreValid) {
    let data = [];
    let isError = false;
    let hasData = false;
    let hasPartialData = false;
    const uniqueUuids = new Set(uuids);
    for (const uuid of uniqueUuids) {
      const response = await _getOneCamera(uuid);
      if (response.isError) {
        isError = true;
        break;
      } else if (response.isNotFound) {
        if (!hasPartialData) hasPartialData = true;
      } else if (response.data) {
        data.push(response.data);
        if (!hasData) hasData = true;
      }
    }
    return { data, isError, hasData, hasPartialData };
  }
  throw new Error("The uuids parameter must be an array of strings");
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
    let isError = false;
    let isNotFound = false;
    const response = await fetch(API_URL + uuid)
      .then(response => response)
      .catch(() => false);
    if (response) {
      if (response.ok) {
        data = await response.json();
      } else {
        isNotFound = true;
      }
    } else {
      isError = true;
    }
    return { data, isError, isNotFound };
  }
  throw new Error("The uuid parameter must be a string");
}
