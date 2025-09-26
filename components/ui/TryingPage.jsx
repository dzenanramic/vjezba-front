import React from "react";
import useUploadStore from "@/store/useUploadStore";
import ClothesCard from "../shared/ClothesCard";

function TryingPage() {
  const { editedPhotos } = useUploadStore();

  return (
    <div style={{ height: "100%" }}>
      {editedPhotos &&
        editedPhotos.map((p) => <ClothesCard key={p.id} url={p.url} />)}
    </div>
  );
}

export default TryingPage;
