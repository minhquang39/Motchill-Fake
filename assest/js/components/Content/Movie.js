const Movie = (data, element) => {
  let html = "";
  data.forEach((item) => {
    html += `
              <div class=" col-6 col-sm-4 col-lg-3 col2 ">
                            <div class="movie">
                                <a href="info.html?slug=${item.slug}">
                                    <img src="${
                                      [
                                        "https://img.phimapi.com/",
                                        "https://phimimg.com/",
                                      ].some((url) =>
                                        item?.poster_url.includes(url)
                                      )
                                        ? item.poster_url
                                        : "https://img.phimapi.com/" +
                                          item?.poster_url
                                    }
                                    " alt=""
                                        class="movie-thumb img-fluid" loading="lazy">
                                </a>
                                <div class="movieInfo">
                                <a href="info.html?slug=${item.slug}">
                                    <p class="movieName">${item.name}</p>
                                    <p class="releaseTime">${item.year}</p>
                                    </a>
                                </div>
                            </div>
                        </div>
    `;
  });
  element.innerHTML = html;
};

export default Movie;
