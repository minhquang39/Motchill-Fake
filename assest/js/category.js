import Header from "./components/Header/Header.js";
import Footer from "./components/Footer/Footer.js";
import fetchApi from "./general.js";
import renderPagination from "./utils/renderPagination.js";
import { header, footer } from "./general.js";
import handleHeader from "./components/Header/handleHeader.js";
import addOrUpdateUrlParameter from "./utils/updateUrlParameter.js";

// const moviesArea = document.querySelector(".movies");
// const pagination = document.getElementById("Pagination");
// var totalPages;
// let start;
// let end;

// const queryString = window.location.search;
// const urlParams = new URLSearchParams(queryString);
// let currentPage = parseInt(urlParams.get("page"));
// if (isNaN(currentPage)) currentPage = 1;

// function addOrUpdateUrlParameter(key, value) {
//   const queryString = window.location.search;
//   const urlParams = new URLSearchParams(queryString);
//   urlParams.set(key, value);
//   const newUrl = window.location.pathname + "?" + urlParams.toString();
//   history.pushState(null, "", newUrl);
// }

// function renderMovie(data, element) {
//   let html = "";
//   data.forEach((item) => {
//     const slugMovie = item.slug;
//     html += `
//             <div class="col-6 col-sm-4 col-lg-3">
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
//                                     }" alt=""
//                                         class="movie-thumb img-fluid" loading="lazy">
//                                 </a>

//                                   <p class="episode">${
//                                     item?.episode_current
//                                   }</p>
//                                   <p class="quality">${item.year}</p>

//                             </div>
//                             <div class="movie-info mt-3">
//                                     <p class="movieName">${item.name}</p>
//                                     <p class="originName pb-3">${
//                                       item?.origin_name
//                                     }</p>
//                             </div>
//                </div>
//             </div>
//     `;
//   });
//   element.innerHTML = html;
// }

// function renderPagination(totalPages, element, start, end) {
//   let html = "";

//   if (totalPages < 10) {
//     for (let i = start; i <= end; i++) {
//       html += `<a class="page-item " href="#">${i}</a>`;
//     }
//   } else {
//     html = `<a class="page-item ${
//       currentPage === 1 ? "active" : ""
//     } " href="#">1</a>
//     <a class="page-item less-page ${
//       currentPage === 2 ? "active" : ""
//     } " href="#">${currentPage === totalPages ? "..." : 2}</a>`;
//     for (let i = start; i <= end; i++) {
//       html += `<a class="page-item ${
//         currentPage === i ? "active " : ""
//       }" href="#">${i}</a>`;
//     }
//   }
//   html += `
//     <a class="page-item more-page " href="#" >${
//       currentPage === totalPages ? totalPages - 1 : "..."
//     }</a>
//    <a class="page-item total-page ${
//      currentPage === totalPages ? "active" : ""
//    } " href="#">${totalPages}</a>`;
//   element.innerHTML = html;
// }

// pagination.onclick = function (e) {
//   if (start > 1 && start <= totalPages) {
//     const pageItemNumber = parseInt(e.target.innerText);
//     if (Number.isInteger(pageItemNumber)) {
//       currentPage = pageItemNumber;
//       if (currentPage == 1) {
//         start = 3;
//         end = 5;
//       }
//       getMovie(currentPage);
//       addOrUpdateUrlParameter("page", currentPage);
//     }
//     if (e.target.classList.contains("total-page")) {
//       start = totalPages - 4;
//       end = totalPages - 2;
//       renderPagination(totalPages, pagination, start, end);
//     }
//     if (e.target.classList.contains("more-page")) {
//       renderPagination(totalPages, pagination, ++start, ++end);
//       document.querySelector(".less-page").innerText = "...";
//       addOrUpdateUrlParameter("page", currentPage);
//     }
//     if (e.target.classList.contains("less-page")) {
//       if (start == 3) {
//         document.querySelector(".less-page").innerText = "2";
//         return;
//       }
//       renderPagination(totalPages, pagination, --start, --end);
//       document.querySelector(".less-page").innerText = "...";
//       document.querySelector(".more-page").innerText = "...";
//       addOrUpdateUrlParameter("page", currentPage);
//     }
//   }
// };

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
let currentPage = parseInt(urlParams.get("page"));
// if (isNaN(currentPage)) currentPage = 1;

const categoryDetail = () => {
  const linkApi = localStorage.getItem("LINK-API");

  const categoryTitle = document.querySelector(".category_title");
  const categoryNavbar = document.querySelector(".category-navbar-name");

  const moviesArea = document.querySelector(".movies");
  const pagination = document.getElementById("Pagination");

  var totalPages;
  let start = 2;
  let end = 5;

  return {
    async getMovie(currentPage = 1) {
      const data = await fetchApi(`${linkApi}?page=${currentPage}`);

      categoryTitle.innerText = data?.data?.titlePage || "Phim mới";
      categoryNavbar.innerHTML = `
        <i class="bi bi-chevron-right"></i>
        <a href="category.html?slug=${data.data.type_list}">
          ${data?.data?.titlePage || "Phim mới"}
        </a>
      `;

      const movies = data.data.items;
      totalPages = data.data.params.pagination.totalPages;

      this.renderMovie(movies, moviesArea);
      start = 3;
      end = 5;
      renderPagination(totalPages, pagination, start, end);
    },
    renderMovie(data, element) {
      let html = "";
      data.forEach((item) => {
        const slugMovie = item.slug;
        html += `
            <div class="col-6 col-sm-4 col-lg-3">
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
                                    }" alt=""
                                        class="movie-thumb img-fluid" loading="lazy">
                                </a>

                                  <p class="episode">${
                                    item?.episode_current
                                  }</p>
                                  <p class="quality">${item.year}</p>

                            </div>
                            <div class="movie-info mt-3">
                                    <p class="movieName">${item.name}</p>
                                    <p class="originName pb-3">${
                                      item?.origin_name
                                    }</p>
                            </div>
               </div> 
            </div>
    `;
      });
      element.innerHTML = html;
    },

    handleEvent() {
      const _this = this;
      pagination.onclick = function (e) {
        if (start > 1 && start <= totalPages) {
          const pageItemNumber = parseInt(e.target.innerText);
          if (Number.isInteger(pageItemNumber)) {
            currentPage = pageItemNumber;

            if (currentPage == 1) {
              start = 3;
              end = 5;
            }
            _this.getMovie(currentPage);
            renderPagination(totalPages, pagination, start, end);
            addOrUpdateUrlParameter("page", currentPage);
          }
          if (e.target.classList.contains("total-page")) {
            start = totalPages - 4;
            end = totalPages - 2;
            renderPagination(totalPages, pagination, start, end);
          }
          if (e.target.classList.contains("more-page")) {
            renderPagination(totalPages, pagination, ++start, ++end);
            document.querySelector(".less-page").innerText = "...";
            addOrUpdateUrlParameter("page", currentPage);
          }
          if (e.target.classList.contains("less-page")) {
            if (start == 3) {
              document.querySelector(".less-page").innerText = "2";
              return;
            }
            renderPagination(totalPages, pagination, --start, --end);
            document.querySelector(".less-page").innerText = "...";
            document.querySelector(".more-page").innerText = "...";
            addOrUpdateUrlParameter("page", currentPage);
          }
        }
      };
    },
    start() {
      Header(header);
      Footer(footer);
      this.getMovie(currentPage);
      this.handleEvent();
    },
  };
};

categoryDetail().start();

export default currentPage;
