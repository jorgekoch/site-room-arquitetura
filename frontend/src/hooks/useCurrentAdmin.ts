import {
  useCallback,
  useEffect,
  useState,
} from "react";

import {
  AdminUser,
  getCurrentAdmin,
} from "../lib/auth";

export function useCurrentAdmin() {
  const [user, setUser] =
    useState<AdminUser | null>(null);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  const loadUser =
    useCallback(async () => {
      try {
        setLoading(true);

        const response =
          await getCurrentAdmin();

        setUser(response.user);
        setError("");
      } catch (error) {
        console.error(error);

        setUser(null);

        setError(
          "Não foi possível carregar o usuário."
        );
      } finally {
        setLoading(false);
      }
    }, []);

  useEffect(() => {
    loadUser();
  }, [loadUser]);

  return {
    user,
    loading,
    error,
    reload: loadUser,
  };
}