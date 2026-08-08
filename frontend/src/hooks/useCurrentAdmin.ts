import { useAdmin } from "../contexts/AdminContext";

export function useCurrentAdmin() {
  return useAdmin();
}