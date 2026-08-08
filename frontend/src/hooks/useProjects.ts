import {
  useCallback,
  useEffect,
  useState,
} from "react";

import {
  createProject,
  deleteProject,
  featureProject,
  getProject,
  getProjects,
  publishProject,
  unfeatureProject,
  unpublishProject,
  updateProject,
} from "../lib/projects";

import { Project } from "../types/project";
import {
  ProjectFormData,
  UpdateProjectFormData,
} from "../types/project-form";

export function useProjects() {
  const [projects, setProjects] =
    useState<Project[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  const loadProjects = useCallback(
    async () => {
      try {
        setLoading(true);

        const data =
          await getProjects();

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
    },
    []
  );

  useEffect(() => {
    loadProjects();
  }, [loadProjects]);

  async function getById(id: string) {
    return getProject(id);
  }

  async function create(
    data: ProjectFormData
  ) {
    await createProject(data);

    await loadProjects();
  }

  async function update(
    id: string,
    data: UpdateProjectFormData
  ) {
    await updateProject(
      id,
      data
    );

    await loadProjects();
  }

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

    create,
    update,
    remove,

    publish,
    unpublish,

    feature,
    unfeature,

    getById,

    reload: loadProjects,
  };
}