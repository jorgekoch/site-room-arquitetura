import { useEffect, useState } from "react";

import {
  getPublicSiteSettings,
  type SiteSettings,
} from "../lib/settings";

export function useSiteSettings() {
  const [settings, setSettings] =
    useState<SiteSettings | null>(null);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    let cancelled = false;

    async function loadSettings() {
      try {
        const data =
          await getPublicSiteSettings();

        if (!cancelled) {
          setSettings(data);
        }
      } catch (error) {
        console.error(
          "Erro ao carregar configurações públicas:",
          error
        );
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    loadSettings();

    return () => {
      cancelled = true;
    };
  }, []);

  return {
    settings,
    loading,
  };
}