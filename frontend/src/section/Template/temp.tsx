import { useState } from "react";
import { Link } from "react-router-dom";
import "./temp.css";

/* ─── Template data mirrored from booth.tsx FRAMES ─── */
export interface FrameOption {
  id: string;
  name: string;
  category: string;
  frameStyle?: string;
  bgColor?: string;
  description?: string;
}

const CATEGORIES = [
  "Semua",
  "Klasik",
  "Film",
  "Polaroid",
  "4 Potret Korea",
  "Pink",
  "Y2K",
  "Lucu",
  "Hitam Putih",
  "Pastel",
  "Botani",
  "Retro",
];

const FRAMES: FrameOption[] = [
  {
    id: "none",
    name: "Polos (Bebas)",
    category: "Klasik",
    frameStyle: "none",
    bgColor: "#ffffff",
    description: "Tampilan bersih tanpa bingkai overlay",
  },
  {
    id: "frame-polaroid",
    name: "Polaroid Strip",
    category: "Polaroid",
    frameStyle: "polaroid",
    bgColor: "#faf9f6",
    description: "Gaya polaroid strip klasik",
  },
  {
    id: "frame-film",
    name: "Klise Film 35mm",
    category: "Film",
    frameStyle: "film-sprocket",
    bgColor: "#111111",
    description: "Tepi klise analog dengan lubang film",
  },
  {
    id: "frame-korea",
    name: "K-Photo Minimal",
    category: "4 Potret Korea",
    frameStyle: "none",
    bgColor: "#f3f4f6",
    description: "Gaya strip minimalis Korea",
  },
  {
    id: "frame-pink",
    name: "Sweet Pastel",
    category: "Pink",
    frameStyle: "cute-pink",
    bgColor: "#fce7f3",
    description: "Nuansa pink manis dan romantis",
  },
  {
    id: "frame-vintage",
    name: "Vintage Gold",
    category: "Klasik",
    frameStyle: "vintage",
    bgColor: "#fef9f0",
    description: "Garis ganda emas vintage",
  },
  {
    id: "frame-neon",
    name: "Cyber Y2K",
    category: "Y2K",
    frameStyle: "neon",
    bgColor: "#09090b",
    description: "Garis neon modern Y2K",
  },
  {
    id: "frame-lavender",
    name: "Lavender Dream",
    category: "Pastel",
    frameStyle: "lavender",
    bgColor: "#f3e8ff",
    description: "Bingkai ungu lembut dengan aksen lilac",
  },
  {
    id: "frame-mint",
    name: "Mint Garden",
    category: "Botani",
    frameStyle: "mint",
    bgColor: "#dcfce7",
    description: "Nuansa hijau mint yang segar",
  },
  {
    id: "frame-checkered",
    name: "Checker Club",
    category: "Retro",
    frameStyle: "checkered",
    bgColor: "#fff7ed",
    description: "Pola kotak-kotak retro hitam putih",
  },
  {
    id: "frame-sunset",
    name: "Peach Sunset",
    category: "Pastel",
    frameStyle: "sunset",
    bgColor: "#ffedd5",
    description: "Gradasi hangat peach dan coral",
  },
  {
    id: "frame-sky",
    name: "Cloud Nine",
    category: "Lucu",
    frameStyle: "sky",
    bgColor: "#e0f2fe",
    description: "Bingkai biru langit dengan aksen awan",
  },
  {
    id: "frame-cherry",
    name: "Cherry Pop",
    category: "Pink",
    frameStyle: "cherry",
    bgColor: "#fff1f2",
    description: "Merah ceri ceria dengan garis kontras",
  },
  {
    id: "frame-darkroom",
    name: "Midnight Flash",
    category: "Hitam Putih",
    frameStyle: "darkroom",
    bgColor: "#18181b",
    description: "Bingkai gelap dengan aksen putih seperti foto flash",
  },
];

/* ─── Category badge color mapping ─── */
const CATEGORY_COLORS: Record<string, string> = {
  Klasik: "#c49a55",
  Film: "#374151",
  Polaroid: "#faf9f6",
  "4 Potret Korea": "#e5e7eb",
  Pink: "#fce7f3",
  Y2K: "#09090b",
  Lucu: "#e0f2fe",
  "Hitam Putih": "#18181b",
  Pastel: "#f3e8ff",
  Botani: "#dcfce7",
  Retro: "#fff7ed",
};

const CATEGORY_TEXT_COLORS: Record<string, string> = {
  Klasik: "#78350f",
  Film: "#f9fafb",
  Polaroid: "#374151",
  "4 Potret Korea": "#374151",
  Pink: "#9d174d",
  Y2K: "#a3e635",
  Lucu: "#0369a1",
  "Hitam Putih": "#fafafa",
  Pastel: "#7c3aed",
  Botani: "#166534",
  Retro: "#9a3412",
};

