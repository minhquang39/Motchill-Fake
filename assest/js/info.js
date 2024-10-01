import { header, footer } from "./general.js";
import Header from "../js/components/Header/Header.js";
import Footer from "../js/components/Footer/Footer.js";
import fetchApi from "./general.js";
import { API_MOVIE } from "./general.js";
import scrollTop from "./utils/scrollTop.js";
import handleHeader from "./components/Header/handleHeader.js";
import handleMultiTab from "./utils/handleMultiTab.js";
import playMovie from "./utils/playMovie.js";

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const slug = urlParams.get("slug");

// let watched = localStorage.getItem("WATCHED") || [];
// console.log(watched);

const info = () => {
  const movieThumb = document.querySelector(".movie-thumb");
  const movieName = document.querySelector(".movie_name");
  const categoryNavbar = document.querySelector("a.category-navbar-name-link");

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

  // Control
  // AbortController;
  const controlBtn = document.querySelector(".btn-control");
  const trailerBtn = document.querySelector(".watch-trailer");
  const watchNowBtn = document.querySelector(".watch-now");

  // Modal
  const modal = document.getElementById("modal");
  const closeModal = document.querySelector(".close-modal");

  // Navbar director
  const countryName = document.querySelector(".category-navbar-name");
  const movieTitle = document.querySelector(".movie-name");

  return {
    async fetchApi() {
      try {
        const data = await fetchApi(`${API_MOVIE}/${slug}`);

        setTimeout(() => {
          this.renderInfoMovie(data);
        }, 1000);
      } catch (error) {
        console.log(error);
      }
    },
    renderInfoMovie(data) {
      movieThumb.src = data.movie.poster_url;

      categoryNavbar.innerHTML = ` <i class="bi bi-chevron-right"></i>
        ${data?.data?.titlePage || "Phim mới"}
        `;
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

      this.renderEpisode(episodeInfo, episodeList);
    },
    renderEpisode(data, element) {
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
    },
    init() {
      const loader = document.querySelector(".loading");
      if (loader) {
        setTimeout(() => {
          document.querySelector(".container").removeChild(loader);
        }, 1000);
      }
    },

    handleEvent() {
      handleMultiTab(".tab-section", ".tab-info");

      trailerBtn.onclick = function (e) {
        playTrailer(e);
      };

      function playTrailer(e) {
        modal.style.display = "flex";
        document.body.style.overflow = "hidden"; // Ngăn cuộn trang
        const trailerLink = e.target.getAttribute("trailer");

        const idLink = trailerLink.split("v=")[1];
        const embedUrl = `https://www.youtube.com/embed/${idLink}`;

        const player = document.querySelector(".player");
        player.src = embedUrl;
      }

      watchNowBtn.onclick = function (e) {
        watchNow(e);
      };

      function watchNow(e) {
        modal.style.display = "flex";
        document.body.style.overflow = "hidden"; // Ngăn cuộn trang
        const link = e.target.getAttribute("link_embed");

        document.querySelector(".episodeItem").classList.add("active");

        const player = document.querySelector(".player");
        player.src = link;
      }

      closeModal.onclick = function () {
        closeModalTrailer();
      };
      function closeModalTrailer(e) {
        modal.style.display = "none";
        document.body.style.overflow = "auto"; // KHôi phục cuộn trang
        document.querySelector(".player").src = "";
        clearClass("episodeItem", "active");
      }
      function clearClass(element, className) {
        const elementList = document.querySelectorAll(`.${element}`);

        elementList.forEach((element) => {
          element.classList.remove(className);
        });
      }
    },
    start() {
      Header(header);
      Footer(footer);
      this.init();
      this.fetchApi();
      this.handleEvent();
    },
  };
};
info().start();

export default slug;
