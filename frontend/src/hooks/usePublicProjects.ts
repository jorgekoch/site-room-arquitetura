import {
  useCallback,
  useEffect,
  useState,
} from "react";

import {
  getPublishedProjects,
  getPublishedProjectBySlug,
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

export function usePublicProject(
  slug?: string
) {
  const [project, setProject] =
    useState<Project | null>(null);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  const loadProject =
    useCallback(async () => {
      if (!slug) {
        setProject(null);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);

        const data =
          await getPublishedProjectBySlug(slug);

        setProject(data);
        setError("");
      } catch (err) {
        console.error(err);

        setProject(null);

        setError(
          "Não foi possível carregar o projeto."
        );
      } finally {
        setLoading(false);
      }
    }, [slug]);

  useEffect(() => {
    loadProject();
  }, [loadProject]);

  return {
    project,
    loading,
    error,
    reload: loadProject,
  };
}