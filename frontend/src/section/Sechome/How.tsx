import React from "react";
import { Link } from "react-router-dom";
import "./How.css";
import { LayoutGrid, Camera, SlidersHorizontal, Download } from "lucide-react";

interface StepItem {
  id: number;
  stepNumber: string;
  title: string;
  description: string;
  icon: React.ReactNode;
}

const steps: StepItem[] = [
  {
    id: 1,
    stepNumber: "STEP 1",
    title: "Pilih Template & Layout",
    description:
      "Pilih dari beragam koleksi frame klasik, Polaroid, 4-cut Korea, hingga nuansa pastel dan Y2K.",
    icon: <LayoutGrid size={22} strokeWidth={2} />,
  },
  {
    id: 2,
    stepNumber: "STEP 2",
    title: "Berekspresi di Kamera",
    description:
      "Aktifkan kamera web dan tampilkan pose terbaikmu dipandu hitungan mundur 3 detik otomatis.",
    icon: <Camera size={22} strokeWidth={2} />,
  },
  {
    id: 3,
    stepNumber: "STEP 3",
    title: "Kustomisasi Sesukamu",
    description:
      "Atur pencahayaan bebas, pasang filter warna estetik, dan hias dengan stiker ekspresif yang bisa digeser.",
    icon: <SlidersHorizontal size={22} strokeWidth={2} />,
  },
  {
    id: 4,
    stepNumber: "STEP 4",
    title: "Unduh Strip HD Instan",
    description:
      "Simpan photostrip jernih kualitas tinggi langsung ke galerimu. Tanpa diunggah, 100% aman dan privat.",
    icon: <Download size={22} strokeWidth={2} />,
  },
];

export default function How() {
  return (
    <section className="how-section">
      {/* Curved top divider */}
      <div className="how-curve-top" aria-hidden="true">
        <svg
          viewBox="0 0 1440 60"
          fill="none"
          preserveAspectRatio="none"
          className="how-curve-svg"
        >
          <path d="M0,0 C480,50 960,50 1440,0 L1440,0 L0,0 Z" fill="#070913" />
        </svg>
      </div>

      {/* Pixel Pattern Background */}
      <div className="how-pixel-pattern" aria-hidden="true" />

      <div className="how-wrapper-card">
        {/* Header */}
        <div className="how-header">
          <span className="how-overline">Simple & Expressive</span>
          <h2 className="how-main-title">Cara Kerja Photowerd</h2>
          <p className="how-subtitle fw-medium">
            Tanpa perlu unduh aplikasi atau mendaftar akun. Cukup ikuti empat
            langkah mudah untuk menciptakan photostrip kreatif ala studio
            digital.
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div className="how-cards-grid">
          {steps.map((step) => (
            <div key={step.id} className="how-step-card">
              <div className="how-icon-circle">{step.icon}</div>
              <span className="how-step-label">{step.stepNumber}</span>
              <h3 className="how-card-title">{step.title}</h3>
              <p className="how-card-desc">{step.description}</p>
            </div>
          ))}
        </div>

        {/* CTA Button */}
        <div className="how-cta-container">
          <Link to="/Photobooth" className="how-cta-btn">
            Mulai Berkreasi Sekarang
          </Link>
        </div>
      </div>
    </section>
  );
}
