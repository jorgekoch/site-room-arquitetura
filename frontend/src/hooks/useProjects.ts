import { useCallback, useEffect, useState } from "react";

import {
  deleteProject,
  featureProject,
  getProjects,
  publishProject,
  unfeatureProject,
  unpublishProject,
} from "../lib/projects";

import { Project } from "../types/project";

export function useProjects() {
  const [projects, setProjects] = useState<Project[]>([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  const loadProjects = useCallback(async () => {
    try {
      setLoading(true);

      const data = await getProjects();

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

  async function remove(id: string) {
    await deleteProject(id);

    await loadProjects();
  }

  async function publish(id: string) {
    await publishProject(id);

    await loadProjects();
  }

  async function unpublish(id: string) {
    await unpublishProject(id);

    await loadProjects();
  }

  async function feature(id: string) {
    await featureProject(id);

    await loadProjects();
  }

  async function unfeature(id: string) {
    await unfeatureProject(id);

    await loadProjects();
  }

  return {
    projects,

    loading,

    error,

    reload: loadProjects,

    remove,

    publish,

    unpublish,

    feature,

    unfeature,
  };
}