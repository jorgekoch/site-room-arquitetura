import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";

import { useCurrentAdmin } from "../../hooks/useCurrentAdmin";

type OwnerRouteProps = {
  children: ReactNode;
};

export function OwnerRoute({ children }: OwnerRouteProps) {
  const { user, loading } = useCurrentAdmin();

  if (loading) {
    return null;
  }

  if (user?.role !== "OWNER") {
    return <Navigate to="/admin/propostas" replace />;
  }

  return <>{children}</>;
}
