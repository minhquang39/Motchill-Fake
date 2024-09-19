fetchApi("https://phimapi.com/danh-sach/phim-moi-cap-nhat?page=1").then(
  (data) => {
    const items = data.items;

    let html = "";
    items.forEach((item) => {
      console.log(item);

      html += `
              <div class="col-sm-6 col-md-4 col-lg-4">
                            <div class="movie">
                                <a href="info.html?slug=${item.slug}">
                                    <img src="${item.thumb_url}" alt=""
                                        class="movie-thumb img-fluid" loading="lazy">
                                </a>
                                <p class="movieName">${item.origin_name}</p>
                                <p class="releaseTime">${item.year}</p>
                            </div>
                        </div>
    `;
    });
    popularFilm.innerHTML = html;
  }
);
// Phim bộ
fetchApi("https://phimapi.com/v1/api/danh-sach/phim-bo").then((data) => {
  const items = data.data.items;

  let html = "";
  items.forEach((item, index) => {
    html += `
              <div class="col-6 col-sm-4 col-lg-3  ${index > 7 ? "hide" : ""}">
                            <div class="movie">
                                <a href="info.html?slug=${item.slug}">
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
                                <p class="movieName">${item.name}</p>
                                <p class="releaseTime">${item.year}</p>
                            </div>
                        </div>
    `;
  });
  html += `  <div class="d-flex justify-content-center align-items-center"> <a href="category.html" class="text-center btn-loadmore">Xem thêm >></a> </div>`;

  seriesFilm.innerHTML = html;
});
// Phim lẻ
fetchApi("https://phimapi.com/v1/api/danh-sach/phim-le").then((data) => {
  const items = data.data.items;

  let html = "";
  items.forEach((item, index) => {
    html += `
              <div class=" col-6 col-sm-4 col-lg-3  ${index > 7 ? "hide" : ""}">
                            <div class="movie">
                                <a href="info.html?slug=${item.slug}">
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
                                <p class="movieName">${item.name}</p>
                                <p class="releaseTime">${item.year}</p>
                            </div>
                        </div>
    `;
  });
  html += `  <div class="d-flex justify-content-center align-items-center"> <a href="category.html" class="text-center btn-loadmore">Xem thêm >></a> </div>`;

  singleFilm.innerHTML = html;
});

// Hoạt hình
fetchApi("https://phimapi.com/v1/api/danh-sach/hoat-hinh").then((data) => {
  const items = data.data.items;

  let html = "";
  items.forEach((item, index) => {
    html += `
              <div class="col-6 col-sm-4 col-lg-3 ${index > 7 ? "hide" : ""}">
                            <div class="movie">
                                <a href="info.html?slug=${item.slug}">
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
                                <p class="movieName">${item.name}</p>
                                <p class="releaseTime">${item.year}</p>
                            </div>
                        </div>
    `;
  });

  cartoonFilm.innerHTML = html;
});

tabNames.forEach((tabName, index) => {
  tabName.onclick = function (e) {
    document
      .querySelector(".tab_category_title.active")
      .classList.remove("active");
    tabNames[index].classList.add("active");

    document
      .querySelector(".tab_category_content.active")
      .classList.remove("active");
    tabContents[index].classList.add("active");
  };
});

btnPopularLeft.onclick = function (e) {
  const popularFilmWidth = popularFilm.querySelector("div").clientWidth;
  popularFilm.scrollLeft -= popularFilmWidth;
};

btnPopularRight.onclick = function (e) {
  const popularFilmWidth = popularFilm.querySelector("div").clientWidth;
  popularFilm.scrollLeft += popularFilmWidth;
};

//
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
})();