/* ─── Preview strips (3 stacked colored bars) for each frame ─── */
function FramePreview({ frame }: { frame: FrameOption }) {
  const isLight = (hex: string) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return 0.299 * r + 0.587 * g + 0.114 * b > 160;
  };

  const bg = frame.bgColor ?? "#ffffff";
  const textLight = !isLight(bg);

  /* Accent color per frameStyle */
  const accentMap: Record<string, string> = {
    none: "#e5e7eb",
    polaroid: "#d1cfc8",
    "film-sprocket": "#555",
    vintage: "#c49a55",
    "cute-pink": "#f9a8d4",
    neon: "#a3e635",
    lavender: "#a78bfa",
    mint: "#6ee7b7",
    checkered: "#000",
    sunset: "#fb923c",
    sky: "#7dd3fc",
    cherry: "#f43f5e",
    darkroom: "#a1a1aa",
  };
  const accent = accentMap[frame.frameStyle ?? "none"] ?? "#e5e7eb";

  return (
    <div className="temp-preview" style={{ backgroundColor: bg }}>
      {/* 3 stacked photo slots */}
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className="temp-preview-slot"
          style={{ borderColor: accent, opacity: 1 - i * 0.08 }}
        />
      ))}
      {/* Frame accent overlay */}
      <div
        className="temp-preview-accent"
        style={{
          borderColor: accent,
          boxShadow: `inset 0 0 0 3px ${accent}`,
        }}
      />
      {/* Category badge */}
      <span
        className="temp-preview-badge"
        style={{
          backgroundColor: CATEGORY_COLORS[frame.category] ?? "#f3f4f6",
          color: CATEGORY_TEXT_COLORS[frame.category] ?? "#374151",
        }}
      >
        {frame.category}
      </span>
      {/* Dark/light indicator dot */}
      <span
        className="temp-preview-dot"
        style={{ backgroundColor: textLight ? "#fff" : "#111" }}
      />
    </div>
  );
}

/* ─── Main component ─── */
export default function TemplateList() {
  const [activeCategory, setActiveCategory] = useState("Semua");

  const filtered =
    activeCategory === "Semua"
      ? FRAMES
      : FRAMES.filter((f) => f.category === activeCategory);

  return (
    <section className="temp-section">
      {/* Background Pattern & Decorative Shapes */}
      <div className="temp-bg-shapes" aria-hidden="true">
        {/* Decorative Shapes */}
        <span className="temp-shape temp-shape-1" />
        <span className="temp-shape temp-shape-2" />
        <span className="temp-shape temp-shape-3" />
        <span className="temp-shape temp-shape-4" />
        <span className="temp-shape temp-shape-5" />
        <span className="temp-shape temp-shape-6" />

        {/* Decorative Stars */}
        <span className="temp-star temp-star-1">✦</span>
        <span className="temp-star temp-star-2">✧</span>
        <span className="temp-star temp-star-3">✦</span>
        <span className="temp-star temp-star-4">✧</span>
        <span className="temp-star temp-star-5">✦</span>
        <span className="temp-star temp-star-6">✧</span>
        <span className="temp-star temp-star-7">✦</span>
        <span className="temp-star temp-star-8">✧</span>

        {/* Small Decorative Dots */}
        <span className="temp-dot temp-dot-1" />
        <span className="temp-dot temp-dot-2" />
        <span className="temp-dot temp-dot-3" />
        <span className="temp-dot temp-dot-4" />
        <span className="temp-dot temp-dot-5" />
        <span className="temp-dot temp-dot-6" />
      </div>

      <div className="temp-container">
        {/* Header */}
        <div className="temp-header">
          <div className="temp-title-wrapper">
            <span className="temp-accent-bar" />
            <div>
              <h2 className="temp-title">
                <span className="title-red">Koleksi Frame</span>{" "}
                <span className="title-dark">Photowerd</span>
              </h2>
              <p className="temp-subtitle">
                {filtered.length} desain template estetik siap pakai — dari gaya
                klise film analog, 4-cut Korea, hingga Cyber Y2K. Pilih bingkai
                favoritmu dan mulai berkreasi!
              </p>
            </div>
          </div>

          {/* Category pills */}
          <div className="temp-cats">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                className={`temp-cat-pill${activeCategory === cat ? " temp-cat-pill--active" : ""}`}
                onClick={() => setActiveCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        <div className="temp-grid">
          {filtered.length === 0 ? (
            <p className="temp-empty">
              Belum ada template pada kategori ini. Silakan pilih kategori lain
              untuk mengeksplorasi koleksi Photowerd!
            </p>
          ) : (
            filtered.map((frame) => (
              <div key={frame.id} className="temp-card">
                <FramePreview frame={frame} />
                <div className="temp-card-info">
                  <h3 className="temp-card-name">{frame.name}</h3>
                  <p className="temp-card-desc">{frame.description}</p>
                </div>
                <Link to="/photobooth" className="temp-card-btn">
                  Gunakan Frame Ini
                </Link>
              </div>
            ))
          )}
        </div>

        {/* CTA bottom */}
        <div className="temp-cta">
          <Link to="/photobooth" className="template-btn">
            Buka Studio Photowerd →
          </Link>
        </div>
      </div>
    </section>
  );
}
