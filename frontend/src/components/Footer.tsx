import { Link } from "react-router-dom";
import "./Footer.css";

const Footer = () => {
  return (
    <div className="container-fluid footer text-white-50 pt-5">
      <div className="container py-5">
        <div className="row g-5">
          {/* Company Info */}
          <div className="col-lg-4 col-md-6">
            <Link
              to="/"
              className="footer-brand text-decoration-none mb-3 d-inline-block"
            >
              <h4 className="text-white fw-bold mb-0 footer-title">
                Photowerd
              </h4>
            </Link>

            <p className="mb-3">
              Photowerd adalah platform photobooth digital modern yang memadukan
              kreativitas visual dan kemudahan instan. Abadikan setiap pose,
              ekspresikan dirimu dengan koleksi bingkai estetik, dan ciptakan
              kenangan tak terlupakan langsung dari browsermu.
            </p>

            <span className="footer-tagline-chip">
              ✦ Capture. Create. Remember.
            </span>
          </div>

          {/* Quick Links */}
          <div className="col-lg-4 col-md-6">
            <h4 className="text-white mb-4 position-relative pb-2 section-title-footer">
              Navigasi Studio
            </h4>

            <div className="row">
              <div className="col-12">
                <Link className="btn btn-link" to="/">
                  Beranda
                </Link>

                <Link className="btn btn-link" to="/Tentang">
                  Koleksi Template
                </Link>

                <Link className="btn btn-link" to="/Photobooth">
                  Studio Photobooth
                </Link>
              </div>
            </div>
          </div>

          {/* Contact */}
          <div className="col-lg-4 col-md-12">
            <h4 className="text-white mb-4 position-relative pb-2 section-title-footer">
              Hubungi Kami
            </h4>

            <p className="mb-2">
              <i className="fa fa-map-marker-alt me-3 text-white"></i>
              Jakarta, Indonesia • Creative Web Studio
            </p>

            <p className="mb-4">
              <i className="fa fa-envelope me-3 text-white"></i>
              hello@photowerd.com
            </p>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="container-fluid copyright py-4 bg-dark-deep">
        <div className="container">
          <div className="row">
            <div className="col-md-8 text-center text-md-start mb-3 mb-md-0">
              &copy; {new Date().getFullYear()}{" "}
              <Link
                to="/"
                className="text-secondary fw-bold text-decoration-none"
              >
                Photowerd
              </Link>
              {" "}— Creative Digital Photobooth Platform. All Rights Reserved.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
