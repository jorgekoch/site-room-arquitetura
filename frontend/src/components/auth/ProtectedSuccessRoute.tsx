import { Navigate } from "react-router-dom";

export function ProtectedSuccessRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const hasAccess = sessionStorage.getItem("proposalSent") === "true";

  if (!hasAccess) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}