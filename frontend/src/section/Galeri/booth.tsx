import { useCallback, useEffect, useRef, useState } from "react";
import "./booth.css";

/* ─────────────────────── TYPES & CONSTANTS ─────────────────────── */

type LayoutKey = "1x3";

const LAYOUTS: {
  key: LayoutKey;
  label: string;
  total: number;
  cols: number;
}[] = [{ key: "1x3", label: "1×3", total: 3, cols: 1 }];

export interface FrameOption {
  id: string;
  name: string;
  category: string;
  image?: string; // image overlay dari folder template
  frameStyle?:
    | "none"
    | "bingkai1"
    | "bingkai2"
    | "polaroid"
    | "film-sprocket"
    | "vintage"
    | "cute-pink"
    | "neon"
    | "lavender"
    | "mint"
    | "checkered"
    | "sunset"
    | "sky"
    | "cherry"
    | "darkroom";
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

const BG_COLORS = [
  "#ffffff",
  "#000000",
  "#f8b4c8",
  "#e8a090",
  "#c8a080",
  "#a06898",
  "#d84888",
  "#e83888",
  "#c03080",
  "#f8c858",
  "#f8e868",
  "#88d8b0",
  "#78c8e8",
  "#68b8f8",
  "#38a868",
  "#284858",
  "#383848",
  "#682878",
];

const PATTERNS = [
  { id: "polos", label: "Polos" },
  { id: "titik", label: "Titik" },
  { id: "kotak", label: "Kotak-kotak" },
  { id: "kisi", label: "Kisi" },
  { id: "garis-v", label: "Garis vertikal" },
  { id: "garis-d", label: "Garis diagonal" },
  { id: "arsiran", label: "Arsiran silang" },
];

const FILTERS = [
  { id: "none", label: "Tanpa Filter" },
  { id: "sepia", label: "Sepia Vintage" },
  { id: "grayscale", label: "Hitam Putih" },
  { id: "warm", label: "Hangat" },
  { id: "cool", label: "Sejuk" },
  { id: "faded", label: "Pudar / Fade" },
  { id: "bright", label: "Cerah" },
  { id: "noir", label: "Noir Kontras" },
  { id: "filmcolor", label: "Warna Film" },
  { id: "expired", label: "Film Kadaluwarsa" },
  { id: "bw-grain", label: "B&W Grain" },
  { id: "darkroom", label: "Kamar Gelap" },
  { id: "instant", label: "Instan" },
  { id: "orange", label: "Oranye" },
  { id: "purple", label: "Ungu" },
];

const STICKERS = [
  "❤️",
  "💖",
  "✨",
  "⭐",
  "🌸",
  "💋",
  "🎀",
  "🦋",
  "🌈",
  "☀️",
  "🌙",
  "❄️",
  "🔥",
  "💫",
  "🎵",
  "💜",
  "🖤",
  "💝",
  "🎉",
  "🎊",
  "👑",
  "💍",
  "🌹",
  "🎂",
  "🍰",
  "🧁",
  "🎈",
  "🎁",
  "📸",
  "🎬",
  "💕",
  "💗",
  "💓",
  "💞",
  "❣️",
  "💘",
  "💟",
  "🤍",
  "🤎",
  "🩷",
  "🩵",
  "🩶",
  "🫶",
  "💌",
  "🌷",
  "🌻",
  "🌼",
  "🍀",
  "🌿",
  "🍃",
  "🍄",
  "🍓",
  "🍒",
  "🍑",
  "🍋",
  "🍉",
  "🍇",
  "🫧",
  "🪩",
  "🕯️",
  "🧸",
  "🐻",
  "🐰",
  "🐱",
  "🐶",
  "🐣",
  "🐝",
  "🐞",
  "🦄",
  "🐚",
  "🪼",
  "🪽",
  "🪞",
  "🧿",
  "💎",
  "🪄",
  "☁️",
  "🌤️",
  "🌊",
  "🌟",
  "💥",
  "🍬",
  "🍭",
  "🍪",
  "🧋",
  "🥤",
  "🛼",
  "🎧",
  "🎤",
  "🎸",
  "🎹",
  "💿",
  "📼",
  "📷",
  "🕶️",
  "👒",
  "🧢",
  "👟",
  "👠",
  "💄",
  "💅",
  "🪭",
  "🎟️",
  "🪅",
  "🧩",
  "✿",
  "❀",
  "♡",
  "♥",
  "☆",
  "★",
  "✦",
  "✧",
  "☾",
  "☼",
  "〰️",
  "➳",
  "୨୧",
];

export interface PlacedSticker {
  id: string;
  emoji: string;
  x: number; // percentage (0 - 100)
  y: number; // percentage (0 - 100)
  size: number; // in px
}

type CustomOverlay = {
  id: string;
  src: string;
  name: string;
  x: number;
  y: number;
  width: number;
};

/* ─────────────── CSS filter values for preset filters ─────────────── */
function getFilterCSS(id: string): string {
  switch (id) {
    case "sepia":
      return "sepia(0.8)";
    case "grayscale":
      return "grayscale(1)";
    case "warm":
      return "sepia(0.3) saturate(1.4) brightness(1.05)";
    case "cool":
      return "saturate(0.8) hue-rotate(15deg) brightness(1.05)";
    case "faded":
      return "contrast(0.85) brightness(1.1) saturate(0.7)";
    case "bright":
      return "brightness(1.25) contrast(1.1)";
    case "noir":
      return "grayscale(1) contrast(1.4) brightness(0.9)";
    case "orange":
      return "sepia(0.5) hue-rotate(-15deg) saturate(1.5)";
    case "purple":
      return "hue-rotate(270deg) saturate(0.8)";
    case "instant":
      return "contrast(1.1) brightness(1.1) saturate(1.3) sepia(0.15)";
    case "expired":
      return "sepia(0.4) contrast(0.9) brightness(0.95) hue-rotate(5deg)";
    case "filmcolor":
      return "saturate(1.5) contrast(1.1) sepia(0.1)";
    case "bw-grain":
      return "grayscale(1) contrast(1.2)";
    case "darkroom":
      return "sepia(0.6) brightness(0.75) contrast(1.3)";
    default:
      return "none";
  }
}

/* ─────────────── Pattern background CSS ─────────────── */
function getPatternBg(id: string, color: string): string {
  switch (id) {
    case "titik":
      return `radial-gradient(circle, rgba(0,0,0,0.15) 1px, ${color} 1px)`;
    case "kotak":
      return `linear-gradient(to right, rgba(0,0,0,0.06) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(0,0,0,0.06) 1px, transparent 1px)`;
    case "kisi":
      return `linear-gradient(to right, rgba(0,0,0,0.08) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(0,0,0,0.08) 1px, transparent 1px)`;
    case "garis-v":
      return `repeating-linear-gradient(to right, rgba(0,0,0,0.06), rgba(0,0,0,0.06) 1px, ${color} 1px, ${color} 8px)`;
    case "garis-d":
      return `repeating-linear-gradient(45deg, rgba(0,0,0,0.05), rgba(0,0,0,0.05) 1px, ${color} 1px, ${color} 8px)`;
    case "arsiran":
      return `repeating-linear-gradient(45deg, rgba(0,0,0,0.04), rgba(0,0,0,0.04) 1px, transparent 1px, transparent 6px),
              repeating-linear-gradient(-45deg, rgba(0,0,0,0.04), rgba(0,0,0,0.04) 1px, ${color} 1px, ${color} 6px)`;
    default:
      return "none";
  }
}

function getPatternSize(id: string): string {
  switch (id) {
    case "titik":
      return "12px 12px";
    case "kotak":
      return "20px 20px";
    case "kisi":
      return "10px 10px";
    default:
      return "auto";
  }
}

function readImageFile(file: File): Promise<string> {
  if (!file.type.startsWith("image/")) {
    return Promise.reject(new Error("Pilih file gambar yang valid."));
  }
  if (file.size > 15 * 1024 * 1024) {
    return Promise.reject(new Error("Ukuran gambar maksimal 15 MB."));
  }

  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(new Error("File gambar tidak dapat dibaca."));
    reader.onload = () => {
      if (typeof reader.result !== "string") {
        reject(new Error("File gambar tidak dapat dibaca."));
        return;
      }

      const dataUrl = reader.result;
      const image = new Image();
      image.onload = () => resolve(dataUrl);
      image.onerror = () => reject(new Error("Format gambar tidak didukung."));
      image.src = dataUrl;
    };
    reader.readAsDataURL(file);
  });
}

