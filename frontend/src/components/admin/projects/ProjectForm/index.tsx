import { ChangeEvent, useEffect } from "react";
import { useForm } from "react-hook-form";

import { Project } from "../../../../types/project";
import { ProjectImage } from "../../../../types/project";
import { ProjectFormData } from "../../../../types/project-form";

import { useProjectUpload } from "../../../../hooks/useProjectUpload";

import { ProjectInfo } from "./ProjectInfo";
import { ProjectCover } from "./ProjectCover";
import { ProjectGallery } from "./ProjectGallery";
import { ProjectSettings } from "./ProjectSettings";

import * as S from "./styles";

interface Props {
  project?: Project;

  onSubmit(
    data: ProjectFormData
  ): Promise<void> | void;

  loading?: boolean;
}

export function ProjectForm({
  project,
  onSubmit,
  loading = false,
}: Props) {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
  } = useForm<ProjectFormData>({
    defaultValues: {
      title: "",
      slug: "",
      category: "RESIDENTIAL",
      city: "",
      state: "",
      year: undefined,
      area: "",
      description: "",
      content: "",
      featuredImage: null,
      published: true,
      featured: false,
      images: [],
    },
  });

  const {
    upload,
    uploading,
  } = useProjectUpload();

  const title = watch("title");

  const featuredImage =
    watch("featuredImage");

  const images =
    watch("images") ?? [];

  /**
   * Gera slug automaticamente
   */
  useEffect(() => {
    if (project) return;

    const slug = (title ?? "")
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");

    setValue("slug", slug);
  }, [title, project, setValue]);

  /**
   * Preenche formulário para edição
   */
  useEffect(() => {
    if (!project) {
      reset();

      return;
    }

    reset({
      title: project.title,
      slug: project.slug,
      category: project.category,
      city: project.city ?? "",
      state: project.state ?? "",
      year: project.year ?? undefined,
      area: project.area ?? "",
      description: project.description,
      content: project.content ?? "",
      featuredImage:
        project.featuredImage ?? null,
      published: project.published,
      featured: project.featured,
      images: project.images,
    });
  }, [project, reset]);

  async function handleCoverUpload(
    event: ChangeEvent<HTMLInputElement>
  ) {
    const file =
      event.target.files?.[0];

    if (!file) return;

    try {
      const result =
        await upload(file);

      setValue(
        "featuredImage",
        result.fileUrl
      );
    } catch (error) {
      console.error(error);
    }
  }

  async function handleGalleryUpload(
    event: ChangeEvent<HTMLInputElement>
  ) {
    const files =
      event.target.files;

    if (!files?.length) return;

    const uploaded: ProjectImage[] =
      [];

    for (const file of Array.from(
      files
    )) {
      try {
        const result =
          await upload(file);

        uploaded.push({
          imageUrl:
            result.fileUrl,

          storageKey:
            result.storageKey,

          alt: file.name,

          sortOrder:
            images.length +
            uploaded.length,
        });
      } catch (error) {
        console.error(error);
      }
    }

    setValue("images", [
      ...images,
      ...uploaded,
    ]);
  }

  function removeImage(
    index: number
  ) {
    setValue(
      "images",
      images.filter(
        (_, i) => i !== index
      )
    );
  }

  return (
    <S.Form
      onSubmit={handleSubmit(onSubmit)}
    >
      <ProjectInfo
        register={register}
      />

      <ProjectCover
        featuredImage={
          featuredImage
        }
        uploading={
          uploading
        }
        onUpload={
          handleCoverUpload
        }
      />

      <ProjectGallery
        images={images}
        uploading={
          uploading
        }
        onUpload={
          handleGalleryUpload
        }
        onRemove={
          removeImage
        }
      />

      <ProjectSettings
        register={register}
      />

      <S.Actions>
        <button
          type="submit"
          disabled={
            loading ||
            uploading
          }
        >
          {loading
            ? "Salvando..."
            : uploading
            ? "Enviando imagens..."
            : project
            ? "Atualizar Projeto"
            : "Salvar Projeto"}
        </button>
      </S.Actions>
    </S.Form>
  );
}