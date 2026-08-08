import { useState } from "react";

import { PageHeader } from "../../components/admin/PageHeader";
import { Loading } from "../../components/admin/common/Loading";
import { EmptyState } from "../../components/admin/common/EmptyState";

import { ProjectForm } from "../../components/admin/projects/ProjectForm";
import { ProjectTable } from "../../components/admin/projects/ProjectTable";

import { useProjects } from "../../hooks/useProjects";

import { Project } from "../../types/project";
import { ProjectFormData } from "../../types/project-form";

export default function AdminProjetos() {
  const {
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
  } = useProjects();

  const [
    editingProject,
    setEditingProject,
  ] = useState<Project | undefined>();

  const [
    loadingProject,
    setLoadingProject,
  ] = useState(false);

  async function handleEdit(
    project: Project
  ) {
    try {
      setLoadingProject(true);

      const completeProject =
        await getById(project.id);

      setEditingProject(
        completeProject
      );
    } catch (error) {
      console.error(error);

      window.alert(
        "Não foi possível carregar o projeto."
      );
    } finally {
      setLoadingProject(false);
    }
  }

  async function handleSubmit(
    data: ProjectFormData
  ) {
    if (editingProject) {
      await update(
        editingProject.id,
        data
      );

      setEditingProject(
        undefined
      );

      return;
    }

    await create(data);
  }

  async function handleDelete(
    id: string
  ) {
    const confirmed =
      window.confirm(
        "Deseja realmente excluir este projeto?"
      );

    if (!confirmed) {
      return;
    }

    await remove(id);

    if (
      editingProject &&
      editingProject.id === id
    ) {
      setEditingProject(
        undefined
      );
    }
  }

  if (loading) {
    return <Loading />;
  }

  if (error) {
  return (
    <EmptyState
      title="Não foi possível carregar os projetos"
      description={error}
    />
  );
}

  return (
    <>
      <PageHeader
        title={
          editingProject
            ? "Editar Projeto"
            : "Novo Projeto"
        }
        description="Cadastre e gerencie os projetos."
      />

      {loadingProject ? (
        <Loading />
      ) : (
        <ProjectForm
          project={
            editingProject
          }
          onSubmit={
            handleSubmit
          }
          loading={loading}
        />
      )}

      <ProjectTable
        projects={projects}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onPublish={publish}
        onUnpublish={unpublish}
        onFeature={feature}
        onUnfeature={unfeature}
      />
    </>
  );
}