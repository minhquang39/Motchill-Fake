export const API_FEATUREFILM = `https://phimapi.com/v1/api/danh-sach/phim-le?limit=10`;
export const API_TELEVISIONSERIES = `https://phimapi.com/v1/api/danh-sach/phim-bo?limit=10`;
export const API_CARTOON = `https://phimapi.com/v1/api/danh-sach/hoat-hinh?limit=10`;
export const API_CATEGORY = `https://phimapi.com/the-loai?limit=10`;
export const API_COUNTRY = `https://phimapi.com/quoc-gia?limit=10`;
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

export default fetchApi;
