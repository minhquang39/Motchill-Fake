import Header from "../js/components/Header/Header.js";
import Footer from "../js/components/Footer/Footer.js";
import { header, footer } from "./general.js";
import fetchApi from "./general.js";

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const keyword = urlParams.get("keyword");

const searchMovie = () => {
  const movieResult = document.querySelector(".movie_result");
  const movieView = document.querySelector(".movies");

  return {
    async fetchResult() {
      try {
        const data = await fetchApi(
          `https://phimapi.com/v1/api/tim-kiem?keyword=${keyword}`
        );

        setTimeout(() => {
          const total = data.data.params.pagination.totalItems;
          movieResult.innerText = `Tìm thấy ${total} kết quả về ${keyword}`;
          this.renderMovie(data.data.items, movieView);
        }, 1000);
      } catch (error) {
        console.log(error);
      }
    },
    renderMovie(data, element) {
      let html = ``;
      data.forEach((item) => {
        const slugMovie = item.slug;

        html += `
                    <div class="col-6 col-sm-4 col-lg-2 col2">
                <div class="movie-content">
                            <div class="movie">
                               <a href="info.html?slug=${slugMovie}">

                                    <img src="${
                                      item?.poster_url.includes(
                                        "https://img.phimapi.com"
                                      )
                                        ? item.poster_url
                                        : "https://img.phimapi.com/" +
                                          item?.poster_url
                                    }" alt="" loading="lazy"
                                        class="movie-thumb img-fluid" loading="lazy">
                                </a>

                                  <p class="episode">${
                                    item?.episode_current
                                  }</p>
                                  <p class="quality">${item.year}</p>
                                  <div class=movie-name>
                                  <p class="movieName text-center">${
                                    item.name
                                  }</p>
                                  </div>
                            </div>
                         
               </div> 
            </div>
            `;
        element.innerHTML = html;
      });
    },
    init() {
      const loader = document.querySelector(".loading");
      if (loader) {
        setTimeout(() => {
          document.querySelector(".container").removeChild(loader);
        }, 2000);
      }
    },
    start() {
      Header(header);
      Footer(footer);
      this.init();
      this.fetchResult();
    },
  };
};

searchMovie().start();

// fetchApi(`https://phimapi.com/v1/api/tim-kiem?keyword=${keyword}`).then(
//   (data) => {
//     const total = data.data.params.pagination.totalItems;
//     movieResult.innerText = `Tìm thấy ${total} kết quả về ${keyword}`;
//     console.log(data.data.items);

//     const items = data.data.items;
//     let html = "";
//     items.forEach((item) => {
//       const slugMovie = item.slug;

//       html += `
//                     <div class="col-6 col-sm-4 col-lg-2 col2">
//                 <div class="movie-content">
//                             <div class="movie">
//                                <a href="info.html?slug=${slugMovie}">

//                                     <img src="${
//                                       item?.poster_url.includes(
//                                         "https://img.phimapi.com"
//                                       )
//                                         ? item.poster_url
//                                         : "https://img.phimapi.com/" +
//                                           item?.poster_url
//                                     }" alt="" loading="lazy"
//                                         class="movie-thumb img-fluid" loading="lazy">
//                                 </a>

//                                   <p class="episode">${
//                                     item?.episode_current
//                                   }</p>
//                                   <p class="quality">${item.year}</p>
//                                   <p class="movieName text-center">${
//                                     item.name
//                                   }</p>
//                             </div>

//                </div>
//             </div>
//             `;
//     });
//     movieView.innerHTML = html;
//   }
// );
