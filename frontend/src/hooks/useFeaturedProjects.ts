import {
  useCallback,
  useEffect,
  useState,
} from "react";

import {
  getFeaturedProjects,
} from "../lib/projects";

import {
  Project,
} from "../types/project";

export function useFeaturedProjects() {
  const [
    projects,
    setProjects,
  ] = useState<Project[]>([]);

  const [
    loading,
    setLoading,
  ] = useState(true);

  const [
    error,
    setError,
  ] = useState("");

  const loadProjects =
    useCallback(async () => {
      try {
        setLoading(true);

        const data =
          await getFeaturedProjects();

        // Segurança adicional no frontend.
        // A API já deve retornar no máximo 5.
        setProjects(
          data.slice(0, 5)
        );

        setError("");
      } catch (error) {
        console.error(error);

        setError(
          "Não foi possível carregar os projetos em destaque."
        );
      } finally {
        setLoading(false);
      }
    }, []);

  useEffect(() => {
    loadProjects();
  }, [loadProjects]);

  return {
    projects,
    loading,
    error,
    reload: loadProjects,
  };
}