function loadImageSource(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = () => reject(new Error("Gambar tidak dapat dimuat."));
    image.src = src;
  });
}

/* ═══════════════════════════════════════════════════════
   MAIN COMPONENT
   ═══════════════════════════════════════════════════════ */

export default function Booth() {
  /* ── Phase: "capture" → "editor" ── */
  const [phase, setPhase] = useState<"capture" | "editor">("capture");

  /* ── Capture state ── */
  const [layout] = useState<LayoutKey>("1x3");
  const [photos, setPhotos] = useState<string[]>([]);
  const [countdown, setCountdown] = useState<number | null>(null);
  const [flash, setFlash] = useState(false);
  const [cameraReady, setCameraReady] = useState(false);
  const [retakeIndex, setRetakeIndex] = useState<number | null>(null);

  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const currentLayout = LAYOUTS.find((l) => l.key === layout)!;
  const totalNeeded = currentLayout.total; // 3 photos for 1x3

  /* ── Editor state: Frames (from template folder) ── */
  const [activeCategory, setActiveCategory] = useState("Semua");
  const [activeFrameId, setActiveFrameId] = useState("none");
  const [frameScale, setFrameScale] = useState<number>(100); // 50% - 160%
  const [frameWidth, setFrameWidth] = useState<number>(240);
  const [frameHeight, setFrameHeight] = useState<number>(360);
  const [frameOffsetX, setFrameOffsetX] = useState<number>(0); // -80px to +80px
  const [frameOffsetY, setFrameOffsetY] = useState<number>(0); // -80px to +80px

  /* ── Editor state: Lighting adjustment (Atur Cahaya Secara Bebas) ── */
  const [brightness, setBrightness] = useState<number>(100); // 50% - 150%
  const [contrast, setContrast] = useState<number>(100); // 50% - 150%
  const [saturation, setSaturation] = useState<number>(100); // 0% - 200%
  const [warmth, setWarmth] = useState<number>(0); // 0% - 100%
  const [exposure, setExposure] = useState<number>(0); // -40 to +40

  /* ── Editor state: Preset Filter, Background, Pattern, Text ── */
  const [filter, setFilter] = useState("none");
  const [bgColor, setBgColor] = useState("#ffffff");
  const [pattern, setPattern] = useState("polos");
  const [backgroundImage, setBackgroundImage] = useState<string | null>(null);
  const [bottomText, setBottomText] = useState("Photowerd Studio ✨");
  const [customOverlays, setCustomOverlays] = useState<CustomOverlay[]>([]);
  const [selectedOverlayId, setSelectedOverlayId] = useState<string | null>(
    null,
  );
  const [editorError, setEditorError] = useState("");
  const backgroundInputRef = useRef<HTMLInputElement>(null);
  const overlayInputRef = useRef<HTMLInputElement>(null);

  /* ── Editor state: Draggable Stickers ── */
  const [stickers, setStickers] = useState<PlacedSticker[]>([
    { id: "stk_default_1", emoji: "✨", x: 80, y: 15, size: 32 },
    { id: "stk_default_2", emoji: "❤️", x: 20, y: 88, size: 30 },
  ]);
  const [selectedStickerId, setSelectedStickerId] = useState<string | null>(
    null,
  );

  const dragInfo = useRef<{
    id: string;
    startX: number;
    startY: number;
    startStickerX: number;
    startStickerY: number;
  } | null>(null);
  const overlayDragInfo = useRef<{
    id: string;
    startX: number;
    startY: number;
    overlayX: number;
    overlayY: number;
  } | null>(null);

  /* ── Current selected frame ── */
  const currentFrame = FRAMES.find((f) => f.id === activeFrameId) ?? FRAMES[0];

  /* ── Filtered frames by category ── */
  const filteredFrames =
    activeCategory === "Semua"
      ? FRAMES
      : FRAMES.filter((f) => f.category === activeCategory);

  /* ── Combine preset filter + manual lighting adjustments ── */
  const getCombinedFilterCSS = useCallback(() => {
    const parts: string[] = [];

    // Base preset filter
    const base = getFilterCSS(filter);
    if (base && base !== "none") {
      parts.push(base);
    }

    // Brightness + Exposure
    const totalBrightness = (brightness + exposure) / 100;
    if (totalBrightness !== 1) {
      parts.push(`brightness(${Math.max(0.2, totalBrightness).toFixed(2)})`);
    }

    // Contrast
    if (contrast !== 100) {
      parts.push(`contrast(${(contrast / 100).toFixed(2)})`);
    }

    // Saturation
    if (saturation !== 100) {
      parts.push(`saturate(${(saturation / 100).toFixed(2)})`);
    }

    // Warmth
    if (warmth > 0) {
      parts.push(`sepia(${(warmth / 100).toFixed(2)})`);
    }

    return parts.length > 0 ? parts.join(" ") : "none";
  }, [filter, brightness, contrast, saturation, warmth, exposure]);

  const combinedFilter = getCombinedFilterCSS();

  /* ── Reset lighting to default ── */
  const handleResetLighting = () => {
    setBrightness(100);
    setContrast(100);
    setSaturation(100);
    setWarmth(0);
    setExposure(0);
  };

  /* ── Camera Lifecycle ── */
  const startCamera = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: "user",
          width: { ideal: 1280 },
          height: { ideal: 720 },
        },
        audio: false,
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
        setCameraReady(true);
      }
    } catch {
      setCameraReady(false);
    }
  }, []);

  const stopCamera = useCallback(() => {
    streamRef.current?.getTracks().forEach((t) => t.stop());
    streamRef.current = null;
    setCameraReady(false);
  }, []);

  useEffect(() => {
    if (phase === "capture") {
      startCamera();
    }
    return () => stopCamera();
  }, [phase, startCamera, stopCamera]);

  /* ── Take Photo with Countdown ── */
  const takePhoto = useCallback(() => {
    if (photos.length >= totalNeeded && retakeIndex === null) return;
    if (!cameraReady) return;
    setCountdown(3);
  }, [photos.length, totalNeeded, retakeIndex, cameraReady]);

  useEffect(() => {
    if (countdown === null) return;
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }

    // countdown === 0: capture photo from video
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas) {
      setCountdown(null);
      return;
    }

    canvas.width = video.videoWidth || 1280;
    canvas.height = video.videoHeight || 720;
    const ctx = canvas.getContext("2d")!;

    // Mirror image for front camera feel
    ctx.translate(canvas.width, 0);
    ctx.scale(-1, 1);
    ctx.drawImage(video, 0, 0);
    const dataUrl = canvas.toDataURL("image/jpeg", 0.95);

    // Flash animation
    setFlash(true);
    setTimeout(() => setFlash(false), 300);

    if (retakeIndex !== null) {
      // Retaking a single photo slot
      setPhotos((prev) => {
        const copy = [...prev];
        copy[retakeIndex] = dataUrl;
        return copy;
      });
      setRetakeIndex(null);
    } else {
      setPhotos((prev) => [...prev, dataUrl]);
    }

    setCountdown(null);
  }, [countdown, retakeIndex]);

  /* ── Retake & Flow handlers ── */
  const handleRetakeAll = () => {
    setPhotos([]);
    setRetakeIndex(null);
  };

  const handleRetakeSingle = (index: number) => {
    setRetakeIndex(index);
    setCountdown(3);
  };

  const handleContinue = () => {
    if (photos.length === totalNeeded) {
      setPhase("editor");
    }
  };

  const handleBackToCapture = () => {
    setPhase("capture");
  };

  const handleStartOver = () => {
    setPhase("capture");
    setPhotos([]);
    setRetakeIndex(null);
    setFilter("none");
    setBgColor("#ffffff");
    setPattern("polos");
    setActiveFrameId("none");
    setFrameScale(100);
    setFrameWidth(240);
    setFrameHeight(360);
    setFrameOffsetX(0);
    setFrameOffsetY(0);
    setBackgroundImage(null);
    setCustomOverlays([]);
    setSelectedOverlayId(null);
    setEditorError("");
    handleResetLighting();
    setStickers([
      { id: "stk_1", emoji: "✨", x: 80, y: 15, size: 32 },
      { id: "stk_2", emoji: "❤️", x: 20, y: 88, size: 30 },
    ]);
  };

  /* ── Sticker Functions ── */
  const addSticker = (emoji: string) => {
    const newSticker: PlacedSticker = {
      id: "stk_" + Date.now() + "_" + Math.floor(Math.random() * 1000),
      emoji,
      x: 50 + (Math.random() * 24 - 12),
      y: 40 + (Math.random() * 30 - 15),
      size: 34,
    };
    setStickers((prev) => [...prev, newSticker]);
    setSelectedStickerId(newSticker.id);
  };

  const removeSticker = (id: string) => {
    setStickers((prev) => prev.filter((s) => s.id !== id));
    if (selectedStickerId === id) setSelectedStickerId(null);
  };

  const clearAllStickers = () => {
    setStickers([]);
    setSelectedStickerId(null);
  };

  const updateStickerSize = (size: number) => {
    if (!selectedStickerId) return;
    setStickers((prev) =>
      prev.map((s) => (s.id === selectedStickerId ? { ...s, size } : s)),
    );
  };

  /* ── Drag & Drop Pointer Events for Stickers ── */
  const handleStickerPointerDown = (
    e: React.PointerEvent<HTMLSpanElement>,
    id: string,
  ) => {
    e.stopPropagation();
    e.preventDefault();
    const targetSticker = stickers.find((s) => s.id === id);
    if (!targetSticker) return;

    setSelectedStickerId(id);
    dragInfo.current = {
      id,
      startX: e.clientX,
      startY: e.clientY,
      startStickerX: targetSticker.x,
      startStickerY: targetSticker.y,
    };
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  };

  const handleStickerPointerMove = (e: React.PointerEvent<HTMLSpanElement>) => {
    if (!dragInfo.current) return;
    const stripEl = document.getElementById("strip-preview");
    if (!stripEl) return;
    const rect = stripEl.getBoundingClientRect();
    if (rect.width === 0 || rect.height === 0) return;

    const deltaXPercent =
      ((e.clientX - dragInfo.current.startX) / rect.width) * 100;
    const deltaYPercent =
      ((e.clientY - dragInfo.current.startY) / rect.height) * 100;

    const newX = Math.max(
      5,
      Math.min(95, dragInfo.current.startStickerX + deltaXPercent),
    );
    const newY = Math.max(
      5,
      Math.min(95, dragInfo.current.startStickerY + deltaYPercent),
    );

    setStickers((prev) =>
      prev.map((s) =>
        s.id === dragInfo.current?.id ? { ...s, x: newX, y: newY } : s,
      ),
    );
  };

  const handleStickerPointerUp = (e: React.PointerEvent<HTMLSpanElement>) => {
    if (dragInfo.current) {
      try {
        (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId);
      } catch {}
      dragInfo.current = null;
    }
  };

  const handleImageUpload = async (
    event: React.ChangeEvent<HTMLInputElement>,
    kind: "background" | "overlay",
  ) => {
    const files = Array.from(event.target.files ?? []);
    event.target.value = "";
    if (files.length === 0) return;

    try {
      if (kind === "background") {
        setBackgroundImage(await readImageFile(files[0]));
      } else {
        const uploadedOverlays: CustomOverlay[] = [];
        const failedFiles: string[] = [];
        for (const [index, file] of files.entries()) {
          try {
            uploadedOverlays.push({
              id: `overlay-${Date.now()}-${index}-${Math.random().toString(36).slice(2)}`,
              src: await readImageFile(file),
              name: file.name,
              x: 50,
              y: 50,
              width: 42,
            });
          } catch {
            failedFiles.push(file.name);
          }
        }
        if (uploadedOverlays.length === 0) {
          throw new Error(
            failedFiles.length > 0
              ? `Gambar tidak dapat diunggah: ${failedFiles.join(", ")}`
              : "Gambar tidak dapat diunggah.",
          );
        }
        setCustomOverlays((current) => [...current, ...uploadedOverlays]);
        setSelectedOverlayId(uploadedOverlays[uploadedOverlays.length - 1].id);
        if (failedFiles.length > 0) {
          setEditorError(
            `${uploadedOverlays.length} overlay berhasil ditambahkan. Gagal mengunggah: ${failedFiles.join(", ")}`,
          );
          return;
        }
      }
      setEditorError("");
    } catch (error) {
      setEditorError(
        error instanceof Error ? error.message : "Gambar gagal diunggah.",
      );
    }
  };

  const handleOverlayPointerDown = (
    event: React.PointerEvent<HTMLImageElement>,
    overlay: CustomOverlay,
  ) => {
    event.preventDefault();
    event.stopPropagation();
    setSelectedStickerId(null);
    setSelectedOverlayId(overlay.id);
    const stripEl = document.getElementById("strip-preview");
    const rect = stripEl?.getBoundingClientRect();
    if (!rect || rect.width === 0 || rect.height === 0) return;

    overlayDragInfo.current = {
      id: overlay.id,
      startX: event.clientX,
      startY: event.clientY,
      overlayX: overlay.x,
      overlayY: overlay.y,
    };
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const handleOverlayPointerMove = (
    event: React.PointerEvent<HTMLImageElement>,
  ) => {
    const drag = overlayDragInfo.current;
    const stripEl = document.getElementById("strip-preview");
    const rect = stripEl?.getBoundingClientRect();
    if (!drag || !rect || rect.width === 0 || rect.height === 0) return;

    setCustomOverlays((current) =>
      current.map((overlay) =>
        overlay.id === drag.id
          ? {
              ...overlay,
              x: Math.max(
                0,
                Math.min(
                  100,
                  drag.overlayX +
                    ((event.clientX - drag.startX) / rect.width) * 100,
                ),
              ),
              y: Math.max(
                0,
                Math.min(
                  100,
                  drag.overlayY +
                    ((event.clientY - drag.startY) / rect.height) * 100,
                ),
              ),
            }
          : overlay,
      ),
    );
  };

  const handleOverlayPointerUp = (
    event: React.PointerEvent<HTMLImageElement>,
  ) => {
    overlayDragInfo.current = null;
    if (!event.currentTarget.hasPointerCapture(event.pointerId)) return;
    event.currentTarget.releasePointerCapture(event.pointerId);
  };

  const selectedSticker = stickers.find((s) => s.id === selectedStickerId);

  /* ── Select Frame ── */
  const selectFrame = (f: FrameOption) => {
    setActiveFrameId(f.id);
    if (f.bgColor) {
      setBgColor(f.bgColor);
    }
    if (f.image) {
      const aspectRatio =
        f.frameStyle === "bingkai2" ? 941 / 1672 : 1024 / 1535;
      setFrameHeight(Math.round(frameWidth / aspectRatio));
    }
  };

  /* ── Download High-Resolution Photostrip ── */
  const downloadStrip = async () => {
    setEditorError("");
    try {
    const stripEl = document.getElementById("strip-preview");
    if (!stripEl) return;
    const stripW = stripEl.offsetWidth;
    const stripH = stripEl.offsetHeight;
    const scale = 2; // retina 2x

    const canvas = document.createElement("canvas");
    canvas.width = stripW * scale;
    canvas.height = stripH * scale;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.scale(scale, scale);

    // 1. Background color
    ctx.fillStyle = bgColor;
    ctx.fillRect(0, 0, stripW, stripH);
    if (backgroundImage) {
      const image = await loadImageSource(backgroundImage);
      const coverScale = Math.max(
        stripW / image.naturalWidth,
        stripH / image.naturalHeight,
      );
      const drawWidth = image.naturalWidth * coverScale;
      const drawHeight = image.naturalHeight * coverScale;
      ctx.drawImage(
        image,
        (stripW - drawWidth) / 2,
        (stripH - drawHeight) / 2,
        drawWidth,
        drawHeight,
      );
    }
    // 2. Render 3 photos
    const slots = stripEl.querySelectorAll<HTMLImageElement>(
      ".strip-photo-slot img",
    );
    const paddingX = 16;
    const paddingY = 16;
    const gap = 8;
    const photoW = stripW - paddingX * 2;
    const photoH = photoW * (3 / 4);

    const photoPromises = Array.from(slots).map((img, idx) => {
      return new Promise<{
        img: HTMLImageElement;
        x: number;
        y: number;
        width: number;
        height: number;
      }>((resolve) => {
        const slotEl = img.closest(".strip-photo-slot") as HTMLElement | null;
        let drawX = paddingX;
        let drawY = paddingY + idx * (photoH + gap);
        let drawWidth = photoW;
        let drawHeight = photoH;
        if (slotEl) {
          const stripRect = stripEl.getBoundingClientRect();
          const slotRect = slotEl.getBoundingClientRect();
          const scaleX = stripW / stripRect.width;
          const scaleY = stripH / stripRect.height;
          drawX = (slotRect.left - stripRect.left) * scaleX;
          drawY = (slotRect.top - stripRect.top) * scaleY;
          drawWidth = slotRect.width * scaleX;
          drawHeight = slotRect.height * scaleY;
        }
        const newImg = new Image();
        newImg.crossOrigin = "anonymous";
        newImg.onload = () =>
          resolve({
            img: newImg,
            x: drawX,
            y: drawY,
            width: drawWidth,
            height: drawHeight,
          });
        newImg.onerror = () =>
          resolve({
            img: newImg,
            x: drawX,
            y: drawY,
            width: drawWidth,
            height: drawHeight,
          });
        newImg.src = img.src;
      });
    });

    // 3. Load frame overlay if present (from template folder)
    const framePromise = new Promise<HTMLImageElement | null>((resolve) => {
      if (!currentFrame?.image) {
        resolve(null);
        return;
      }
      const frameImg = new Image();
      frameImg.crossOrigin = "anonymous";
      frameImg.onload = () => resolve(frameImg);
      frameImg.onerror = () => resolve(null);
      frameImg.src = currentFrame.image;
    });

    const [loadedPhotos, loadedFrame] = await Promise.all([
      Promise.all(photoPromises),
      framePromise,
    ]);

    // Draw photos with filter & lighting
    loadedPhotos.forEach(({ img, x, y, width, height }) => {
      if (!img.complete || img.naturalWidth === 0) return;
      ctx.save();
      if (combinedFilter !== "none") {
        ctx.filter = combinedFilter;
      }
      const scale = Math.max(
        width / img.naturalWidth,
        height / img.naturalHeight,
      );
      const sourceWidth = width / scale;
      const sourceHeight = height / scale;
      const sourceX = (img.naturalWidth - sourceWidth) / 2;
      const sourceY = (img.naturalHeight - sourceHeight) / 2;
      ctx.drawImage(
        img,
        sourceX,
        sourceY,
        sourceWidth,
        sourceHeight,
        x,
        y,
        width,
        height,
      );
      ctx.restore();
    });

    // Draw frame overlay on top of photos with scale & position offsets
    if (loadedFrame) {
      ctx.save();
      const centerX = stripW / 2 + frameOffsetX;
      const centerY = stripH / 2 + frameOffsetY;
      const scaleFactor = frameScale / 100;
      ctx.translate(centerX, centerY);
      ctx.scale(scaleFactor, scaleFactor);
      ctx.drawImage(loadedFrame, -stripW / 2, -stripH / 2, stripW, stripH);
      ctx.restore();
    }

    const frameBorderColors: Partial<
      Record<NonNullable<FrameOption["frameStyle"]>, string>
    > = {
      polaroid: "#d1d5db",
      "film-sprocket": "#18181b",
      vintage: "#b45309",
      "cute-pink": "#f472b6",
      neon: "#06b6d4",
      lavender: "#a78bfa",
      mint: "#34d399",
      checkered: "#27272a",
      sunset: "#fb7185",
      sky: "#38bdf8",
      cherry: "#e11d48",
      darkroom: "#f4f4f5",
    };
    const borderColor = currentFrame?.frameStyle
      ? frameBorderColors[currentFrame.frameStyle]
      : undefined;
    if (borderColor) {
      ctx.save();
      if (currentFrame?.frameStyle === "checkered") {
        const tileSize = 14;
        for (let x = 0; x < stripW; x += tileSize) {
          for (let y = 0; y < stripH; y += tileSize) {
            const isEdge =
              x < tileSize ||
              x + tileSize >= stripW ||
              y < tileSize ||
              y + tileSize >= stripH;
            if (!isEdge) continue;
            ctx.fillStyle =
              (Math.floor(x / tileSize) + Math.floor(y / tileSize)) % 2 === 0
                ? "#27272a"
                : "#fff7ed";
            ctx.fillRect(x, y, tileSize, tileSize);
          }
        }
      } else {
        ctx.strokeStyle = borderColor;
        ctx.lineWidth =
          currentFrame?.frameStyle === "film-sprocket" ? 9 : 5;
        ctx.strokeRect(
          ctx.lineWidth / 2,
          ctx.lineWidth / 2,
          stripW - ctx.lineWidth,
          stripH - ctx.lineWidth,
        );
        if (currentFrame?.frameStyle === "film-sprocket") {
          ctx.fillStyle = "#f4f4f5";
          for (let y = 12; y < stripH - 12; y += 24) {
            ctx.fillRect(2, y, 5, 10);
            ctx.fillRect(stripW - 7, y, 5, 10);
          }
        }
      }
      ctx.restore();
    }

    for (const overlay of customOverlays) {
      const image = await loadImageSource(overlay.src);
      const drawWidth = (stripW * overlay.width) / 100;
      const drawHeight = drawWidth * (image.naturalHeight / image.naturalWidth);
      ctx.drawImage(
        image,
        (stripW * overlay.x) / 100 - drawWidth / 2,
        (stripH * overlay.y) / 100 - drawHeight / 2,
        drawWidth,
        drawHeight,
      );
    }

    // Draw bottom text
    if (bottomText && !currentFrame?.image) {
      const textEl = stripEl.querySelector(
        ".strip-bottom-text",
      ) as HTMLElement | null;
      const textY = textEl ? textEl.offsetTop + 14 : stripH - 12;
      ctx.fillStyle =
        currentFrame?.frameStyle === "bingkai2" ? "#f3f4f6" : "#6b7280";
      ctx.font = "600 12px Montserrat, sans-serif";
      ctx.textAlign = "center";
      ctx.fillText(bottomText, stripW / 2, textY);
    }

    // Draw placed stickers at their exact coordinates
    stickers.forEach((s) => {
      const stX = (s.x / 100) * stripW;
      const stY = (s.y / 100) * stripH;
      ctx.save();
      ctx.font = `${s.size}px "Segoe UI Emoji", "Apple Color Emoji", "Noto Color Emoji", sans-serif`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(s.emoji, stX, stY);
      ctx.restore();
    });

    // Trigger download
    const link = document.createElement("a");
    link.download = `photobooth-${activeFrameId}-${Date.now()}.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();
    } catch (error) {
      setEditorError(
        error instanceof Error ? error.message : "Hasil foto gagal diunduh.",
      );
    }
  };

  /* ═══════════════════ PHASE 1: CAPTURE ═══════════════════ */
  if (phase === "capture") {
    return (
      <div className="booth-page">
        <div className="capture-layout">
          {/* Left: Camera view */}
          <div className="capture-left">
            <div className="capture-header">
              <span className="capture-label">Studio Photowerd (1×3)</span>
              <span className="capture-template-info">
                Tata Letak: <strong>1 Kolom × 3 Foto</strong>
              </span>
            </div>

            <div className="camera-container" onClick={takePhoto}>
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                style={{ transform: "scaleX(-1)" }}
              />
              <canvas ref={canvasRef} style={{ display: "none" }} />

              {!cameraReady && (
                <div className="camera-placeholder">
                  <p>📸 Klik untuk mengaktifkan kamera</p>
                  <p style={{ fontSize: 13, opacity: 0.7 }}>
                    Izinkan akses kamera pada browser
                  </p>
                </div>
              )}

              {countdown !== null && countdown > 0 && (
                <div className="countdown-overlay">
                  <span className="countdown-number">{countdown}</span>
                </div>
              )}

              {flash && <div className="flash-overlay" />}
            </div>

            <div className="camera-control-bar">
              <button
                className="btn-capture-big"
                disabled={!cameraReady || photos.length >= totalNeeded}
                onClick={takePhoto}
              >
                📸{" "}
                {photos.length >= totalNeeded ? "Foto Selesai" : "Jepret Foto"}
              </button>
            </div>
          </div>

          {/* Right: 1x3 Slot Grid & Actions */}
          <div className="capture-right">
            <div className="layout-section">
              <h3 className="layout-section-title">TATA LETAK FOTO</h3>
              <div className="layout-grid">
                <button className="layout-option active">
                  <LayoutIcon layoutKey="1x3" />
                  <span className="layout-option-label">1×3 Strip</span>
                </button>
              </div>
            </div>

            <p className="photo-counter">
              FOTO {Math.min(photos.length, totalNeeded)} / {totalNeeded}
            </p>

            {/* 1x3 Grid View */}
            <div className="photo-grid-1x3">
              {Array.from({ length: totalNeeded }).map((_, i) => (
                <div
                  key={i}
                  className={`photo-grid-item ${i >= photos.length ? "empty" : ""}`}
                  onClick={() => {
                    if (i < photos.length) {
                      handleRetakeSingle(i);
                    }
                  }}
                  title={
                    i < photos.length ? "Klik untuk foto ulang slot ini" : ""
                  }
                >
                  {i < photos.length ? (
                    <>
                      <img src={photos[i]} alt={`Foto ${i + 1}`} />
                      <span className="slot-badge">Foto {i + 1} ↻</span>
                    </>
                  ) : (
                    <span className="slot-empty-text">Slot {i + 1}</span>
                  )}
                </div>
              ))}
            </div>

            <p className="capture-hint">
              Ketuk salah satu slot foto di atas untuk mengambil ulang foto
              tersebut.
            </p>

            <div className="capture-actions">
              <button
                className="btn-primary"
                disabled={photos.length < totalNeeded}
                onClick={handleContinue}
              >
                Lanjut ke Studio Editor <span className="btn-arrow">→</span>
              </button>
              <button className="btn-outline" onClick={handleRetakeAll}>
                ↻ Ulangi Semua Foto
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  /* ═══════════════════ PHASE 2: EDITOR (FRAME, CAHAYA, FILTER, STIKER) ═══════════════════ */
  const stripStyle: React.CSSProperties = {
    backgroundColor: bgColor,
    backgroundImage: backgroundImage
      ? `url("${backgroundImage}")`
      : getPatternBg(pattern, bgColor),
    backgroundSize: backgroundImage ? "cover" : getPatternSize(pattern),
    backgroundPosition: "center",
    backgroundRepeat: backgroundImage ? "no-repeat" : "repeat",
    ...(currentFrame?.image
      ? {
          width: `${frameWidth}px`,
          height: `${frameHeight}px`,
          padding: 0,
          gap: 0,
          border: 0,
        }
      : {}),
  };

  return (
    <div className="booth-page">
      <div className="editor-layout">
        {/* ── Left Sidebar: Settings ── */}
        <div className="editor-sidebar">
          {/* Header */}
          <div className="editor-header">
            <div>
              <h2 className="editor-title">Photowerd Creative Studio</h2>
              <p className="editor-subtitle">
                Kreasikan Frame, Cahaya, Filter, dan Stiker sesukamu
              </p>
            </div>
            <span className="editor-selected-info">
              Frame: <strong>{currentFrame.name}</strong>
            </span>
          </div>

          {/* ════ 1. ATUR FRAME (DARI FOLDER TEMPLATE) ════ */}
          <div className="setting-section">
            <h4 className="setting-label">PILIH FRAME (TEMPLATE)</h4>
            <div className="category-tags">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  className={`category-tag ${activeCategory === cat ? "active" : ""}`}
                  onClick={() => setActiveCategory(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Frame Cards List */}
            <div className="frame-cards-scroll">
              {filteredFrames.map((f) => (
                <div
                  key={f.id}
                  className={`frame-card ${activeFrameId === f.id ? "active" : ""}`}
                  onClick={() => selectFrame(f)}
                  role="button"
                  tabIndex={0}
                >
                  <div
                    className="frame-card-preview"
                    style={{ backgroundColor: f.bgColor || "#f3f4f6" }}
                  >
                    {f.image ? (
                      <img
                        src={f.image}
                        alt={f.name}
                        className="frame-card-img"
                      />
                    ) : (
                      <div
                        className={`frame-card-mini-strip frame-mini-${f.frameStyle || "none"}`}
                      >
                        <div className="mini-photo-slot" />
                        <div className="mini-photo-slot" />
                        <div className="mini-photo-slot" />
                      </div>
                    )}
                    {activeFrameId === f.id && (
                      <span className="frame-check">✓</span>
                    )}
                  </div>
                  <span className="frame-card-label" title={f.name}>
                    {f.name}
                  </span>
                </div>
              ))}
            </div>

            {/* ── Kontrol Pengaturan Skala & Posisi Bingkai ── */}
            {currentFrame?.image && (
              <div className="frame-scale-container">
                <div className="frame-scale-header">
                  <span className="frame-scale-title">
                    📐 UKURAN & POSISI BINGKAI
                  </span>
                  <button
                    type="button"
                    className="btn-reset-frame"
                    onClick={() => {
                      setFrameScale(100);
                      setFrameWidth(240);
                      setFrameHeight(
                        Math.round(
                          240 /
                            (currentFrame.frameStyle === "bingkai2"
                              ? 941 / 1672
                              : 1024 / 1535),
                        ),
                      );
                      setFrameOffsetX(0);
                      setFrameOffsetY(0);
                    }}
                    title="Kembalikan ukuran dan posisi bingkai"
                  >
                    ↻ Reset Bingkai
                  </button>
                </div>

                <div className="slider-item">
                  <div className="slider-label-row">
                    <span>↔️ Lebar Bingkai</span>
                    <span className="slider-value">{frameWidth}px</span>
                  </div>
                  <input
                    type="range"
                    min={160}
                    max={360}
                    value={frameWidth}
                    onChange={(e) => setFrameWidth(Number(e.target.value))}
                    className="custom-slider"
                  />
                </div>

                <div className="slider-item">
                  <div className="slider-label-row">
                    <span>↕️ Tinggi Bingkai</span>
                    <span className="slider-value">{frameHeight}px</span>
                  </div>
                  <input
                    type="range"
                    min={260}
                    max={620}
                    value={frameHeight}
                    onChange={(e) => setFrameHeight(Number(e.target.value))}
                    className="custom-slider"
                  />
                </div>

                {/* Slider Skala Bingkai */}
                <div className="slider-item">
                  <div className="slider-label-row">
                    <span>🔍 Skala Overlay</span>
                    <span className="slider-value">{frameScale}%</span>
                  </div>
                  <input
                    type="range"
                    min={60}
                    max={160}
                    value={frameScale}
                    onChange={(e) => setFrameScale(Number(e.target.value))}
                    className="custom-slider"
                  />
                </div>

                {/* Slider Posisi X & Y */}
                <div className="frame-pos-grid">
                  <div className="slider-item">
                    <div className="slider-label-row">
                      <span>↕️ Geser Y (Atas/Bawah)</span>
                      <span className="slider-value">
                        {frameOffsetY > 0 ? `+${frameOffsetY}` : frameOffsetY}px
                      </span>
                    </div>
                    <input
                      type="range"
                      min={-80}
                      max={80}
                      value={frameOffsetY}
                      onChange={(e) => setFrameOffsetY(Number(e.target.value))}
                      className="custom-slider"
                    />
                  </div>

                  <div className="slider-item">
                    <div className="slider-label-row">
                      <span>↔️ Geser X (Kiri/Kanan)</span>
                      <span className="slider-value">
                        {frameOffsetX > 0 ? `+${frameOffsetX}` : frameOffsetX}px
                      </span>
                    </div>
                    <input
                      type="range"
                      min={-60}
                      max={60}
                      value={frameOffsetX}
                      onChange={(e) => setFrameOffsetX(Number(e.target.value))}
                      className="custom-slider"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* ════ 2. ADJUST CAHAYA SECARA BEBAS ════ */}
          <div className="setting-section">
            <div className="setting-header-row">
              <h4 className="setting-label">ADJUST CAHAYA SECARA BEBAS</h4>
              <button
                type="button"
                className="btn-reset-light"
                onClick={handleResetLighting}
                title="Kembalikan semua slider cahaya ke normal"
              >
                ↻ Reset Cahaya
              </button>
            </div>

            <div className="slider-group">
              {/* Kecerahan */}
              <div className="slider-item">
                <div className="slider-label-row">
                  <span>☀️ Kecerahan (Brightness)</span>
                  <span className="slider-value">{brightness}%</span>
                </div>
                <input
                  type="range"
                  min={50}
                  max={150}
                  value={brightness}
                  onChange={(e) => setBrightness(Number(e.target.value))}
                  className="custom-slider"
                />
              </div>

              {/* Kontras */}
              <div className="slider-item">
                <div className="slider-label-row">
                  <span>🌓 Kontras (Contrast)</span>
                  <span className="slider-value">{contrast}%</span>
                </div>
                <input
                  type="range"
                  min={50}
                  max={150}
                  value={contrast}
                  onChange={(e) => setContrast(Number(e.target.value))}
                  className="custom-slider"
                />
              </div>

              {/* Saturasi */}
              <div className="slider-item">
                <div className="slider-label-row">
                  <span>🎨 Saturasi Warna</span>
                  <span className="slider-value">{saturation}%</span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={200}
                  value={saturation}
                  onChange={(e) => setSaturation(Number(e.target.value))}
                  className="custom-slider"
                />
              </div>

              {/* Kehangatan */}
              <div className="slider-item">
                <div className="slider-label-row">
                  <span>🔥 Kehangatan / Warmth</span>
                  <span className="slider-value">{warmth}%</span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={100}
                  value={warmth}
                  onChange={(e) => setWarmth(Number(e.target.value))}
                  className="custom-slider"
                />
              </div>

              {/* Exposure */}
              <div className="slider-item">
                <div className="slider-label-row">
                  <span>✨ Exposure / Pencahayaan</span>
                  <span className="slider-value">
                    {exposure > 0 ? `+${exposure}` : exposure}
                  </span>
                </div>
                <input
                  type="range"
                  min={-40}
                  max={40}
                  value={exposure}
                  onChange={(e) => setExposure(Number(e.target.value))}
                  className="custom-slider"
                />
              </div>
            </div>
          </div>

          {/* ════ 3. FILTER PRESET ════ */}
          <div className="setting-section">
            <h4 className="setting-label">FILTER WARNA</h4>
            <div className="filter-options">
              {FILTERS.map((f) => (
                <button
                  key={f.id}
                  className={`filter-option ${filter === f.id ? "active" : ""}`}
                  onClick={() => setFilter(f.id)}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>

          {/* ════ 4. STIKER (DRAGGABLE / GESER BEBAS) ════ */}
          <div className="setting-section">
            <div className="setting-header-row">
              <h4 className="setting-label">STIKER (BEBAS DIATUR POSISINYA)</h4>
              {stickers.length > 0 && (
                <span className="sticker-count-badge">
                  {stickers.length} stiker
                </span>
              )}
            </div>

            <p className="sticker-hint">
              👉 Klik stiker untuk menambahkan, lalu{" "}
              <strong>seret / drag stiker di strip foto</strong> untuk mengatur
              posisinya sesukamu!
            </p>

            <div className="sticker-grid">
              {STICKERS.map((s, index) => (
                <button
                  key={`${s}-${index}`}
                  type="button"
                  className="sticker-item"
                  onClick={() => addSticker(s)}
                  title={`Tambah ${s}`}
                >
                  {s}
                </button>
              ))}
            </div>

            {/* Kontrol stiker yang sedang dipilih */}
            {selectedSticker && (
              <div className="active-sticker-controls">
                <div className="sticker-control-row">
                  <span>Ukuran ({selectedSticker.emoji}):</span>
                  <input
                    type="range"
                    min={20}
                    max={60}
                    value={selectedSticker.size}
                    onChange={(e) => updateStickerSize(Number(e.target.value))}
                    className="custom-slider"
                    style={{ maxWidth: 140 }}
                  />
                  <span style={{ fontSize: 12, fontWeight: 700 }}>
                    {selectedSticker.size}px
                  </span>
                  <button
                    type="button"
                    className="btn-del-single-sticker"
                    onClick={() => removeSticker(selectedSticker.id)}
                  >
                    🗑️ Hapus
                  </button>
                </div>
              </div>
            )}

            <div className="sticker-actions">
              {selectedStickerId && (
                <button
                  type="button"
                  className="sticker-action-btn"
                  onClick={() => removeSticker(selectedStickerId)}
                >
                  Hapus stiker terpilih
                </button>
              )}
              {stickers.length > 0 && (
                <button
                  type="button"
                  className="sticker-action-btn danger"
                  onClick={clearAllStickers}
                >
                  Hapus semua stiker
                </button>
              )}
            </div>
          </div>

          {/* ════ 5. WARNA & POLA LATAR ════ */}
          <div className="setting-section">
            <h4 className="setting-label">LATAR STRIP</h4>
            <div className="color-palette">
              {BG_COLORS.map((c) => (
                <button
                  key={c}
                  className={`color-swatch ${bgColor === c ? "active" : ""}`}
                  style={{ backgroundColor: c }}
                  onClick={() => {
                    setBgColor(c);
                    setBackgroundImage(null);
                  }}
                  title={c}
                />
              ))}
            </div>
            <input
              accept="image/*"
              className="image-upload-input"
              onChange={(event) => handleImageUpload(event, "background")}
              ref={backgroundInputRef}
              type="file"
            />
            <div className="image-upload-actions">
              <button
                className="image-upload-button"
                onClick={() => backgroundInputRef.current?.click()}
                type="button"
              >
                {backgroundImage ? "Ganti gambar latar" : "＋ Unggah gambar latar"}
              </button>
              {backgroundImage && (
                <button
                  className="image-remove-button"
                  onClick={() => setBackgroundImage(null)}
                  type="button"
                >
                  Hapus gambar
                </button>
              )}
            </div>
            <p className="image-upload-hint">
              Gambar akan memenuhi area strip dan dipotong agar pas.
            </p>
          </div>

          <div className="setting-section">
            <h4 className="setting-label">POLA LATAR</h4>
            <div className="pattern-options">
              {PATTERNS.map((p) => (
                <button
                  key={p.id}
                  className={`pattern-option ${pattern === p.id ? "active" : ""}`}
                  onClick={() => {
                    setPattern(p.id);
                    setBackgroundImage(null);
                  }}
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>

          <div className="setting-section">
            <div className="setting-header-row">
              <h4 className="setting-label">GAMBAR OVERLAY</h4>
              {customOverlays.length > 0 && (
                <button
                  className="image-remove-button"
                  onClick={() => {
                    setCustomOverlays([]);
                    setSelectedOverlayId(null);
                  }}
                  type="button"
                >
                  Hapus semua
                </button>
              )}
            </div>
            <input
              accept="image/*"
              className="image-upload-input"
              onChange={(event) => handleImageUpload(event, "overlay")}
              multiple
              ref={overlayInputRef}
              type="file"
            />
            <button
              className="image-upload-button"
              onClick={() => overlayInputRef.current?.click()}
              type="button"
            >
              ＋ Unggah gambar overlay
            </button>
            <p className="image-upload-hint">
              Unggah satu atau beberapa gambar sekaligus. Setiap overlay dapat
              dipindahkan dan diubah ukurannya secara terpisah.
            </p>
            {customOverlays.length > 0 && (
              <div className="custom-overlay-list">
                {customOverlays.map((overlay, index) => (
                  <div
                    className={`custom-overlay-item ${selectedOverlayId === overlay.id ? "is-selected" : ""}`}
                    key={overlay.id}
                    onClick={() => setSelectedOverlayId(overlay.id)}
                  >
                    <img
                      alt=""
                      className="custom-overlay-thumbnail"
                      src={overlay.src}
                    />
                    <div className="custom-overlay-details">
                      <div className="custom-overlay-title">
                        <span title={overlay.name}>
                          {index + 1}. {overlay.name}
                        </span>
                        <button
                          aria-label={`Hapus overlay ${overlay.name}`}
                          className="image-remove-button"
                          onClick={(event) => {
                            event.stopPropagation();
                            setCustomOverlays((current) =>
                              current.filter((item) => item.id !== overlay.id),
                            );
                            if (selectedOverlayId === overlay.id) {
                              setSelectedOverlayId(null);
                            }
                          }}
                          type="button"
                        >
                          ×
                        </button>
                      </div>
                      <label className="slider-item">
                        <span className="slider-label-row">
                          <span>Skala ukuran overlay</span>
                          <span className="slider-value">
                            {overlay.width}%
                          </span>
                        </span>
                        <input
                          className="custom-slider"
                          max={500}
                          min={1}
                          onChange={(event) =>
                            setCustomOverlays((current) =>
                              current.map((item) =>
                                item.id === overlay.id
                                  ? {
                                      ...item,
                                      width: Number(event.target.value),
                                    }
                                  : item,
                              ),
                            )
                          }
                          onClick={(event) => event.stopPropagation()}
                          type="range"
                          value={overlay.width}
                        />
                        <div className="overlay-scale-input-row">
                          <span>Masukkan skala (%)</span>
                          <input
                            aria-label={`Skala overlay ${overlay.name} dalam persen`}
                            className="overlay-scale-input"
                            max={500}
                            min={1}
                            onChange={(event) => {
                              if (event.target.value === "") return;
                              const width = Number(event.target.value);
                              if (!Number.isFinite(width)) return;
                              setCustomOverlays((current) =>
                                current.map((item) =>
                                  item.id === overlay.id
                                    ? {
                                        ...item,
                                        width: Math.max(1, Math.min(500, width)),
                                      }
                                    : item,
                                ),
                              );
                            }}
                            onBlur={(event) => {
                              const width = Number(event.target.value);
                              setCustomOverlays((current) =>
                                current.map((item) =>
                                  item.id === overlay.id
                                    ? {
                                        ...item,
                                        width: Number.isFinite(width)
                                          ? Math.max(1, Math.min(500, width))
                                          : item.width,
                                      }
                                    : item,
                                ),
                              );
                            }}
                            onClick={(event) => event.stopPropagation()}
                            type="number"
                            value={overlay.width}
                          />
                          <span>%</span>
                        </div>
                      </label>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* ════ 6. TEKS BAWAH ════ */}
          <div className="setting-section">
            <h4 className="setting-label">TEKS BAWAH STRIP</h4>
            <input
              type="text"
              className="bottom-text-input"
              value={bottomText}
              onChange={(e) => setBottomText(e.target.value)}
              placeholder="Teks bawah strip Photowerd..."
            />
          </div>

          {/* Actions */}
          {editorError && (
            <p className="editor-error" role="alert">
              {editorError}
            </p>
          )}
          <div className="editor-actions">
            <button className="btn-download" onClick={downloadStrip}>
              Unduh Photostrip HD <span className="btn-arrow">→</span>
            </button>
          </div>

          <div className="editor-footer-links">
            <button className="footer-link" onClick={handleBackToCapture}>
              ← Ambil ulang foto
            </button>
            <button className="footer-link" onClick={handleStartOver}>
              Mulai dari awal
            </button>
          </div>
        </div>

        {/* ── Right Panel: Strip Preview (1x3) ── */}
        <div className="preview-panel">
          <div className="preview-sticky-wrap">
            <div className="preview-helper-text">
              ✨ Seret stiker langsung di foto untuk memindahkannya
            </div>

            <div
              className={`strip-preview ${currentFrame?.frameStyle ? `frame-${currentFrame.frameStyle}` : ""} ${currentFrame?.image ? "has-image-frame" : ""}`}
              id="strip-preview"
              style={stripStyle}
              onClick={() => setSelectedStickerId(null)}
            >
              {/* 3 Photos in vertical 1x3 strip */}
              <div
                className="strip-photos-container"
                style={
                  currentFrame?.image
                    ? {
                        transform: `translate(${frameOffsetX}px, ${frameOffsetY}px) scale(${frameScale / 100})`,
                        transformOrigin: "center",
                      }
                    : undefined
                }
              >
                {photos.map((photo, i) => (
                  <div key={i} className="strip-photo-slot">
                    <img
                      src={photo}
                      alt={`Strip ${i + 1}`}
                      style={{ filter: combinedFilter }}
                    />
                  </div>
                ))}
              </div>

              {/* Frame overlay dari folder template (bingkai.png / bingkai2.png) */}
              {currentFrame?.image && (
                <img
                  src={currentFrame.image}
                  alt={currentFrame.name}
                  className="strip-frame-overlay"
                  style={{
                    transform: `translate(-50%, -50%) translate(${frameOffsetX}px, ${frameOffsetY}px) scale(${frameScale / 100})`,
                  }}
                />
              )}

              {customOverlays.length > 0 && (
                <div className="strip-custom-overlay-layer">
                  {customOverlays.map((overlay) => (
                    <img
                      alt={`Overlay ${overlay.name}`}
                      className={`strip-custom-overlay ${selectedOverlayId === overlay.id ? "is-selected" : ""}`}
                      draggable={false}
                      key={overlay.id}
                      onPointerDown={(event) =>
                        handleOverlayPointerDown(event, overlay)
                      }
                      onPointerMove={handleOverlayPointerMove}
                      onPointerUp={handleOverlayPointerUp}
                      src={overlay.src}
                      style={{
                        left: `${overlay.x}%`,
                        top: `${overlay.y}%`,
                        width: `${overlay.width}%`,
                      }}
                      title={`Seret untuk mengatur posisi ${overlay.name}`}
                    />
                  ))}
                </div>
              )}

              {/* Layer Stiker Draggable */}
              <div className="strip-stickers-layer">
                {stickers.map((s) => {
                  const isSelected = selectedStickerId === s.id;
                  return (
                    <span
                      key={s.id}
                      className={`strip-sticker ${isSelected ? "selected" : ""}`}
                      style={{
                        left: `${s.x}%`,
                        top: `${s.y}%`,
                        fontSize: `${s.size}px`,
                      }}
                      onPointerDown={(e) => handleStickerPointerDown(e, s.id)}
                      onPointerMove={handleStickerPointerMove}
                      onPointerUp={handleStickerPointerUp}
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedStickerId(s.id);
                      }}
                      title="Geser stiker ini"
                    >
                      {s.emoji}
                      {isSelected && (
                        <button
                          type="button"
                          className="sticker-delete-bubble"
                          onClick={(e) => {
                            e.stopPropagation();
                            removeSticker(s.id);
                          }}
                          title="Hapus stiker ini"
                        >
                          ×
                        </button>
                      )}
                    </span>
                  );
                })}
              </div>

              {/* Bottom text */}
              {bottomText && !currentFrame?.image && (
                <p className="strip-bottom-text">{bottomText}</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════ Layout Icon SVG ═══════════════════ */

function LayoutIcon({ layoutKey }: { layoutKey: LayoutKey }) {
  const size = 26;
  const pad = 2;

  const configs: Record<LayoutKey, { rows: number; cols: number }> = {
    "1x3": { rows: 3, cols: 1 },
  };

  const { rows, cols } = configs[layoutKey];
  const cellW = (size - pad * (cols + 1)) / cols;
  const cellH = (size - pad * (rows + 1)) / rows;

  const rects: React.JSX.Element[] = [];
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      rects.push(
        <rect
          key={`${r}-${c}`}
          x={pad + c * (cellW + pad)}
          y={pad + r * (cellH + pad)}
          width={cellW}
          height={cellH}
          rx={1}
          fill="currentColor"
          opacity={0.7}
        />,
      );
    }
  }

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <rect
        width={size}
        height={size}
        rx={3}
        fill="none"
        stroke="currentColor"
        strokeWidth={1}
        opacity={0.3}
      />
      {rects}
    </svg>
  );
}
