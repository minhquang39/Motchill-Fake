const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const keyword = urlParams.get("keyword");

const movieResult = document.querySelector(".movie_result");
const movieView = document.querySelector(".movies");

fetchApi(`https://phimapi.com/v1/api/tim-kiem?keyword=${keyword}`).then(
  (data) => {
    const total = data.data.params.pagination.totalItems;
    movieResult.innerText = `Tìm thấy ${total} kết quả về ${keyword}`;
    console.log(data.data.items);

    const items = data.data.items;
    let html = "";
    items.forEach((item) => {
      const slugMovie = item.slug;

      html += `
                    <div class="col-6 col-sm-4 col-lg-2">
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
                                  <p class="movieName text-center">${
                                    item.name
                                  }</p>
                            </div>
                         
               </div> 
            </div>
            `;
    });
    movieView.innerHTML = html;
  }
);
