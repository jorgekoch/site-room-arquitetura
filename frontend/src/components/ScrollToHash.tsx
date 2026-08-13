import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export function ScrollToHash() {
  const location = useLocation();

  useEffect(() => {
    if (!location.hash) return;

    const id = decodeURIComponent(location.hash.slice(1));

    const scrollToTarget = () => {
      const element = document.getElementById(id);

      if (!element) return false;

      const yOffset = -80;
      const y =
        element.getBoundingClientRect().top + window.scrollY + yOffset;

      window.scrollTo({
        top: y,
        behavior: "smooth",
      });

      return true;
    };

    // The page section may still be mounting when the hash changes.
    // Try on the next frame so anchors such as #portfolio always resolve.
    const frame = window.requestAnimationFrame(() => {
      if (!scrollToTarget()) {
        window.requestAnimationFrame(scrollToTarget);
      }
    });

    return () => window.cancelAnimationFrame(frame);
  }, [location]);

  return null;
}
