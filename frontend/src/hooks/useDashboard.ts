import {
  useCallback,
  useEffect,
  useState,
} from "react";

import { getDashboard } from "../lib/dashboard";

import { DashboardResponse } from "../types/dashboard";

export function useDashboard() {
  const [
    dashboard,
    setDashboard,
  ] = useState<DashboardResponse>();

  const [
    loading,
    setLoading,
  ] = useState(true);

  const [
    error,
    setError,
  ] = useState("");

  const loadDashboard =
    useCallback(async () => {
      try {
        setLoading(true);

        const response =
          await getDashboard();

        setDashboard(response);

        setError("");
      } catch (err) {
        console.error(err);

        setError(
          "Não foi possível carregar o dashboard."
        );
      } finally {
        setLoading(false);
      }
    }, []);

  useEffect(() => {
    loadDashboard();
  }, [loadDashboard]);

  return {
    dashboard,

    loading,

    error,

    reload: loadDashboard,
  };
}