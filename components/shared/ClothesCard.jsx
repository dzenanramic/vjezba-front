import { Rnd } from "react-rnd";
import { useState } from "react";

function ClothesCard(props) {
  const [size, setSize] = useState({ width: 200, height: 200 });

  const handleImageLoad = (e) => {
    const { naturalWidth, naturalHeight } = e.target;
    setSize({ width: naturalWidth, height: naturalHeight });
  };

  return (
    <Rnd
      default={{ x: 40, y: 200, width: size.width, height: size.height }}
      lockAspectRatio
      minWidth={100}
      minHeight={100}
      bounds="parent"
      dragGrid={[1, 1]}
      resizeGrid={[10, 10]}
      style={{ maxWidth: "100%", maxHeight: "100%" }}
    >
      <div className="w-full h-full relative flex items-center justify-center overflow-hidden rounded-2xl  transition group">
        <img
          src={props.url}
          alt="pants preview"
          className="w-full h-full object-contain pointer-events-none select-none drop-shadow-md group-hover:scale-105 transition"
          onLoad={handleImageLoad}
        />

        {/* Modern corner borders */}
        <span className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-blue-400 rounded-tl-xl"></span>
        <span className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-blue-400 rounded-tr-xl"></span>
        <span className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-blue-400 rounded-bl-xl"></span>
        <span className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-blue-400 rounded-br-xl"></span>
      </div>
    </Rnd>
  );
}

export default ClothesCard;
