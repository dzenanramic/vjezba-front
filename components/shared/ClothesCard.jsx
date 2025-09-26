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
      default={{ x: 40, y: 0, width: size.width, height: size.height }}
      lockAspectRatio
      minWidth={100}
      minHeight={100}
      bounds="parent"
      dragGrid={[1, 1]}
      resizeGrid={[10, 10]}
      style={{ maxWidth: "100%", maxHeight: "100%" }}
    >
      <div className="w-full h-full relative flex items-center justify-center overflow-hidden ">
        <img
          src={props.url}
          alt="pants preview"
          className="w-full h-full object-contain pointer-events-none select-none"
          onLoad={handleImageLoad}
        />

        {/* Corner borders */}
        <span className="absolute top-0 left-0 w-3 h-3 border-t border-l border-blue-500"></span>
        <span className="absolute top-0 right-0 w-3 h-3 border-t border-r border-blue-500"></span>
        <span className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-blue-500"></span>
        <span className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-blue-500"></span>
      </div>
    </Rnd>
  );
}

export default ClothesCard;
