import { API_COUNTRY, API_CATEGORY } from "../../general.js";
import fetchApi from "../../general.js";
import Category from "./Category.js";
import Country from "./Country.js";
import showNav from "./handleHeader.js";
import showSearch from "./handleHeader.js";
import showMenuDropdown from "./handleHeader.js";
import handleChangePage from "./handleHeader.js";

const Header = async (element) => {
  const [countryData, categoryData] = await Promise.all([
    fetchApi(API_COUNTRY),
    fetchApi(API_CATEGORY),
  ]);

  const html = `
         <div class="row header-top pb-3">
                    <div class="col-2 menu hide" onclick="showNav(event)">
                        <i class="bi bi-list"></i>
                    </div>
                    <div class="col-6 col-lg-3">
                        <a href="index.html" id="brand">Maris</a>
                    </div>

                    <div class="col-2 hide search-btn-mobile" onclick="showSearch(event)">
                        <i class="bi bi-search"></i>
                    </div>

                    <div class="col-2 btn-login-mobile hide">
                        <i class="bi bi-person-circle"></i>
                    </div>
                    <div
                        class=" col-12 col-lg-6 text-center d-flex justify-content-center align-items-center search-film">
                        <div class="search-area">
                            <input type="text" id="search" onkeyup="Search(event)" placeholder="Tìm Kiếm">
                            <span class="search-icon"><i class="bi bi-search"></i></span>
                        </div>

                    </div>

                    <div class="col-lg-3 text-end btn-login">
                        <button class="btn btn-secondary">Đăng Nhập</button>
                    </div>

                </div>
                <nav class="">
                    <ul id="nav-menu" class="mt-3 pb-3">
                        <li class="nav-item dropdown">
                            <a href="#" onclick="showMenuDropdown(event)">Thể loại<i
                                    class="bi bi-caret-down-fill"></i></a>
                            <ul class="sub-nav-item">
                                ${Category(categoryData)}
                            </ul>
                        </li>
                        <li class="nav-item dropdown">
                            <a href="#" onclick="showMenuDropdown(event)">Quốc gia<i
                                    class="bi bi-caret-down-fill"></i></a>
                            <ul class="sub-nav-item">
                                ${Country(countryData)}
                            </ul>
                        </li>

                        <li class="nav-item"><a href="category.html" onclick="handleChangePage(event)"
                                link-api="https://phimapi.com/v1/api/danh-sach/phim-bo">Phim bộ</a></li>
                        <li class="nav-item"><a href="category.html" onclick="handleChangePage(event)"
                                link-api="https://phimapi.com/v1/api/danh-sach/phim-le">Phim lẻ</a></li>
                    </ul>
                </nav>
    `;

  element.innerHTML = html;
};

export default Header;
