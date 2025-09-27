import { Rnd } from "react-rnd";
import { useState, useEffect } from "react";

function ClothesCard({ url, id, onRemove }) {
  const [size, setSize] = useState({ width: 200, height: 200 });
  const [hover, setHover] = useState(false);
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    // Detect touch / mobile environment
    try {
      const touchCapable =
        typeof window !== "undefined" &&
        ("ontouchstart" in window || navigator.maxTouchPoints > 0);
      setIsTouch(!!touchCapable);
    } catch {
      setIsTouch(false);
    }
  }, []);

  const handleImageLoad = (e) => {
    const { naturalWidth, naturalHeight } = e.target;
    setSize({ width: naturalWidth, height: naturalHeight });
  };

  return (
    <Rnd
      default={{ x: 0, y: 0, width: size.width, height: size.height }}
      lockAspectRatio
      minWidth={100}
      minHeight={100}
      bounds="parent"
      resizeGrid={[10, 10]}
      cancel=".no-drag"
      style={{ maxWidth: "100%", maxHeight: "100%" }}
      className="mx-auto"
    >
      <div
        className="w-full h-full relative flex items-center justify-center overflow-hidden transition group"
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        <img
          src={url}
          alt="pants preview"
          className="w-full h-full object-contain pointer-events-none select-none drop-shadow-md group-hover:scale-105 transition"
          onLoad={handleImageLoad}
        />
        {/* Corners */}
        <span className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-blue-400/70 "></span>
        <span className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-blue-400/70 "></span>
        <span className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-blue-400/70 "></span>
        <span className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-blue-400/70 "></span>

        {/* Remove button */}
        {onRemove && (
          <button
            type="button"
            aria-label="Ukloni sliku"
            onClick={(e) => {
              e.stopPropagation();
              onRemove(id ?? url);
            }}
            onTouchStart={(e) => {
              // Prevent drag & trigger removal immediately for better UX
              e.stopPropagation();
              e.preventDefault();
            }}
            className={`no-drag absolute top-1 right-1 z-50 w-5 h-5 rounded-full bg-red-500/95 active:bg-red-600 text-white shadow-lg flex items-center justify-center text-base font-bold border border-white/80 backdrop-blur
              ${
                isTouch
                  ? "opacity-100 scale-100"
                  : hover
                  ? "opacity-100 scale-100"
                  : "opacity-0 scale-75"
              } transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-1`}
          >
            ×
          </button>
        )}
      </div>
    </Rnd>
  );
}

export default ClothesCard;
