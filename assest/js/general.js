export const API_FEATUREFILM = `https://phimapi.com/v1/api/danh-sach/phim-le`;
export const API_TELEVISIONSERIES = `https://phimapi.com/v1/api/danh-sach/phim-bo`;
export const API_CARTOON = `https://phimapi.com/v1/api/danh-sach/hoat-hinh`;
export const API_CATEGORY = `https://phimapi.com/the-loai`;
export const API_COUNTRY = `https://phimapi.com/quoc-gia`;
export const API_NEWS = `https://phimapi.com/danh-sach/phim-moi-cap-nhat?page=1`;
export const API_MOVIE = "https://phimapi.com/phim";

export const header = document.querySelector("header");
export const footer = document.querySelector("footer");
export const main = document.querySelector("main");

// const search = document.getElementById("search");

// Fetch Api function
const fetchApi = async (url) => {
  try {
    const response = await fetch(url);
    return await response.json();
  } catch (error) {
    console.log(error);
  }
};

// document.getElementById("search").onkeyup = function (e) {
//   const value = search.value.trim();
//   if (e.key === "Enter") {
//     if (value) window.location.href = `search.html?keyword=${value}`;
//   }
// };

export default fetchApi;
