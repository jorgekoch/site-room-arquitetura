import {
  useCallback,
  useEffect,
  useState,
} from "react";

import {
  getDashboardNotifications,
  DashboardNotifications,
} from "../lib/dashboard";

export function useDashboardNotifications() {
  const [
    notifications,
    setNotifications,
    ] = useState<DashboardNotifications>({
    total: 0,
    newProposals: 0,
    pendingAdminRequests: 0,
    notifications: [],
    });

  const [
    loading,
    setLoading,
  ] = useState(true);

  const [
    error,
    setError,
  ] = useState("");

  const loadNotifications =
    useCallback(async () => {
      try {
        setLoading(true);

        const data =
          await getDashboardNotifications();

        setNotifications(data);
        setError("");
      } catch (err) {
        console.error(err);

        setError(
          "Não foi possível carregar as notificações."
        );
      } finally {
        setLoading(false);
      }
    }, []);

  useEffect(() => {
    loadNotifications();
  }, [loadNotifications]);

  return {
    notifications,
    loading,
    error,
    reload: loadNotifications,
  };
}