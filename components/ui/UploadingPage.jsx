"use client";
import useUploadStore from "@/store/useUploadStore";
import { uploadImage } from "@/lib/upload";
import ClothesCard from "../shared/ClothesCard";

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
  } = useUploadStore();

  const uploadImg = async () => {
    setLoading(true);
    setError(null);

    try {
      const lastPic = pics[pics.length - 1];
      if (!lastPic) throw new Error("No image selected");
      const processed = await uploadImage(lastPic);
      // processed is a Blob (PNG)
      addPic(processed);
      setEditedPhotos(processed);
      incrementBadge();
    } catch (err) {
      console.error("Background removal failed", err);
      setError("Failed to upload image: " + (err?.message || "Unknown error"));
    } finally {
      setLoading(false);
      resetPhotos();
    }
  };

  return (
    <div>
      {error && <div>{error}</div>}
      {loading && <div>Processing image...</div>}

      <div className="flex justify-between">
        <input
          type="file"
          accept="image/*"
          className="border border-gray-300 rounded-md p-2 w-[45%] text-sm sm:text-base cursor-pointer bg-gray-50"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) addPic(file);
          }}
        />
        <button
          onClick={uploadImg}
          disabled={!pics.length || loading}
          className="rounded-md border px-4 py-2 w-[45%] bg-blue-600 text-white text-sm sm:text-base hover:bg-blue-700 transition disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          Remove Background
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
        {picURLs.map((p) => (
          <ClothesCard key={p} url={p} />
        ))}
      </div>
    </div>
  );
}

export default UploadingPage;
