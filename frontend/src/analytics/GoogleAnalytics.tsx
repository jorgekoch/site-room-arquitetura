import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const GA_MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID?.trim();

type Gtag = (
  command: "js" | "config" | "event",
  target: string | Date,
  params?: Record<string, unknown>,
) => void;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: Gtag;
  }
}

let initialized = false;

function initializeGoogleAnalytics() {
  if (!GA_MEASUREMENT_ID || initialized || typeof window === "undefined") {
    return;
  }

  const scriptId = "google-analytics-gtag";

  if (!document.getElementById(scriptId)) {
    const script = document.createElement("script");
    script.id = scriptId;
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(
      GA_MEASUREMENT_ID,
    )}`;
    document.head.appendChild(script);
  }

  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag(...args) {
    window.dataLayer?.push(args);
  };

  window.gtag("js", new Date());
  window.gtag("config", GA_MEASUREMENT_ID, {
    send_page_view: false,
  });

  initialized = true;
}

export function GoogleAnalytics() {
  const location = useLocation();

  useEffect(() => {
    initializeGoogleAnalytics();
  }, []);

  useEffect(() => {
    if (!GA_MEASUREMENT_ID || !initialized || !window.gtag) {
      return;
    }

    if (location.pathname.startsWith("/admin")) {
      return;
    }

    window.gtag("event", "page_view", {
      page_title: document.title,
      page_location: window.location.href,
      page_path: `${location.pathname}${location.search}`,
    });
  }, [location.pathname, location.search]);

  return null;
}

export function trackAnalyticsEvent(
  eventName: string,
  parameters?: Record<string, unknown>,
) {
  if (!GA_MEASUREMENT_ID || !window.gtag) {
    return;
  }

  window.gtag("event", eventName, parameters);
}
