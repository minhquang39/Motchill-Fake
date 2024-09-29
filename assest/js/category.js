import Header from "./components/Header/Header.js";
import Footer from "./components/Footer/Footer.js";
import fetchApi from "./general.js";
// import renderPagination from "./utils/renderPagination.js";
import { header, main, footer } from "./general.js";
import handleHeader from "./components/Header/handleHeader.js";
import scrollTop from "./utils/scrollTop.js";
import addOrUpdateUrlParameter from "./utils/updateUrlParameter.js";

// const queryString = window.location.search;
// const urlParams = new URLSearchParams(queryString);
// let currentPage = parseInt(urlParams.get("page"));
// if (isNaN(currentPage)) currentPage = 1;

const categoryDetail = () => {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  let currentPage = parseInt(urlParams.get("page"));

  if (isNaN(currentPage)) currentPage = 1;

  console.log(currentPage);

  const linkApi = localStorage.getItem("LINK-API");

  const categoryTitle = document.querySelector(".category_title");
  const categoryNavbar = document.querySelector(".category-navbar-name");

  const moviesArea = document.querySelector(".movies");
  const pagination = document.getElementById("Pagination");

  var totalPages;

  var page = 5;

  return {
    async getMovie(currentPage = 1) {
      try {
        const data = await fetchApi(`${linkApi}?page=${currentPage}`);

        setTimeout(() => {
          categoryTitle.innerText = data?.data?.titlePage || "Phim mới";
          categoryNavbar.innerHTML = `
          <a href="category.html?slug=${data.data.type_list}">
          ${data?.data?.titlePage || "Phim mới"}
          </a>
          `;
          const movies = data.data.items;
          this.renderMovie(movies, moviesArea);
          totalPages = data.data.params.pagination.totalPages;
          localStorage.setItem("TOTAL-PAGES", JSON.stringify(totalPages));
          this.renderPagination(totalPages, currentPage, pagination);
        }, 2000);
      } catch (error) {
        console.log(error);
      }
    },
    renderMovie(data, element) {
      let html = "";
      data.forEach((item) => {
        const slugMovie = item.slug;
        html += `
            <div class="col-6 col-sm-4 col-lg-3 col2">
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
    renderPagination(total, page, element) {
      let html = "";
      let activePage = "";
      let beforePage = page - 1;
      let afterPage = page + 1;

      // if (page == 1) {
      //   beforePage = 1;
      //   afterPage = afterPage + 2;
      // } else if (page == 2) {
      //   beforePage = 1;
      //   afterPage = afterPage + 2;
      // }

      if (page == total) {
        afterPage = total;
        beforePage = beforePage - 3;
      }

      if (page > 1) {
        html = `<a class="btn btn-prev" onclick="categoryDetail().renderPagination(${total},${
          page - 1
        },document.getElementById('${element.id}'))"><</a>`;
      }

      if (page > 2) {
        html += `<a class="page-item" onclick="categoryDetail().renderPagination(${total},${1},document.getElementById('${
          element.id
        }'))" >1</a>`;
        if (page > 3) {
          html += `<a class="dots">...</a>`;
        }
      }

      for (let pos = beforePage; pos <= afterPage; pos++) {
        if (pos == 0 || pos == total + 1) continue;
        html += `<a class="page-item ${
          currentPage === pos ? "active" : ""
        }" onclick="categoryDetail().renderPagination(${total},${pos},document.getElementById('${
          element.id
        }'))">${pos}</a>`;
      }

      if (page < total - 1) {
        if (page < total - 2) {
          html += `<a class="dots">...</a>`;
        }
        html += `<a class="page-item" onclick="categoryDetail().renderPagination(${total},${total},document.getElementById('${element.id}'))" >${total}</a>`;
      }

      if (page < total) {
        html += `<a class="btn btn-next" onclick="categoryDetail().renderPagination(${total},${
          page + 1
        },document.getElementById('${element.id}'))" >></a>`;
      }

      element.innerHTML = html;
    },
    init() {
      const loader = document.querySelector(".loading");
      if (loader) {
        setTimeout(() => {
          document.querySelector(".container").removeChild(loader);
        }, 2000);
      }
    },

    handleEvent() {
      const _this = this;
      function setActive(e) {
        const pageItem = e.target.closest(".page-item"); // Lấy phần tử cha gần nhất có class "page-item"
        const pageNumber = parseInt(pageItem.innerText);
        if (pageItem && Number.isInteger(pageNumber)) {
          currentPage = pageNumber;
          _this.getMovie(currentPage);
          addOrUpdateUrlParameter("page", currentPage);
        }

        // Nếu không có phần tử pageItem nào được tìm thấy, thoát ra
        if (!pageItem) return;

        // Kiểm tra nếu có phần tử nào khác đang có class "active"
        const hadActive = document.querySelector(".page-item.active");

        // Nếu có và phần tử đó không phải là phần tử vừa nhấp vào, loại bỏ class "active" khỏi nó
        if (hadActive && hadActive !== pageItem) {
          hadActive.classList.remove("active");
        }

        // Thêm class "active" vào phần tử hiện tại nếu nó chưa có class "active"
        if (!pageItem.classList.contains("active")) {
          pageItem.classList.add("active");
        }
      }

      pagination.onclick = function (e) {
        setActive(e);
      };
    },
    start() {
      Header(header);
      Footer(footer);
      this.init();
      this.getMovie(currentPage);
      this.handleEvent();
    },
  };
};

categoryDetail().start();

window.categoryDetail = categoryDetail;
