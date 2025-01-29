import axios from "axios";

export function fetchNews(callback) {
  axios
    .get(
      "https://newsapi.org/v2/everything?q=tesla&from=2024-12-29&sortBy=publishedAt&apiKey=093c01deb6b54ae9becbbc755e2f8e48"
    )
    .then((response) => {
      callback(response.data);
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
}
