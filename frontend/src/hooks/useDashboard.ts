import {
  useCallback,
  useEffect,
  useState,
} from "react";

import {
  getDashboard,
  getDashboardAnalytics,
} from "../lib/dashboard";

import { DashboardResponse, AnalyticsOverview } from "../types/dashboard";

export function useDashboard() {
  const [
    dashboard,
    setDashboard,
  ] = useState<DashboardResponse>();

  const [analytics, setAnalytics] = useState<AnalyticsOverview>();

  const [
    loading,
    setLoading,
  ] = useState(true);

  const [analyticsLoading, setAnalyticsLoading] = useState(true);

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

  const loadAnalytics = useCallback(async () => {
    try {
      setAnalyticsLoading(true);
      const response = await getDashboardAnalytics(30);
      setAnalytics(response);
    } catch (err) {
      console.error(err);
      setAnalytics(undefined);
    } finally {
      setAnalyticsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadDashboard();
    loadAnalytics();
  }, [loadDashboard, loadAnalytics]);

  return {
    dashboard,
    analytics,
    loading,
    analyticsLoading,
    error,
    reload: loadDashboard,
    reloadAnalytics: loadAnalytics,
  };
}
