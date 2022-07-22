const API_URL = "http://localhost:3000/api/cameras/";

/**
 * Get all the cameras from the API.
 * 
 * @returns {Object} The fetch response.
 */
export async function getAllCameras() {
  const response = await fetch(API_URL)
    .then(response => response)
    .catch(error => false);
  if (response) {
    if (response.ok) {
      const cameras = await response.json();
      return { status: "OK", cameras };
    }
    return { status: "NOT_FOUND" }
  }
  return { status: "ERROR" };
}

/**
 * Get one camera from the API.
 * 
 * @param {string} uuid - The camera uuid.
 * @returns {Object} The fetch response.
 */
export async function getOneCamera(uuid) {
  const response = await fetch(API_URL + uuid)
    .then(response => response)
    .catch(error => false);
  if (response) {
    if (response.ok) {
      const camera = await response.json();
      return { status: "OK", camera };
    }
    return { status: "NOT_FOUND" };
  }
  return { status: "ERROR" };
}
