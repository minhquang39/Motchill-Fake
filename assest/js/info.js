const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const slug = urlParams.get("slug");

const movieThumb = document.querySelector(".movie-thumb");
const movieName = document.querySelector(".movie_name");
const movieOriginName = document.querySelector(".movie_origin_name");
const publishDate = document.querySelector(".publish_date");
const episode = document.querySelector(".episode");
const year = document.querySelector(".year");
const country = document.querySelector(".country");
const category = document.querySelector(".category");

const episodeList = document.querySelector(".episodeList");
const description = document.querySelector(".description");

const originName = document.querySelector(".origin_name");
const otherName = document.querySelector(".other_name");
const timePerEpisode = document.querySelector(".timePerEpisode");

const director = document.querySelector(".director");
const actor = document.querySelector(".actor");

const trailerBtn = document.querySelector(".watch-trailer");
const watchNowBtn = document.querySelector(".watch-now");

// Modal
const modal = document.getElementById("modal");
const closeModal = document.querySelector(".close-modal");

// Navbar director
const countryName = document.querySelector(".category-navbar-name");
const movieTitle = document.querySelector(".movie-name");
fetchApi(`https://phimapi.com/phim/${slug}`).then((data) => {
  // console.log(data);

  movieThumb.src = data.movie.poster_url;
  movieName.innerText = data.movie.name;
  movieOriginName.innerText = data.movie.origin_name;
  publishDate.innerText = `Created at: ${new Date(
    data.movie.created.time
  ).toLocaleDateString()}`;
  episode.innerText = data.movie.episode_current;
  year.innerText = data.movie.year;
  country.innerHTML = `<i class="bi bi-dot"></i>${data.movie.country[0].name}`;

  countryName.innerHTML = `<i class="bi bi-chevron-right"></i> ${data.movie.country[0].name}`;
  movieTitle.innerHTML = `<i class="bi bi-chevron-right"></i> ${data.movie.name}`;

  const newCategory = data.movie.category
    .map((item) => {
      return item.name;
    })
    .join(", ");

  category.innerHTML = `<i class="bi bi-dot"></i>${newCategory}`;

  description.innerText = data.movie.content;

  originName.innerText = data.movie.name;
  otherName.innerText = data.movie.origin_name;
  timePerEpisode.innerText = data.movie.time;

  const newActor = data.movie.actor
    .map((item) => {
      return item;
    })
    .join(", ");
  const newDirector = data.movie.director
    .map((item) => {
      return item;
    })
    .join(", ");

  actor.innerText = newActor;
  director.innerText = newDirector;
  const episodeInfo = data.episodes[0].server_data;

  const firstEpisode = data?.episodes[0]?.server_data[0];

  watchNowBtn.setAttribute("link_embed", firstEpisode.link_embed);

  const trailer = data.movie.trailer_url;

  if (trailer) {
    trailerBtn.classList.remove("hide");
    trailerBtn.setAttribute("trailer", trailer);
  } else {
    trailerBtn.classList.add("hide");
  }

  renderEpisode(episodeInfo, episodeList);
});

function renderEpisode(data, element) {
  let html = "";

  data.forEach((item) => {
    const episodeSlug = item.slug;
    const embed = item.link_embed;
    const m3u8 = item.link_m3u8;
    html += `
             <li class="episodeItem"><a href="#" embed="${embed}" m3u8="${m3u8}" onclick="playMovie(event)">${item.name}</a></li>
        `;
  });

  element.innerHTML = html;
}
function clearClass(element, className) {
  const elementList = document.querySelectorAll(`.${element}`);

  elementList.forEach((element) => {
    element.classList.remove(className);
  });
}

trailerBtn.onclick = function (e) {
  playTrailer(e);
};

closeModal.onclick = function (e) {
  closeModalTrailer(e);
};

function playMovie(e) {
  modal.style.display = "flex";
  document.body.style.overflow = "hidden"; // Ngăn cuộn trang
  const link = e.target.getAttribute("embed");

  e.target.parentElement.classList.add("active");

  const player = document.querySelector(".player");
  player.src = link;
}

function playTrailer(e) {
  modal.style.display = "flex";
  document.body.style.overflow = "hidden"; // Ngăn cuộn trang
  const trailerLink = e.target.getAttribute("trailer");

  const idLink = trailerLink.split("v=")[1];
  const embedUrl = `https://www.youtube.com/embed/${idLink}`;

  const player = document.querySelector(".player");
  player.src = embedUrl;
}

function watchNow(e) {
  modal.style.display = "flex";
  document.body.style.overflow = "hidden"; // Ngăn cuộn trang
  const link = e.target.getAttribute("link_embed");

  document.querySelector(".episodeItem").classList.add("active");

  const player = document.querySelector(".player");
  player.src = link;
}

function closeModalTrailer(e) {
  modal.style.display = "none";
  document.body.style.overflow = "auto"; // KHôi phục cuộn trang
  document.querySelector(".player").src = "";
  clearClass("episodeItem", "active");
}

// function clearClass(element, className) {
//   const elementList = document.querySelectorAll(`.${element}`);
//   console.log(elementList);
// }

// clearClass("episodeItem", "className");

const tabNamess = document.querySelectorAll(".tab-section");
const tabContentss = document.querySelectorAll(".tab-info");

tabNamess.forEach((tabName, index) => {
  tabName.onclick = function (e) {
    document.querySelector(".tab-section.active").classList.remove("active");
    tabNamess[index].classList.add("active");

    document.querySelector(".tab-info.active").classList.remove("active");
    tabContentss[index].classList.add("active");
  };
});
