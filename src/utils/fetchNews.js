import axios from "axios";
// https://newsdata.io/api/1/latest?apikey=pub_7235401b32874f69f72e323f2e2b2bc4375d5
const API_KEY = "pub_724174ed749f8bb9eef29370aec2426f86883";
const BASE_URL = "https://newsdata.io/api/1/latest";

/**
 * Handles API errors and returns a meaningful message.
 */
function handleError(error) {
  let errorMessage = "An error occurred while fetching news.";

  if (error.response) {
    // API responded with a status code
    if (error.response.status === 429) {
      errorMessage = "Too many requests. Please try again later.";
    } else {
      errorMessage = `Error: ${error.response.statusText}`;
    }
  } else if (error.request) {
    // No response received
    errorMessage = "Network error. Please check your connection.";
  }
  
  return new Error(errorMessage);
}

/**
 * Fetches news articles for a given country.
 * @param {string} country - The country code (default: "ng").
 * @param {function} callback - The callback function to handle the response.
 */
export function fetchCountry(country = "ng", callback) {
  axios
    .get(`${BASE_URL}?apikey=${API_KEY}&country=${country}`)
    .then((response) => {
      if (response.data.status === "error") {
        throw new Error("Too many requests, please try again later.");
      }
      callback(response.data, null);
    })
    .catch((error) => {
      callback(null, handleError(error));
    });
}
