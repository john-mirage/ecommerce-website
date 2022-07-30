const API_URL = "http://localhost:3000/api/cameras/";

const abortController = new AbortController();

/**
 * Get all the cameras from the API.
 * 
 * @param {AbortSignal} signal - the fetch abort signal.
 * @returns {Object} The fetch response.
 */
export async function getAllCameras(
  signal
) {
  let cameras = [];
  let error = false;
  const response = await fetch(API_URL, { signal })
    .then(response => response)
    .catch((error) => error.message);
  if (response instanceof Response) {
    if (response.ok) {
      cameras = await response.json();
    } else {
      error = "not-found";
    }
  } else if (typeof response === "string") {
    error = response === "The user aborted a request." ? "aborted" : "error";
  } else {
    throw new Error("unknown response");
  }
  console.log(response, cameras, error);
  return { cameras, error };
}

/**
 * Get some cameras from the API.
 * 
 * @param {uuids} uuids - The camera uuids.
 * @param {AbortSignal} signal - the fetch abort signal.
 * @param {(uuid) => Object} _getOneCamera - The function used to retrieve one camera from the API.
 */
export async function getSomeCameras(
  uuids,
  signal,
  _getOneCamera = getOneCamera
) {
  const uuidsAreValid = Array.isArray(uuids) && uuids.every((uuid) => typeof uuid === "string");
  if (uuidsAreValid) {
    let cameras = [];
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
        cameras.push(response.data);
        if (!hasData) hasData = true;
      }
    }
    return { cameras, isError, hasData, hasPartialData };
  }
  throw new Error("The uuids parameter must be an array of strings");
}

/**
 * Get one camera from the API.
 * 
 * @param {string} uuid - The camera uuid.
 * @param {AbortSignal} signal - the fetch abort signal.
 * @returns {Object} The fetch response.
 */
export async function getOneCamera(
  uuid,
  signal
) {
  if (typeof uuid === "string" && uuid.length > 0) {
    let camera = false;
    let isError = false;
    let isNotFound = false;
    const response = await fetch(API_URL + uuid)
      .then(response => response)
      .catch(() => false);
    if (response) {
      if (response.ok) {
        camera = await response.json();
      } else {
        isNotFound = true;
      }
    } else {
      isError = true;
    }
    return { camera, isError, isNotFound };
  }
  throw new Error("The uuid parameter must be a string");
}
