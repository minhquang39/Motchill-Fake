const linkApi = localStorage.getItem("LINK-API");
const categoryTitle = document.querySelector(".category_title");
const categoryNavbar = document.querySelector(".category-navbar-name");
const moviesArea = document.querySelector(".movies");
const pagination = document.getElementById("Pagination");
var totalPages;
let start = 3;
let end = 5;

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
let currentPage = parseInt(urlParams.get("page"));
if (isNaN(currentPage)) currentPage = 1;

function addOrUpdateUrlParameter(key, value) {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  urlParams.set(key, value);
  const newUrl = window.location.pathname + "?" + urlParams.toString();
  history.pushState(null, "", newUrl);
}

async function getMovie(currentPage = 1) {
  const data = await fetchApi(`${linkApi}?page=${currentPage}`);
  //   fetchApi(`${linkApi}?page=${currentPage}`).then((data) => {

  categoryTitle.innerText = data?.data?.titlePage || "Phim mới";
  categoryNavbar.innerHTML =
    `<i class="bi bi-chevron-right"></i>` + data?.data?.titlePage || "Phim mới";

  const movies = data.data.items;
  totalPages = data.data.params.pagination.totalPages;

  renderMovie(movies, moviesArea);
  renderPagination(totalPages, pagination, start, end);
}
getMovie(currentPage);

function renderMovie(data, element) {
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
}

function renderPagination(totalPages, element, start, end) {
  let html = "";

  if (totalPages < 10) {
    for (let i = start; i <= end; i++) {
      html += `<a class="page-item " href="#">${i}</a>`;
    }
  } else {
    html = `<a class="page-item ${
      currentPage === 1 ? "active" : ""
    } " href="#">1</a>
    <a class="page-item less-page ${
      currentPage === 2 ? "active" : ""
    } " href="#">${currentPage === totalPages ? "..." : 2}</a>`;
    for (let i = start; i <= end; i++) {
      html += `<a class="page-item ${
        currentPage === i ? "active " : ""
      }" href="#">${i}</a>`;
    }
  }
  html += `
    <a class="page-item more-page " href="#" >${
      currentPage === totalPages ? totalPages - 1 : "..."
    }</a>
   <a class="page-item total-page ${
     currentPage === totalPages ? "active" : ""
   } " href="#">${totalPages}</a>`;
  element.innerHTML = html;
}

pagination.onclick = function (e) {
  if (start > 1 && start <= totalPages) {
    const pageItemNumber = parseInt(e.target.innerText);
    if (Number.isInteger(pageItemNumber)) {
      currentPage = pageItemNumber;
      if (currentPage == 1) {
        start = 3;
        end = 5;
      }
      getMovie(currentPage);
      addOrUpdateUrlParameter("page", currentPage);
    }
    if (e.target.classList.contains("total-page")) {
      start = totalPages - 4;
      end = totalPages - 2;
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
