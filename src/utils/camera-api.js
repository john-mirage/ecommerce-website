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
 * Get some cameras from the API.
 * 
 * @param {string[]} uuids - The uuids of the cameras.
 * @param {(uuid) => Object} getOneCamera - The function used to retrieve one camera.
 * @returns {Object} The fetch response.
 */
export async function getSomeCameras(uuids, getOneCamera = getOneCamera) {
  let fullData = false;
  let fullError = false;
  for(const uuid of uuids) {
    const { data, error } = getOneCamera(uuid);
    if (typeof error === "string") {
      if (error === "ERROR") {
        fullData = false;
        fullError = "ERROR";
        break;
      }
    } else {
      if (Array.isArray(fullData)) {
        fullData.push(data);
      } else {
        fullData = [data];
      }
    }
  }
  return {data: fullData, error: fullError};
}

/**
 * Get one camera from the API.
 * 
 * @param {string} uuid - The camera uuid.
 * @returns {Object} The fetch response.
 */
export async function getOneCamera(uuid) {
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
