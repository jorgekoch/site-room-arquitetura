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

  const hasAccess = user?.role === "OWNER" || user?.role === "DEV";

  if (!hasAccess) {
    return <Navigate to="/admin" replace />;
  }

  return <>{children}</>;
}
