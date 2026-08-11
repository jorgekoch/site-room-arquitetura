import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

import { type AdminUser, getCurrentAdmin, isAuthenticated } from "../lib/auth";

type AdminContextData = {
  user: AdminUser | null;
  loading: boolean;
  error: string;
  reload: () => Promise<void>;
  setUser: React.Dispatch<React.SetStateAction<AdminUser | null>>;
};

const AdminContext = createContext<AdminContextData | undefined>(undefined);

export function AdminProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AdminUser | null>(null);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  const loadUser = useCallback(async () => {
    /**
     * Não existe sessão administrativa.
     *
     * O AdminProvider é global e também é
     * montado nas páginas públicas. Portanto,
     * não devemos chamar /admin-auth/me para
     * visitantes sem token.
     */
    if (!isAuthenticated()) {
      setUser(null);
      setError("");
      setLoading(false);
      return;
    }

    try {
      setLoading(true);

      const response = await getCurrentAdmin();

      setUser(response.user);
      setError("");
    } catch (error) {
      console.error(error);

      setUser(null);

      setError("Não foi possível carregar o usuário.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadUser();
  }, [loadUser]);

  const value = {
    user,
    loading,
    error,
    reload: loadUser,
    setUser,
  };

  return (
    <AdminContext.Provider value={value}>{children}</AdminContext.Provider>
  );
}

export function useAdmin() {
  const context = useContext(AdminContext);

  if (!context) {
    throw new Error("useAdmin must be used within AdminProvider");
  }

  return context;
}
