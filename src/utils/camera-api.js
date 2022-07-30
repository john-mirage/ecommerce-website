const API_URL = "http://localhost:3000/api/cameras/";

/**
 * Get all the cameras from the API.
 * 
 * @param {AbortSignal} signal - the fetch abort signal.
 * @returns {Object} The fetch response.
 */
export async function getAllCameras(
  signal
) {
  if (signal instanceof AbortSignal) {
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
    return { cameras, error };
  } else {
    throw new Error("Invalid parameters");
  }
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
  if (
    typeof uuid === "string" &&
    uuid.length > 0 &&
    signal instanceof AbortSignal
  ) {
    let camera = false;
    let error = false;
    const response = await fetch(API_URL + uuid, { signal })
      .then(response => response)
      .catch((error) => error.message);
    if (response instanceof Response) {
      if (response.ok) {
        camera = await response.json();
      } else {
        error = "not-found";
      }
    } else if (typeof response === "string") {
      error = response === "The user aborted a request." ? "aborted" : "error";
    } else {
      throw new Error("unknown response");
    }
    return { camera, error };
  }
  throw new Error("Invalid parameters");
}
