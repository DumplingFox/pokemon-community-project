// https://developer.mozilla.org/en-US/docs/Web/API/Window/DOMContentLoaded_event
document.addEventListener("DOMContentLoaded", () => {
  console.log("myproject JS imported successfully!");
});

// changing like button style
const likeButton = document.getElementById("like-button");

likeButton.addEventListener("click", () => {
  const pokemonId = likeButton.dataset.pokemonId;

  fetch(`/pokemon/${pokemonId}/like`, { method: "POST" })
    .then((response) => {
      if (response.ok) {
        likeButton.classList.add("liked");
      }
    })
    .catch((err) => {
      console.error(err);
    });
});