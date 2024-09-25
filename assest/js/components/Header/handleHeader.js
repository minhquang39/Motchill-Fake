function showNav(event) {
  const menuBar = document.querySelector(".menu");
  const menuNav = document.querySelector("#nav-menu");
  menuNav.classList.toggle("active");

  if (menuNav.classList.contains("active")) {
    menuNav.style.display = "flex";
  } else {
    menuNav.style.display = "none";
  }
}

function handleChangePage(event) {
  event.preventDefault();

  const linkApi = event.target.getAttribute("link-api");
  localStorage.setItem("LINK-API", linkApi);

  const linkApiSplit = linkApi.split("/");
  const slug = linkApiSplit[linkApiSplit.length - 1];

  window.location.href = `category.html?slug=${slug}`;
  // history.pushState(null, "", `category.html/${slug}`);
}

function showSearch(event) {
  const searchIcon = document.querySelector(".search-btn-mobile");
  const searchArea = document.querySelector(".search-area");

  searchIcon.classList.toggle("active");

  if (searchIcon.classList.contains("active")) {
    searchArea.style.display = "block";
    searchIcon.innerHTML = '<i class="bi bi-x-lg"></i>';
  } else {
    searchArea.style.display = "none";
    searchIcon.innerHTML = '<i class="bi bi-search"></i>';
  }
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

window.showNav = showNav;
window.handleChangePage = handleChangePage;
window.showSearch = showSearch;
window.showMenuDropdown = showMenuDropdown;

export default { handleChangePage, showNav, showSearch, showMenuDropdown };
