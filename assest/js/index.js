import fetchApi from "./general.js";
import {
  API_NEWS,
  API_FEATUREFILM,
  API_TELEVISIONSERIES,
  API_CARTOON,
} from "./general.js";
import Header from "./components/Header/Header.js";
import Footer from "./components/Footer/Footer.js";
import { header, footer } from "./general.js";
import Movie from "./components/Content/Movie.js";
import scrollToTop from "./utils/scrollTop.js";
import handlePreNext from "./utils/handlePreNext.js";
import handleMultiTab from "./utils/handleMultiTab.js";

const app = () => {
  const popularFilm = document.getElementById("popularFilm");
  const seriesFilm = document.getElementById("series-film");
  const singleFilm = document.getElementById("single-film");
  const cartoonFilm = document.getElementById("cartoonFilm");

  return {
    async render() {
      const [popularMovie, seriesMovie, singesMovie, cartoonMovie] =
        await Promise.all([
          fetchApi(API_NEWS),
          fetchApi(API_TELEVISIONSERIES),
          fetchApi(API_FEATUREFILM),
          fetchApi(API_CARTOON),
        ]);

      setTimeout(() => {
        Movie(popularMovie.items, popularFilm);
        Movie(seriesMovie.data.items, seriesFilm);
        Movie(singesMovie.data.items, singleFilm);
        Movie(cartoonMovie.data.items, cartoonFilm);
      }, 0);
    },
    handleEvent() {
      handlePreNext(
        document.querySelector(".topic-popular .btn-left"),
        document.querySelector(".topic-popular .btn-right"),
        popularFilm
      );
      (() => {
        let isDown = false;
        let startX;
        let scrollLeft;
        const slider = document.querySelector("#popularFilm");

        const end = () => {
          isDown = false;
          slider.classList.remove("active");
        };

        const start = (e) => {
          isDown = true;
          slider.classList.add("active");
          startX = e.pageX || e.touches[0].pageX - slider.offsetLeft;
          scrollLeft = slider.scrollLeft;
        };

        const move = (e) => {
          if (!isDown) return;

          e.preventDefault();
          requestAnimationFrame(() => {
            const x = e.pageX || e.touches[0].pageX - slider.offsetLeft;
            const dist = x - startX;
            slider.scrollLeft = scrollLeft - dist;
          });
        };

        slider.addEventListener("mousedown", start);
        slider.addEventListener("touchstart", start);

        slider.addEventListener("mousemove", move);
        slider.addEventListener("touchmove", move);

        slider.addEventListener("mouseleave", end);
        slider.addEventListener("mouseup", end);
        slider.addEventListener("touchend", end);
      })(),
        handleMultiTab(
          document.querySelectorAll(".tab_category_title"),
          document.querySelectorAll(".tab_category_content")
        );
    },
    start() {
      Header(header);
      Footer(footer);
      this.render();
      this.handleEvent();
    },
  };
};

app().start();
