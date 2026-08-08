import {
  useCallback,
  useEffect,
  useState,
} from "react";

import {
  getPublishedProjects,
} from "../lib/projects";

import { Project } from "../types/project";

export function usePublicProjects() {
  const [projects, setProjects] =
    useState<Project[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  const loadProjects =
    useCallback(async () => {
      try {
        setLoading(true);

        const data =
          await getPublishedProjects();

        setProjects(data);
        setError("");
      } catch (err) {
        console.error(err);

        setError(
          "Não foi possível carregar os projetos."
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