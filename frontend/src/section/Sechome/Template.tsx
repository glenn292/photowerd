import { Link } from "react-router-dom";
import kolase1jadi from "../../assets/kolase1jadi.png";
import kolase2jadi from "../../assets/kolase2jadi.png";
import "./Template.css";

export default function Template() {
  return (
    <section className="template-section is-visible mt-5">
      <div className="template-bg-shapes">
        <span className="red-square square-1"></span>
      </div>
      <div className="template-container">
        {/* Left Column: Images */}
        <div className="template-images-col">
          <div className="template-images-wrapper">
            <div className="template-image-card">
              <img
                src={kolase1jadi}
                alt="Photowerd Strip Sample 1"
                className="template-img"
              />
            </div>
            <div className="template-image-card">
              <img
                src={kolase2jadi}
                alt="Photowerd Strip Sample 2"
                className="template-img"
              />
            </div>
          </div>
        </div>

        {/* Right Column: Content */}
        <div className="template-content-col">
          <div className="template-title-wrapper">
            <h2 className="template-title">
              <span className="title-blue">Explore Endless</span>
              <br />
              <span className="title-green">Creative Photo Frames</span>
              <br />
            </h2>
          </div>

          <div className="template-body">
            <p className="template-desc-primary">
              Photowerd menghadirkan lebih dari 100 pilihan bingkai foto estetik
              dengan ragam gaya visual modern — dari klise analog 35mm, gaya
              4-cut minimalis Korea, hingga sentuhan Cyber Y2K. Bebas berkreasi
              dan abadikan setiap ekspresimu secara instan.
            </p>

            <div className="template-stats">
              <div className="template-stat-item">
                <span className="stat-number">100+</span>
                <span className="stat-label fw-medium">Desain Bingkai</span>
              </div>

              <div className="template-stat-item">
                <span className="stat-number">24/7</span>
                <span className="stat-label fw-medium">Akses Studio Web</span>
              </div>

              <div className="template-stat-item">
                <span className="stat-number">HD</span>
                <span className="stat-label fw-medium">Kualitas Resolusi</span>
              </div>
            </div>

            <div className="template-action">
              <Link to="/tentang" className="template-btn">
                Jelajahi Semua Template
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
