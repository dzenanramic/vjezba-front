import React from "react";
import useUploadStore from "@/store/useUploadStore";
import ClothesCard from "../shared/ClothesCard";

function TryingPage() {
  const { editedPhotos } = useUploadStore();

  return (
    <div>
      {editedPhotos && editedPhotos.map((p) => <ClothesCard key={p} url={p} />)}
    </div>
  );
}

export default TryingPage;
