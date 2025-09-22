"use client";
import React from "react";
import UploadingPage from "./UploadingPage";
import TryingPage from "./TryingPage";
import useTabStore from "@/store/useTabStore";

function WardrobePage() {
  const { uploading } = useTabStore();

  return <div> {uploading ? <UploadingPage /> : <TryingPage />}</div>;
}

export default WardrobePage;
