

const images = [
  "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=900",
  "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=900",
  "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=900",
  "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=900",
  "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=900"
];

const track = document.getElementById("carouselTrack");
const dotsContainer = document.getElementById("carouselDots");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");

let currentIndex = 0;


images.forEach((src, index) => {
  const img = document.createElement("img");
  img.src = src;
  img.alt = `Nature slide ${index + 1}`;
  track.appendChild(img);

  const dot = document.createElement("span");
  dot.classList.add("dot");
  dot.dataset.index = index;
  dot.addEventListener("click", () => {
    currentIndex = index;
    updateCarousel();
  });
  dotsContainer.appendChild(dot);
});

const dots = document.querySelectorAll(".dot");

function updateCarousel() {
  track.style.transform = `translateX(-${currentIndex * 100}%)`;
  dots.forEach((dot, i) => {
    dot.classList.toggle("active", i === currentIndex);
  });
}

prevBtn.addEventListener("click", () => {
  currentIndex = (currentIndex - 1 + images.length) % images.length;
  updateCarousel();
});

nextBtn.addEventListener("click", () => {
  currentIndex = (currentIndex + 1) % images.length;
  updateCarousel();
});


setInterval(() => {
  currentIndex = (currentIndex + 1) % images.length;
  updateCarousel();
}, 5000);

updateCarousel();


const jokeDisplay = document.getElementById("jokeDisplay");
const getJokeBtn = document.getElementById("getJokeBtn");

async function getRandomJoke() {
  try {
    getJokeBtn.disabled = true;
    getJokeBtn.textContent = "Loading...";

    const response = await fetch("https://v2.jokeapi.dev/joke/Programming?type=single");
    const data = await response.json();

    if (data.type === "single") {
      jokeDisplay.innerHTML = `<p>${data.joke}</p>`;
    } else {
      jokeDisplay.innerHTML = `<p>${data.setup}<br><br><strong>${data.delivery}</strong></p>`;
    }
  } catch (error) {
    jokeDisplay.innerHTML = "<p>Sorry, couldn't fetch a joke right now 😅</p>";
    console.error("Joke API error:", error);
  } finally {
    getJokeBtn.disabled = false;
    getJokeBtn.textContent = "Get New Joke 😄";
  }
}

getJokeBtn.addEventListener("click", getRandomJoke);

getRandomJoke();