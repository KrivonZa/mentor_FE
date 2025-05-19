export default function Footer() {
  return (
    <footer id="footer" className="footer position-relative light-background pb-0">

    <div className="container mt-4 footer-top">
      <div className="row">
        <div className="col-sm-6 footer-about">
          <a href="/" className="logo d-flex align-items-center">
            <span className="sitename">EmpowerU</span>
          </a>
          <div className="footer-contact pt-3">
            <p>122 đường số 5, phường Tân Phong</p>
            <p>Quận 7, TP HCM</p>
            <p className="mt-3"><strong>Phone:</strong> <span>+84 36 494 6910</span></p>
            <p><strong>Email:</strong> <span>empoweru.aca.vn@gmail.com</span></p>
          </div>
          <div className="social-links d-flex mt-4">
            <a href="https://www.facebook.com/profile.php?id=61576285256194"><i className="bi bi-facebook"></i></a>
            <a href="https://www.instagram.com/empoweru_vn/"><i className="bi bi-instagram"></i></a>
          </div>
        </div>

        <div className="col-sm-3 footer-links">
          <h4>Mục Lục</h4>
          <ul>
            <li><a href="/">Trang Chủ</a></li>
            <li><a href="/about">Giới Thiệu</a></li>
            <li><a href="/courses">Các Khoá Học</a></li>
            <li><a href="/trainers">Đội Ngũ EmpowerU</a></li>
          </ul>
        </div>

        <div className="col-sm-3 footer-links">
          <h4>Dịch Vụ Của Chúng Tôi</h4>
          <ul>
            <li>Kết nối chuyên gia</li>
            <li>Khoá học trực tuyến</li>
            <li>Phát triển kỹ năng</li>
            <li>Định hướng nghề nghiệp</li>
            <li>Học tập cá nhân hoá</li>
          </ul>
        </div>
      </div>
    </div>

    <div className="container-fluid copyright text-center mt-2">
      <p>© <span>Copyright</span> <strong className="px-1 sitename">EmpowerU</strong> <span>All Rights Reserved</span></p>
    </div>
  </footer>
  );
}
