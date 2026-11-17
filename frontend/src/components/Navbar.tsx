import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./Navbar.css";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  const location = useLocation();
  const path = location.pathname;

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <nav
      id="navbar"
      className={`navbar navbar-expand-lg navbar-custom ${
        scrolled ? "scrolled" : ""
      }`}
    >
      <div className="container">
        {/* Brand & Desktop Navigation */}
        <div className="navbar-nav navbar-desktop">
          <Link to="/" className="navbar-brand-pill">
            <span className="brand-dot"></span>
            Photowerd
          </Link>

          <div className="nav-divider"></div>

          <Link to="/" className={`nav-link ${path === "/" ? "active" : ""}`}>
            Beranda
          </Link>

          <Link
            to="/tentang"
            className={`nav-link ${path === "/tentang" ? "active" : ""}`}
          >
            Template
          </Link>

          <Link
            to="/Photobooth"
            className={`nav-link ${path === "/Photobooth" ? "active" : ""}`}
          >
            Photobooth
          </Link>
        </div>
      </div>
    </nav>
  );
}
