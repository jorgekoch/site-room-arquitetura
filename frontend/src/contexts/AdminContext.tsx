import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

import {
  type AdminUser,
  getCurrentAdmin,
} from "../lib/auth";

type AdminContextData = {
  user: AdminUser | null;
  loading: boolean;
  error: string;
  reload: () => Promise<void>;
  setUser: React.Dispatch<
    React.SetStateAction<AdminUser | null>
  >;
};

const AdminContext =
  createContext<AdminContextData | undefined>(
    undefined
  );

export function AdminProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [user, setUser] =
    useState<AdminUser | null>(null);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  const loadUser = useCallback(
    async () => {
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
    },
    []
  );

  useEffect(() => {
    loadUser();
  }, [loadUser]);

  const value = {
    user,
    loading,
    error,
    reload: loadUser,
    setUser,
  };

  return (
    <AdminContext.Provider value={value}>
      {children}
    </AdminContext.Provider>
  );
}

export function useAdmin() {
  const context =
    useContext(AdminContext);

  if (!context) {
    throw new Error(
      "useAdmin must be used within AdminProvider"
    );
  }

  return context;
}