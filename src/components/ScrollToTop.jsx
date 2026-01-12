// src/components/ScrollToTop.jsx
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop({ onRouteChange }) {
  const { pathname } = useLocation();

  useEffect(() => {
    onRouteChange?.(pathname);
    console.error("onRouteChange:", onRouteChange);
  }, [pathname, onRouteChange]);

  return null;
}
