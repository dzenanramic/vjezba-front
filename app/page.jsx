"use client";

import { useState } from "react";
import { Rnd } from "react-rnd";

export default function Home() {
  const [data, setData] = useState(null);
  const [mess, setMess] = useState(null);
  const [dataMess, setDataMEss] = useState(null);
  const [pic, setPic] = useState(null);
  const [picURL, setPicURL] = useState(null);
  const [pants, setPants] = useState(null);
  const [pantsURL, setPantsURL] = useState(null);

  const handleClick = async () => {
    try {
      const res = await fetch("http://localhost:8000/");
      const json = await res.json();
      setData(json);
    } catch (err) {
      console.log("Error fetching", err);
    }
  };

  const handleInput = (e) => {
    setMess(e.target.value);
  };

  const handleSend = async () => {
    try {
      const res = await fetch("http://localhost:8000/text", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mess: mess }),
      });
      const data = await res.json();
      setDataMEss(data);
      console.log(dataMess);
    } catch (err) {
      console.log("Error fetching", err);
    }
  };

  const handleReset = async () => {
    try {
      await fetch("http://localhost:8000/reset");
      setDataMEss([]);
      const writing = document.getElementById("input");
      writing.value = "";
    } catch (err) {
      console.log("Error", err);
    }
  };

  const uploadImg = async () => {
    try {
      const form = new FormData();
      form.append("img", pic, pic.name);
      const res = await fetch("https://d5af60139cfe.ngrok-free.app/upload/", {
        method: "POST",
        body: form,
      });
      const data = await res.blob();
      setPicURL(URL.createObjectURL(data));
    } catch (err) {
      console.log("Error fetching", err);
    }
  };

  const uploadPants = async () => {
    try {
      const form = new FormData();
      form.append("img", pants, pants.name);
      const res = await fetch("http://localhost:8000/upload/", {
        method: "POST",
        body: form,
      });
      const data = await res.blob();
      setPantsURL(URL.createObjectURL(data));
    } catch (err) {
      console.log("Error fetching", err);
    }
  };

  return (
    <div className="font-sans flex flex-col items-center min-h-screen p-4 sm:p-8">
      <main className="flex flex-col gap-6 w-full max-w-lg">
        {/* Input field */}
        {/* <input
          id="input"
          className="border border-gray-400 rounded-md p-2 w-full text-sm sm:text-base"
          placeholder="Enter text..."
          onInput={handleInput}
          onFocus={(e) => (e.target.value = "")}
        /> */}

        {/* File input */}
        <input
          id="input2"
          type="file"
          accept="image/*,.pdf"
          className="border border-gray-300 rounded-md p-2 w-full text-sm sm:text-base cursor-pointer bg-gray-50"
          onChange={(e) => {
            const path = e.target.files?.[0];
            setPicURL(URL.createObjectURL(path));
            setPic(path);
          }}
        />

        {/* Pants input */}
        <input
          id="pantsInput"
          type="file"
          accept="image/*,.pdf"
          className="border border-gray-300 rounded-md p-2 w-full text-sm sm:text-base cursor-pointer bg-gray-50"
          onChange={(e) => {
            const path = e.target.files?.[0];
            setPantsURL(URL.createObjectURL(path));
            setPants(path);
          }}
        />

        {/* Buttons - stack on mobile, row on desktop */}
        <div className="flex flex-row gap-3 w-full">
          {/* <button
            onClick={handleSend}
            className="rounded-md border px-4 py-2 bg-black text-white text-sm sm:text-base hover:bg-gray-800 transition w-full sm:w-auto"
          >
            Send word
          </button> */}
          {/* <button
            onClick={handleReset}
            className="rounded-md border px-4 py-2 bg-gray-200 text-sm sm:text-base hover:bg-gray-300 transition w-full sm:w-auto"
          >
            Reset letters
          </button> */}
          <button
            onClick={uploadImg}
            className="rounded-md border px-4 py-2 bg-blue-600 text-white text-sm sm:text-base hover:bg-blue-700 transition w-full sm:w-auto"
          >
            Send Shirt
          </button>
          <button
            onClick={uploadPants}
            className="rounded-md border px-4 py-2 bg-blue-600 text-white text-sm sm:text-base hover:bg-blue-700 transition w-full sm:w-auto"
          >
            Send Pants
          </button>
        </div>

        {/* Results */}
        <div className="flex flex-wrap gap-2">
          {dataMess?.word?.map((w, index) => (
            <div
              key={index}
              className="border border-gray-500 rounded-md px-3 py-2 text-lg"
            >
              {w}
            </div>
          ))}
        </div>

        {/* Resizable image */}
        <div className="relative w-full h-64 sm:h-96 border border-gray-200 rounded-md">
          <Rnd
            className="border border-red-500 rounded-md shadow-md"
            default={{ x: 10, y: 10, width: 200, height: 200 }}
            // bounds="parent"
            lockAspectRatio
            minWidth={100}
            minHeight={100}
          >
            <div className="w-full h-full flex items-center justify-center overflow-hidden">
              {pic && (
                <img
                  src={picURL}
                  alt="preview"
                  className="w-full h-full object-contain"
                />
              )}
            </div>
          </Rnd>
        </div>
        <div className="relative w-full h-64 sm:h-96 border border-gray-200 rounded-md">
          <Rnd
            className="border border-red-500 rounded-md shadow-md"
            default={{ x: 10, y: 10, width: 200, height: 200 }}
            // bounds="parent"
            lockAspectRatio
            minWidth={100}
            minHeight={100}
          >
            <div className="w-full h-full flex items-center justify-center overflow-hidden">
              {pants && (
                <img
                  src={pantsURL}
                  alt="pants preview"
                  className="w-full h-full object-contain"
                />
              )}
            </div>
          </Rnd>
        </div>
      </main>
    </div>
  );
}
