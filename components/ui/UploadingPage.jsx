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
    editedPhotos,
    shownPhotos,
  } = useUploadStore();
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
    } catch (err) {
      console.error("Background removal failed", err);
      setError("Failed to upload image: " + (err?.message || "Unknown error"));
    } finally {
      setLoading(false);
      resetPhotos();
    }
  };
  return (
    <div className="flex flex-col items-center min-h-[100dvh] pb-[calc(env(safe-area-inset-bottom)+72px)]">
      <div className="flex-grow py-4 w-[95%] px-0 overflow-y-auto overflow-x-hidden">
        {/* Cards boundary wrapper (slightly narrower to prevent horizontal overflow) */}
        {/* <div
          className="relative mx-auto w-full max-w-[680px] px-4 sm:px-6 h-full"
          data-cards-boundary
        > */}
        {error && <div>{error}</div>}
        {loading && <div>Processing image...</div>}
        {picURLs.map((p) => (
          <ClothesCard key={p} url={p} />
        ))}

        {shownPhotos &&
          shownPhotos.map((id) => {
            const photo = editedPhotos.find((p) => p.id === id);
            if (!photo) return null;
            return <ClothesCard key={photo.id} url={photo.url} />;
          })}
        {/* </div> */}
      </div>
      {/* Bottom action bar */}
      <div className="sticky bottom-0 left-0 right-0 w-full max-w-full bg-background/80 backdrop-blur-sm flex gap-3 p-4 pt-2 pb-[calc(0.75rem+env(safe-area-inset-bottom))] border-t z-20">
        <input
          type="file"
          accept="image/*"
          className="border border-gray-300 rounded-md px-2 py-2 basis-1/2 text-xs sm:text-sm cursor-pointer bg-gray-50"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) addPic(file);
          }}
        />
        <button
          onClick={uploadImg}
          disabled={!pics.length || loading}
          className="rounded-md border px-3 py-2 basis-1/2 bg-blue-600 text-white text-xs sm:text-sm hover:bg-blue-700 transition disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          Remove Background
        </button>
      </div>
    </div>
  );
}
export default UploadingPage;
