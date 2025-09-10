"use client";

import { useState, useRef } from "react";
import { Rnd } from "react-rnd";

export default function Home() {
  const [data, setData] = useState(null);
  const [pic, setPic] = useState(null);
  const [picURL, setPicURL] = useState(null);
  const [pants, setPants] = useState(null);
  const [pantsURL, setPantsURL] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Use a consistent base URL for all API calls
  const API_BASE = "https://vjezba-back.onrender.com";

  const handleInput = (e) => {
    setMess(e.target.value);
  };

  const uploadImg = async () => {
    setLoading(true);
    setError(null);
    try {
      const form = new FormData();
      form.append("img", pic, pic.name);

      const res = await fetch(`${API_BASE}/upload/`, {
        method: "POST",
        body: form,
        // Important for mobile CORS
        headers: {
          Accept: "application/json",
        },
        mode: "cors",
      });

      if (!res.ok) {
        throw new Error(`Server returned ${res.status}`);
      }

      const data = await res.blob();
      setPicURL(URL.createObjectURL(data));
    } catch (err) {
      console.log("Error fetching", err);
      setError("Failed to upload image: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const uploadPants = async () => {
    setLoading(true);
    setError(null);
    try {
      const form = new FormData();
      form.append("img", pants, pants.name);

      const res = await fetch(`${API_BASE}/upload/`, {
        method: "POST",
        body: form,
        headers: {
          Accept: "application/json",
        },
        mode: "cors",
      });

      if (!res.ok) {
        throw new Error(`Server returned ${res.status}`);
      }

      const data = await res.blob();
      setPantsURL(URL.createObjectURL(data));
    } catch (err) {
      console.log("Error fetching", err);
      setError("Failed to upload pants: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="font-sans flex flex-col items-center min-h-screen p-4 sm:p-8">
      <main className="flex flex-col gap-6 w-full max-w-lg">
        <h1 className="text-2xl font-bold text-center">
          Image Background Remover
        </h1>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            {error}
          </div>
        )}

        {loading && (
          <div className="text-blue-500 text-center">Processing image...</div>
        )}

        {/* Shirt input */}
        <div>
          <label className="block text-sm font-medium mb-1">Shirt Image:</label>
          <input
            type="file"
            accept="image/*"
            className="border border-gray-300 rounded-md p-2 w-full text-sm sm:text-base cursor-pointer bg-gray-50"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) {
                setPicURL(URL.createObjectURL(file));
                setPic(file);
              }
            }}
          />
        </div>

        {/* Pants input */}
        <div>
          <label className="block text-sm font-medium mb-1">Pants Image:</label>
          <input
            type="file"
            accept="image/*"
            className="border border-gray-300 rounded-md p-2 w-full text-sm sm:text-base cursor-pointer bg-gray-50"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) {
                setPantsURL(URL.createObjectURL(file));
                setPants(file);
              }
            }}
          />
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 w-full">
          <button
            onClick={uploadImg}
            disabled={!pic || loading}
            className="rounded-md border px-4 py-2 bg-blue-600 text-white text-sm sm:text-base hover:bg-blue-700 transition disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            Remove Shirt Background
          </button>
          <button
            onClick={uploadPants}
            disabled={!pants || loading}
            className="rounded-md border px-4 py-2 bg-blue-600 text-white text-sm sm:text-base hover:bg-blue-700 transition disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            Remove Pants Background
          </button>
        </div>

        {/* Results */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
          {/* Shirt preview */}
          <div className="relative w-full h-64 border border-gray-200 rounded-md">
            <h3 className="text-sm font-medium mb-1">Shirt Preview</h3>
            <Rnd
              className="border border-blue-500 rounded-md shadow-md bg-white"
              default={{ x: 10, y: 10, width: 200, height: 200 }}
              bounds="parent"
              lockAspectRatio
              minWidth={100}
              minHeight={100}
            >
              <div className="w-full h-full flex items-center justify-center overflow-hidden">
                {picURL && (
                  <img
                    src={picURL}
                    alt="shirt preview"
                    className="w-full h-full object-contain"
                  />
                )}
              </div>
            </Rnd>
          </div>

          {/* Pants preview */}
          <div className="relative w-full h-64 border border-gray-200 rounded-md">
            <h3 className="text-sm font-medium mb-1">Pants Preview</h3>
            <Rnd
              className="border border-blue-500 rounded-md shadow-md bg-white"
              default={{ x: 10, y: 10, width: 200, height: 200 }}
              bounds="parent"
              lockAspectRatio
              minWidth={100}
              minHeight={100}
            >
              <div className="w-full h-full flex items-center justify-center overflow-hidden">
                {pantsURL && (
                  <img
                    src={pantsURL}
                    alt="pants preview"
                    className="w-full h-full object-contain"
                  />
                )}
              </div>
            </Rnd>
          </div>
        </div>
      </main>
    </div>
  );
}
