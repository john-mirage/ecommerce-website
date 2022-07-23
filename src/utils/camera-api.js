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
