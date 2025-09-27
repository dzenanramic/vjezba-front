"use client";
import useUploadStore from "@/store/useUploadStore";
import { uploadImage } from "@/lib/upload";
import ClothesCard from "../shared/ClothesCard";
import { useEffect, useRef, useState } from "react";

function UploadingPage() {
  const {
    pics,
    picURLs,
    loading,
    error,
    addPic,
    setLoading,
    setError,
    resetPhotos,
    setEditedPhotos,
    incrementBadge,
    editedPhotos,
    shownPhotos,
    removeShownPhoto,
    removeOriginalPic,
  } = useUploadStore();

  // Local toast (success) state
  const [successMsg, setSuccessMsg] = useState("");
  const toastTimerRef = useRef(null);

  // Clear any pending timeout on unmount
  useEffect(() => {
    return () => {
      if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
    };
  }, []);

  const uploadImg = async () => {
    setLoading(true);
    setError(null);
    try {
      const lastPic = pics[pics.length - 1];
      if (!lastPic) throw new Error("No image selected");
      const processed = await uploadImage(lastPic);
      addPic(processed);
      setEditedPhotos(processed);
      incrementBadge();
      // Show success toast
      setSuccessMsg(" Pozadina je uspješno uklonjena");
      if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
      toastTimerRef.current = setTimeout(() => setSuccessMsg(""), 3500);
    } catch (err) {
      console.error("Background removal failed", err);
      setError("❌ " + (err?.message || "Failed to upload image"));
    } finally {
      setLoading(false);
      resetPhotos();
    }
  };

  return (
    <div className="flex flex-col items-center min-h-[100dvh] pb-[calc(env(safe-area-inset-bottom)+80px)] lg:pb-10 w-full">
      {/* Success Toast */}
      {successMsg && (
        <div className="fixed bottom-18 right-4 z-[100] animate-fadeIn">
          <div className="rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 px-4 py-3 shadow-lg text-sm font-medium flex items-center gap-2">
            <span role="img" aria-label="success">
              ✅
            </span>
            {successMsg}
          </div>
        </div>
      )}
      {/* Desktop Toolbar (replaces bottom bar) */}
      <div className="hidden lg:flex items-center gap-4 w-full max-w-5xl mx-auto sticky top-0 z-30 bg-white/70 backdrop-blur-xl border border-gray-200 rounded-2xl px-6 py-3 mt-2 shadow-sm">
        <label className="cursor-pointer">
          <input
            type="file"
            accept="image/*"
            disabled={loading}
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) addPic(file);
            }}
          />
          <span className="inline-flex items-center bg-gray-100 hover:bg-gray-200 active:bg-gray-300 text-gray-700 rounded-xl px-4 py-2 text-sm font-medium border border-gray-300 shadow-sm transition cursor-pointer">
            📂 Odaberi sliku
          </span>
        </label>
        <button
          onClick={uploadImg}
          disabled={!pics.length || loading}
          className="rounded-xl border px-6 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-sm font-semibold shadow-md hover:from-blue-700 hover:to-indigo-700 transition disabled:from-gray-400 disabled:to-gray-400 disabled:cursor-not-allowed"
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <svg
                className="animate-spin h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v8z"
                />
              </svg>
              Obrada...
            </span>
          ) : (
            "✨ Ukolni pozadinu"
          )}
        </button>
        <div className="ml-auto text-xs text-gray-500 pr-2 hidden xl:block">
          Savjet: Možete povući i promijeniti veličinu svake slike.
        </div>
      </div>

      {/* Gallery */}
      <div className="flex-grow py-6 w-full max-w-5xl px-2 sm:px-4 lg:px-2 overflow-y-auto overflow-x-hidden">
        {error && (
          <div className="mb-4 w-full rounded-xl bg-red-50 text-red-700 px-4 py-3 text-center shadow-md border border-red-200 animate-fadeIn">
            {error}
          </div>
        )}

        {picURLs.length === 0 && shownPhotos.length === 0 && (
          <div className="h-64 flex flex-col justify-center items-center text-gray-400 bg-white/60 backdrop-blur-md rounded-xl border border-dashed border-gray-300 shadow-inner">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-12 h-12 mb-3 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4v16m8-8H4"
              />
            </svg>
            <p className="text-lg font-medium">Još uvijek nema slika</p>
            <p className="text-sm text-gray-500">
              Postavite (slike) da počnete
            </p>
          </div>
        )}

        {/* Drag canvas with large vertical space for free movement */}
        <div className="drag-canvas relative w-full min-h-[1400px] md:min-h-[1800px] border border-dashed border-transparent">
          {picURLs.map((p) => (
            <ClothesCard key={p} url={p} onRemove={removeOriginalPic} />
          ))}
          {shownPhotos &&
            shownPhotos.map((id) => {
              const photo = editedPhotos.find((p) => p.id === id);
              if (!photo) return null;
              return (
                <ClothesCard
                  key={photo.id}
                  id={photo.id}
                  url={photo.url}
                  onRemove={removeShownPhoto}
                />
              );
            })}
        </div>
      </div>

      {/* Bottom Action Bar */}
      <div className="fixed lg:hidden bottom-2 left-0 right-0 mx-auto w-full max-w-2xl bg-white/80 backdrop-blur-xl flex justify-center gap-3 p-4 pt-2 pb-[calc(1rem+env(safe-area-inset-bottom))] border-t border-gray-200 shadow-lg rounded-t-2xl z-20 animate-slideUp">
        <label className="flex-1 cursor-pointer">
          <input
            type="file"
            accept="image/*"
            disabled={loading}
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) addPic(file);
            }}
          />
          <span className="block w-full text-center bg-gray-100 hover:bg-gray-200 active:bg-gray-300 text-gray-700 rounded-xl px-4 py-2 text-sm sm:text-base border border-gray-300 shadow-sm transition cursor-pointer">
            📂 Odaberi sliku
          </span>
        </label>
        <button
          onClick={uploadImg}
          disabled={!pics.length || loading}
          className="flex-1 rounded-xl border px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-sm sm:text-base font-semibold shadow-md hover:from-blue-700 hover:to-indigo-700 transition disabled:from-gray-400 disabled:to-gray-400 disabled:cursor-not-allowed"
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <svg
                className="animate-spin h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v8z"
                />
              </svg>
              Obrada...
            </span>
          ) : (
            "✨ Ukolni pozadinu"
          )}
        </button>
      </div>
    </div>
  );
}
export default UploadingPage;
