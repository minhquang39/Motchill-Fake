const popularFilm = document.getElementById("popularFilm");
const btnPopularLeft = document.querySelector(".topic-popular .btn-left");
const btnPopularRight = document.querySelector(".topic-popular .btn-right");

const seriesFilm = document.getElementById("series-film");
const singleFilm = document.getElementById("single-film");
const cartoonFilm = document.getElementById("cartoonFilm");
const tabNames = document.querySelectorAll(".tab_category_title");
const tabContents = document.querySelectorAll(".tab_category_content");

const menuBar = document.querySelector(".menu");
const menuNav = document.querySelector("#nav-menu");

const searchIcon = document.querySelector(".search-btn-mobile");
const searchArea = document.querySelector(".search-area");

// Fetch Api function
const fetchApi = async (url) => {
  try {
    const response = await fetch(url);
    return await response.json();
  } catch (error) {
    console.log(error);
  }
};

// fetchApi("https://phimapi.com/phim/sieu-dai-chien").then((data) => {
//   console.log(data);
// });

// handle change page
function handleChangePage(event) {
  event.preventDefault();

  const linkApi = event.target.getAttribute("link-api");
  localStorage.setItem("LINK-API", linkApi);

  const linkApiSplit = linkApi.split("/");
  const slug = linkApiSplit[linkApiSplit.length - 1];

  window.location.href = `category.html?slug=${slug}`;
  // history.pushState(null, "", `category.html/${slug}`);
}

function handleInfoMovie(event) {}

function scrollToTop() {
  document.body.scrollTop = 0; // For Safari
  document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}

function showMenuDropdown(e) {
  const parentElement = e.target.parentElement;
  const subMenu = parentElement.querySelector(".sub-nav-item");

  const hadActive = document.querySelector(".nav-item.dropdown.active");
  if (hadActive && hadActive !== parentElement) {
    // Nếu có menu khác đang active và không phải là menu hiện tại
    hadActive.classList.remove("active");
    hadActive.querySelector(".sub-nav-item").style.display = "none";
  }

  parentElement.classList.toggle("active");
  if (parentElement.classList.contains("active")) {
    subMenu.style.display = "flex"; // Hiển thị menu
  } else {
    subMenu.style.display = "none"; // Ẩn menu
  }
}

function showNav(event) {
  menuNav.classList.toggle("active");

  if (menuNav.classList.contains("active")) {
    menuNav.style.display = "flex";
  } else {
    menuNav.style.display = "none";
  }
}

searchIcon.onclick = function (e) {
  showSearch();
};

function showSearch(event) {
  searchIcon.classList.toggle("active");

  if (searchIcon.classList.contains("active")) {
    searchArea.style.display = "block";
    searchIcon.innerHTML = '<i class="bi bi-x-lg"></i>';
  } else {
    searchArea.style.display = "none";
    searchIcon.innerHTML = '<i class="bi bi-search"></i>';
  }
}
