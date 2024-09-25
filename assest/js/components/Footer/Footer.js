const Footer = (element) => {
  const html = `
              <div class="row footer_top">
                    <div class="col-12 col-md-12 col-lg-3 footer_content">
                        <a href="index.html" id="brand">Maris</a>
                        <p class='info'> <span class="text-mark">Maris</span> - Trang web xem phim trực tuyến miễn phí
                            chất lượng
                            cao với
                            giao diện trực quan, tốc độ tải trang nhanh, cùng kho phim với hơn 10.000+ phim mới, phim
                            hay, luôn cập
                            nhật phim nhanh, hứa hẹn sẽ đem lại phút giây thư giãn cho bạn.</p>
                    </div>
                    <div class="col-6 col-md-6 col-lg-3 footer_content">
                        <h3 class="footer_title">Danh mục</h3>
                        <ul class="footer_list">
                            <li class="footer_item"><a href="">Phim mới</a></li>
                            <li class="footer_item"><a href="">Phim chiếu rạp</a></li>
                            <li class="footer_item"><a href="">Phim bộ</a></li>
                            <li class="footer_item"><a href="">Phim lẻ</a></li>
                        </ul>
                    </div>
                    <div class="col-6 col-md-6 col-lg-3 footer_content">
                        <h3 class="footer_title">Thể loại</h3>
                        <ul class="footer_list">
                            <li class="footer_item"><a href="">Phim cổ trang</a></li>
                            <li class="footer_item"><a href="">Phim tài liệu</a></li>
                            <li class="footer_item"><a href="">Phim bách hợp</a></li>
                            <li class="footer_item"><a href="">Phim đam mỹ</a></li>
                        </ul>
                    </div>
                    <div class="col-12 col-md-6 col-lg-3 footer_content">
                        <h3 class="footer_title">Điều khoản</h3>
                        <ul class="footer_list">
                            <li class="footer_item"><a href="">DMCA</a></li>
                            <li class="footer_item"><a href="">Liên hệ</a></li>
                            <li class="footer_item"><a href="">Privacy</a></li>
                            <li class="footer_item"><a href="">Terms of Service</a></li>
                        </ul>
                    </div>
                </div>
                <p class="text-center footer_end">© 2024 Maris. All rights reserved.</p>
                <div class="scrollTop" onclick="scrollToTop()"><i class="bi bi-box-arrow-in-up"></i></div>
    `;
  element.innerHTML = html;
};

export default Footer;
