function TabButton(props) {
  return (
    <button
      onClick={props.onClick}
      className={`rounded-md border px-4 py-2 w-[45%] text-black text-2xl sm:text-base hover:bg-blue-700 transition disabled:bg-gray-400 disabled:cursor-not-allowed h-13 ${
        props.active ? "border-b-gray-800" : "border-transparent"
      }`}
    >
      {props.text}
    </button>
  );
}

export default TabButton;
