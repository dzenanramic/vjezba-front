import { Rnd } from "react-rnd";

function ClothesCard(props) {
  return (
    <Rnd
      // className="border border-blue-500 rounded-md shadow-md bg-white"
      default={{ x: 10, y: 10, width: 200, height: 200 }}
      lockAspectRatio
      minWidth={100}
      minHeight={100}
    >
      <div className="w-full h-full flex items-center justify-center overflow-hidden">
        <img
          src={props.url}
          alt="pants preview"
          className="w-full h-full object-contain"
        />
      </div>
    </Rnd>
  );
}

export default ClothesCard;
