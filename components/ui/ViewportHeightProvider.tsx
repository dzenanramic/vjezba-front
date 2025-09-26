"use client";
import { useEffect } from "react";

/**
 * Sets a CSS variable --vh equal to 1% of the real innerHeight.
 * This helps mitigate mobile browser chrome expanding/collapsing affecting 100vh.
 */
export function ViewportHeightProvider() {
  useEffect(() => {
    function setVH() {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty("--vh", `${vh}px`);
    }
    setVH();
    window.addEventListener("resize", setVH);
    window.addEventListener("orientationchange", setVH);
    return () => {
      window.removeEventListener("resize", setVH);
      window.removeEventListener("orientationchange", setVH);
    };
  }, []);
  return null;
}
