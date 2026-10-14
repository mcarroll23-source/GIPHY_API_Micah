// This code stores the GIPHY API key and connects the search box, button, and GIF container.
console.log("script.js loaded");

const API_KEY = "cXZRSAjShuY8PyAK4jdG799GbRhbbpBp";

const searchInput = document.querySelector("#search-input");
const fetchGifButton = document.querySelector("#fetch-gif-btn");
const gifContainer = document.querySelector("#gif-container");

// This function searches GIPHY and displays the matching GIFs.
async function fetchGifs() {
  const searchTerm = searchInput.value.trim();

  if (searchTerm === "") {
    gifContainer.innerHTML = "<p class='text-center'>Please enter something to search for!</p>";
    return;
  }

  gifContainer.innerHTML = "<p class='text-center'>Loading GIFs...</p>";

  const endpoint = `https://api.giphy.com/v1/gifs/search?api_key=${API_KEY}&q=${encodeURIComponent(searchTerm)}&limit=12&rating=g`;

  try {
    const response = await fetch(endpoint);

    if (!response.ok) {
      throw new Error("Could not retrieve GIFs from GIPHY.");
    }

    const result = await response.json();
    const images = result.data;

    gifContainer.innerHTML = "";

    if (images.length === 0) {
      gifContainer.innerHTML = "<p class='text-center'>No GIFs found. Try another search!</p>";
      return;
    }

    // This loop creates an image element for each GIF returned by GIPHY.
    images.forEach((gif) => {
      const column = document.createElement("div");
      column.className = "col-6 col-md-4 col-lg-3 mb-3";

      const image = document.createElement("img");
      image.src = gif.images.fixed_width.url;
      image.alt = gif.title || "GIPHY search result";
      image.className = "img-fluid rounded";

      column.appendChild(image);
      gifContainer.appendChild(column);
    });
  } catch (error) {
    console.error("Error fetching GIFs:", error);
    gifContainer.innerHTML =
      "<p class='text-center text-danger'>Something went wrong. Please try again.</p>";
  }
}

// This event listener searches for GIFs when the button is clicked.
fetchGifButton.addEventListener("click", fetchGifs);

// This event listener also searches when Enter is pressed in the search box.
searchInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    fetchGifs();
  }
});