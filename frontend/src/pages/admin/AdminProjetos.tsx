import { useState } from "react";

import { PageHeader } from "../../components/admin/PageHeader";
import { Loading } from "../../components/admin/common/Loading";
import { EmptyState } from "../../components/admin/common/EmptyState";
import { ErrorModal } from "../../components/admin/common/ErrorModal";

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
  } = useProjects();

  const [
    editingProject,
    setEditingProject,
  ] = useState<
    Project | undefined
  >();

  const [
    fieldErrors,
    setFieldErrors,
  ] = useState<
    Record<string, string>
  >({});

  const [
    actionError,
    setActionError,
  ] = useState("");

  function handleEdit(
    project: Project
  ) {
    setEditingProject(project);
  }

  async function handleSubmit(
    data: ProjectFormData
  ) {
    try {
      setFieldErrors({});
      setActionError("");

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
    } catch (error) {
      console.error(error);

      const apiError =
        error as {
          issues?: {
            fieldErrors?: Record<
              string,
              string[]
            >;
          };
        };

      const errors =
        apiError.issues
          ?.fieldErrors;

      if (errors) {
        const normalizedErrors =
          Object.fromEntries(
            Object.entries(
              errors
            ).map(
              ([
                field,
                messages,
              ]) => [
                field,
                messages?.[0] ||
                  "Campo inválido.",
              ]
            )
          );

        setFieldErrors(
          normalizedErrors
        );

        return;
      }

      setActionError(
        error instanceof Error
          ? error.message
          : "Não foi possível salvar o projeto."
      );
    }
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

    try {
      setActionError("");

      await remove(id);

      if (
        editingProject &&
        editingProject.id === id
      ) {
        setEditingProject(
          undefined
        );
      }
    } catch (error) {
      console.error(error);

      setActionError(
        error instanceof Error
          ? error.message
          : "Não foi possível excluir o projeto."
      );
    }
  }

  async function handlePublish(
    id: string
  ) {
    try {
      setActionError("");

      await publish(id);
    } catch (error) {
      console.error(error);

      setActionError(
        error instanceof Error
          ? error.message
          : "Não foi possível publicar o projeto."
      );
    }
  }

  async function handleUnpublish(
    id: string
  ) {
    try {
      setActionError("");

      await unpublish(id);
    } catch (error) {
      console.error(error);

      setActionError(
        error instanceof Error
          ? error.message
          : "Não foi possível remover a publicação do projeto."
      );
    }
  }

  async function handleFeature(
    id: string
  ) {
    try {
      setActionError("");

      await feature(id);
    } catch (error) {
      console.error(error);

      setActionError(
        error instanceof Error
          ? error.message
          : "Não foi possível destacar o projeto."
      );
    }
  }

  async function handleUnfeature(
    id: string
  ) {
    try {
      setActionError("");

      await unfeature(id);
    } catch (error) {
      console.error(error);

      setActionError(
        error instanceof Error
          ? error.message
          : "Não foi possível remover o destaque do projeto."
      );
    }
  }

  if (loading) {
    return <Loading />;
  }

  if (error) {
  return (
    <EmptyState
      title="Não foi possível carregar os projetos."
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

      <ProjectForm
        project={editingProject}
        onSubmit={handleSubmit}
        loading={loading}
        fieldErrors={fieldErrors}
      />

      <ProjectTable
        projects={projects}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onPublish={handlePublish}
        onUnpublish={
          handleUnpublish
        }
        onFeature={handleFeature}
        onUnfeature={
          handleUnfeature
        }
      />

      <ErrorModal
        open={Boolean(actionError)}
        title="Atenção"
        message={actionError}
        onClose={() =>
          setActionError("")
        }
      />
    </>
  );
}