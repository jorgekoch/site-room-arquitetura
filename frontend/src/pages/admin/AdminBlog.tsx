import { useEffect, useMemo, useRef, useState } from "react";
import styled from "styled-components";

import { PageHeader } from "../../components/admin/PageHeader";
import { BlogEditor } from "../../components/admin/blog/BlogEditor";
import {
  type BlogPostMutationPayload,
  createBlogPost,
  deleteBlogPost,
  getBlogPosts,
  normalizeBlogSlug,
  normalizeBlogStatus,
  uploadBlogImage,
  updateBlogPost,
} from "../../lib/blog";
import type { BlogPost } from "../../types/blog";
import { media } from "../../styles/breakpoints";

type Draft = {
  id?: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage: string;
  author: string;
  category: string;
  publishedAt: string;
  readingTime: number;
  status: "draft" | "published";
};

const initialDraft: Draft = {
  title: "",
  slug: "",
  excerpt: "",
  content: "",
  coverImage: "",
  author: "ROOM Arquitetura",
  category: "Arquitetura",
  publishedAt: new Date().toISOString(),
  readingTime: 4,
  status: "published",
};

const Container = styled.div`
  display: grid;
  gap: 1.5rem;
`;

const Stack = styled.div`
  display: grid;
  gap: 1.5rem;
`;

const Card = styled.section`
  padding: 1.25rem;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.lg};
  background: ${({ theme }) => theme.colors.surface};
`;

const Form = styled.form`
  display: grid;
  gap: 1rem;
`;

const SectionTitle = styled.h3`
  margin: 0 0 0.5rem;
  font-size: 0.9rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.textMuted};
`;

const Field = styled.label`
  display: grid;
  gap: 0.5rem;
  color: ${({ theme }) => theme.colors.textSoft};
  font-weight: 600;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.8rem 0.9rem;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.sm};
  background: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};
`;

const TextArea = styled.textarea`
  width: 100%;
  min-height: 120px;
  padding: 0.8rem 0.9rem;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.sm};
  background: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};
  resize: vertical;
`;

const Select = styled.select`
  width: 100%;
  padding: 0.8rem 0.9rem;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.sm};
  background: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};
`;

const TwoColumns = styled.div`
  display: grid;
  gap: 1rem;

  @media ${media.tablet} {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
`;

const PublicationPanel = styled.div`
  display: grid;
  gap: 1rem;
  padding: 1rem;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.md};
  background: ${({ theme }) => theme.colors.backgroundSoft};
`;

const PublicationGrid = styled.div`
  display: grid;
  gap: 1rem;

  @media ${media.tablet} {
    grid-template-columns: minmax(0, 1fr);
  }
`;

const Actions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
`;

const Button = styled.button<{ $secondary?: boolean }>`
  border: 1px solid
    ${({ theme, $secondary }) =>
      $secondary ? theme.colors.border : theme.colors.primary};
  border-radius: ${({ theme }) => theme.radius.pill};
  padding: 0.8rem 1.2rem;
  background: ${({ theme, $secondary }) =>
    $secondary ? "transparent" : theme.colors.primary};
  color: ${({ theme, $secondary }) =>
    $secondary ? theme.colors.text : theme.colors.primaryContrast};
  font-weight: 700;
  cursor: pointer;
  transition: transform ${({ theme }) => theme.transitions.default};

  &:hover {
    transform: translateY(-1px);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`;

const CoverUploadPanel = styled.div`
  display: grid;
  gap: 0.8rem;
  padding: 0.9rem;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.md};
  background: ${({ theme }) => theme.colors.backgroundSoft};
`;

const CoverPreview = styled.img`
  width: 100%;
  max-width: 460px;
  aspect-ratio: 16 / 9;
  object-fit: cover;
  border-radius: ${({ theme }) => theme.radius.md};
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.surface};
`;

const CoverPlaceholder = styled.div`
  display: grid;
  place-items: center;
  width: 100%;
  max-width: 460px;
  aspect-ratio: 16 / 9;
  border-radius: ${({ theme }) => theme.radius.md};
  border: 1px dashed ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: ${({ theme }) => theme.fontSizes.sm};
`;

const CoverActions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.6rem;
`;

const CoverMeta = styled.span`
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: ${({ theme }) => theme.fontSizes.sm};
`;

const ProgressTrack = styled.div`
  width: 100%;
  max-width: 460px;
  height: 8px;
  border-radius: ${({ theme }) => theme.radius.pill};
  background: ${({ theme }) => theme.colors.border};
  overflow: hidden;
`;

const ProgressFill = styled.div<{ $value: number }>`
  height: 100%;
  width: ${({ $value }) => `${$value}%`};
  background: ${({ theme }) => theme.colors.primary};
  transition: width 0.18s ease;
`;

const Message = styled.p<{ $error?: boolean }>`
  margin: 0;
  padding: 0.75rem 0.9rem;
  border-radius: ${({ theme }) => theme.radius.sm};
  background: ${({ theme, $error }) =>
    $error ? theme.colors.dangerSoft : theme.colors.successSoft};
  color: ${({ theme, $error }) =>
    $error ? theme.colors.danger : theme.colors.success};
  border: 1px solid
    ${({ theme, $error }) =>
      $error ? theme.colors.dangerBorder : theme.colors.successBorder};
`;

const List = styled.div`
  display: grid;
  gap: 0.8rem;
`;

const ListItem = styled.div`
  display: grid;
  gap: 0.7rem;
  padding: 1rem;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.md};
  background: ${({ theme }) => theme.colors.backgroundSoft};
`;

const ListTitle = styled.strong`
  color: ${({ theme }) => theme.colors.text};
  font-size: 1rem;
`;

const ListMeta = styled.span`
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: 0.78rem;
`;

const TinyActions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

const TinyButton = styled.button`
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: transparent;
  color: ${({ theme }) => theme.colors.textSoft};
  border-radius: ${({ theme }) => theme.radius.pill};
  padding: 0.45rem 0.7rem;
  cursor: pointer;
`;

const StatusBadge = styled.span<{ $published: boolean }>`
  display: inline-flex;
  align-items: center;
  padding: 0.25rem 0.6rem;
  border-radius: ${({ theme }) => theme.radius.pill};
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.04em;
  border: 1px solid
    ${({ theme, $published }) =>
      $published ? theme.colors.successBorder : theme.colors.border};
  background: ${({ theme, $published }) =>
    $published ? theme.colors.successSoft : theme.colors.backgroundSoft};
  color: ${({ theme, $published }) =>
    $published ? theme.colors.success : theme.colors.textMuted};
`;

const ViewLink = styled.a`
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: transparent;
  color: ${({ theme }) => theme.colors.textSoft};
  border-radius: ${({ theme }) => theme.radius.pill};
  padding: 0.45rem 0.7rem;
  cursor: pointer;
  font-size: inherit;
  font-family: inherit;
  text-decoration: none;
  display: inline-flex;
  align-items: center;

  &:hover {
    color: ${({ theme }) => theme.colors.text};
  }
`;

const Toolbar = styled.div`
  display: grid;
  gap: 0.75rem;
  margin-bottom: 1rem;

  @media ${media.tablet} {
    grid-template-columns: minmax(0, 1.3fr) repeat(2, minmax(140px, 1fr));
  }
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 0.8rem 0.9rem;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.sm};
  background: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};
`;

export default function AdminBlog() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [draft, setDraft] = useState<Draft>(initialDraft);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [slugManuallyEdited, setSlugManuallyEdited] = useState(false);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<
    "all" | "published" | "draft"
  >("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [uploadingCover, setUploadingCover] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<number | null>(null);
  const [coverPreviewFailed, setCoverPreviewFailed] = useState(false);
  const [lastCoverFileName, setLastCoverFileName] = useState("");
  const coverInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const nextPosts = await getBlogPosts();
        setPosts(nextPosts);
      } catch {
        setErrorMessage("Não foi possível carregar as publicações.");
      }
    };

    void fetchPosts();
  }, []);

  function isValidUrl(value: string) {
    if (!value.trim()) {
      return true;
    }

    try {
      const parsed = new URL(value.trim());
      return ["http:", "https:"].includes(parsed.protocol);
    } catch {
      return false;
    }
  }

  const sortedPosts = useMemo(
    () =>
      [...posts].sort(
        (a, b) =>
          new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
      ),
    [posts],
  );

  const categoryOptions = useMemo(
    () => Array.from(new Set(posts.map((post) => post.category))).sort(),
    [posts],
  );

  const filteredPosts = useMemo(() => {
    const lowerSearch = search.trim().toLowerCase();

    return sortedPosts.filter((post) => {
      const matchesSearch =
        !lowerSearch ||
        [post.title, post.author, post.category, post.excerpt]
          .join(" ")
          .toLowerCase()
          .includes(lowerSearch);

      const matchesStatus =
        statusFilter === "all" || post.status === statusFilter;

      const matchesCategory =
        categoryFilter === "all" || post.category === categoryFilter;

      return matchesSearch && matchesStatus && matchesCategory;
    });
  }, [categoryFilter, search, sortedPosts, statusFilter]);

  function resetForm() {
    setDraft(initialDraft);
    setEditingId(null);
    setSlugManuallyEdited(false);
    setLastCoverFileName("");
    setCoverPreviewFailed(false);
    setUploadProgress(null);
  }

  function handleChange(field: keyof Draft, value: string | number) {
    setDraft((current) => {
      const nextDraft = { ...current, [field]: value };

      if (field === "title" && !slugManuallyEdited) {
        nextDraft.slug = normalizeBlogSlug(String(value));
      }

      return nextDraft;
    });

    if (field === "slug") {
      setSlugManuallyEdited(String(value).trim().length > 0);
    }
  }

  function handleEdit(post: BlogPost) {
    setEditingId(post.id);
    setSlugManuallyEdited(true);
    setDraft({
      id: post.id,
      title: post.title,
      slug: post.slug,
      excerpt: post.excerpt,
      content: post.content,
      coverImage: post.coverImage || "",
      author: post.author,
      category: post.category,
      publishedAt: post.publishedAt,
      readingTime: post.readingTime,
      status: normalizeBlogStatus(post.status),
    });
    setMessage("");
    setErrorMessage("");
    setLastCoverFileName("");
    setCoverPreviewFailed(false);
    setUploadProgress(null);
  }

  function handleOpenCoverPicker() {
    coverInputRef.current?.click();
  }

  async function handleCoverFileUpload(
    event: React.ChangeEvent<HTMLInputElement>,
  ) {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    setUploadingCover(true);
    setUploadProgress(0);
    setCoverPreviewFailed(false);
    setErrorMessage("");

    try {
      const nextCoverImage = await uploadBlogImage(file, {
        onProgress: (progressPercent) => setUploadProgress(progressPercent),
      });

      handleChange("coverImage", nextCoverImage);
      setLastCoverFileName(file.name);
      setMessage("Imagem de capa enviada com sucesso.");
    } catch (error) {
      setMessage("");
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Não foi possível enviar a imagem de capa.",
      );
    } finally {
      setUploadingCover(false);
      setUploadProgress(null);
      event.target.value = "";
    }
  }

  function handleRemoveCoverImage() {
    handleChange("coverImage", "");
    setLastCoverFileName("");
    setCoverPreviewFailed(false);
    setUploadProgress(null);
    setMessage("Imagem de capa removida do formulário.");
    setErrorMessage("");
  }

  async function handleDelete(id: string) {
    const confirmed = window.confirm(
      "Tem certeza que deseja excluir esta publicação? Esta ação não pode ser desfeita.",
    );

    if (!confirmed) {
      return;
    }

    try {
      await deleteBlogPost(id);
      const nextPosts = posts.filter((post) => post.id !== id);
      setPosts(nextPosts);
      if (editingId === id) {
        resetForm();
      }
      setMessage("Publicação removida.");
      setErrorMessage("");
    } catch {
      setErrorMessage("Não foi possível remover a publicação.");
      setMessage("");
    }
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!draft.title.trim() || !draft.excerpt.trim() || !draft.content.trim()) {
      setErrorMessage("Preencha título, resumo e conteúdo antes de salvar.");
      setMessage("");
      return;
    }

    try {
      const slug = normalizeBlogSlug(draft.slug.trim() || draft.title);

      if (!slug || slug.length < 3) {
        setErrorMessage("O slug precisa ter pelo menos 3 caracteres válidos.");
        setMessage("");
        return;
      }

      if (draft.coverImage.trim() && !isValidUrl(draft.coverImage)) {
        setErrorMessage("A imagem de capa precisa ser uma URL válida.");
        setMessage("");
        return;
      }

      const duplicatedSlug = posts.some(
        (post) => post.slug === slug && post.id !== editingId,
      );

      if (duplicatedSlug) {
        setErrorMessage("Já existe uma publicação com esse slug.");
        setMessage("");
        return;
      }

      const now = new Date().toISOString();
      const normalizedPublishedAt =
        draft.publishedAt &&
        !Number.isNaN(new Date(draft.publishedAt).getTime())
          ? draft.publishedAt
          : now;

      const payload: BlogPostMutationPayload = {
        title: draft.title.trim(),
        slug,
        excerpt: draft.excerpt.trim(),
        content: draft.content,
        coverImage: draft.coverImage.trim() || undefined,
        author: draft.author.trim() || "ROOM Arquitetura",
        category: draft.category.trim() || "Arquitetura",
        publishedAt: normalizedPublishedAt,
        status: normalizeBlogStatus(draft.status),
      };

      const createdOrUpdated = editingId
        ? await updateBlogPost(editingId, payload)
        : await createBlogPost(payload);

      const nextPosts = editingId
        ? posts.map((post) => (post.id === editingId ? createdOrUpdated : post))
        : [createdOrUpdated, ...posts];

      setPosts(nextPosts);
      setMessage(
        editingId
          ? "Publicação atualizada com sucesso."
          : "Publicação criada com sucesso.",
      );
      setErrorMessage("");
      resetForm();
    } catch (error) {
      const messageText =
        error instanceof Error
          ? error.message
          : "Não foi possível salvar a publicação.";
      setErrorMessage(messageText);
      setMessage("");
    }
  }

  return (
    <Container>
      <PageHeader
        title="Blog"
        description="Cadastre matérias, notícias e reflexões com texto enriquecido, imagens e vídeos do YouTube."
      />

      <Stack>
        <Card>
          <Form onSubmit={handleSubmit}>
            <TwoColumns>
              <Field>
                Título
                <Input
                  value={draft.title}
                  onChange={(event) =>
                    handleChange("title", event.target.value)
                  }
                  placeholder="Ex.: Novidades da ROOM em 2026"
                />
              </Field>

              <Field>
                Slug
                <Input
                  value={draft.slug}
                  onChange={(event) => handleChange("slug", event.target.value)}
                  placeholder="novo-slug-da-publicacao"
                />
              </Field>
            </TwoColumns>

            <Field>
              Resumo
              <TextArea
                value={draft.excerpt}
                onChange={(event) =>
                  handleChange("excerpt", event.target.value)
                }
                placeholder="Escreva uma descrição curta para a publicação"
              />
            </Field>

            <TwoColumns>
              <Field>
                Autor
                <Input
                  value={draft.author}
                  onChange={(event) =>
                    handleChange("author", event.target.value)
                  }
                />
              </Field>

              <Field>
                Categoria
                <Input
                  value={draft.category}
                  onChange={(event) =>
                    handleChange("category", event.target.value)
                  }
                />
              </Field>
            </TwoColumns>

            <Field>
              Imagem de capa
              <CoverUploadPanel>
                {draft.coverImage ? (
                  coverPreviewFailed ? (
                    <CoverPlaceholder>
                      Não foi possível carregar a imagem de preview.
                    </CoverPlaceholder>
                  ) : (
                    <CoverPreview
                      src={draft.coverImage}
                      alt="Preview da capa"
                      onError={() => setCoverPreviewFailed(true)}
                    />
                  )
                ) : (
                  <CoverPlaceholder>
                    Nenhuma imagem de capa selecionada.
                  </CoverPlaceholder>
                )}

                <CoverActions>
                  <Button
                    type="button"
                    $secondary
                    onClick={handleOpenCoverPicker}
                    disabled={uploadingCover}
                  >
                    {uploadingCover
                      ? "Enviando capa..."
                      : draft.coverImage
                        ? "Alterar capa"
                        : "Enviar capa"}
                  </Button>

                  {draft.coverImage && (
                    <Button
                      type="button"
                      $secondary
                      onClick={handleRemoveCoverImage}
                      disabled={uploadingCover}
                    >
                      Remover capa
                    </Button>
                  )}
                </CoverActions>

                <CoverMeta>
                  Formatos aceitos: JPG, PNG, WEBP e AVIF.
                  {lastCoverFileName ? ` Arquivo: ${lastCoverFileName}.` : ""}
                </CoverMeta>

                {uploadingCover && uploadProgress !== null && (
                  <>
                    <ProgressTrack aria-label="Progresso do upload da capa">
                      <ProgressFill $value={uploadProgress} />
                    </ProgressTrack>
                    <CoverMeta>Upload: {uploadProgress}%</CoverMeta>
                  </>
                )}

                <input
                  ref={coverInputRef}
                  type="file"
                  accept="image/jpeg,image/png,image/webp,image/avif"
                  hidden
                  onChange={handleCoverFileUpload}
                />
              </CoverUploadPanel>
              <Input
                value={draft.coverImage}
                onChange={(event) => {
                  setCoverPreviewFailed(false);
                  handleChange("coverImage", event.target.value);
                }}
                placeholder="URL da capa (preenchido automaticamente após upload)"
              />
            </Field>

            <Field>
              Conteúdo
              <BlogEditor
                value={draft.content}
                onChange={(value) => handleChange("content", value)}
              />
            </Field>

            <PublicationPanel>
              <SectionTitle>Publicação</SectionTitle>

              <PublicationGrid>
                <Field>
                  Status
                  <Select
                    value={draft.status}
                    onChange={(event) =>
                      handleChange(
                        "status",
                        event.target.value as "draft" | "published",
                      )
                    }
                  >
                    <option value="published">Publicado</option>
                    <option value="draft">Rascunho</option>
                  </Select>
                </Field>
              </PublicationGrid>
            </PublicationPanel>

            <Actions>
              <Button type="submit">
                {editingId ? "Salvar alterações" : "Publicar"}
              </Button>
              <Button
                type="button"
                $secondary
                onClick={() => {
                  setDraft((current) => ({ ...current, status: "draft" }));
                  setTimeout(() => {
                    document
                      .querySelector<HTMLFormElement>("form")
                      ?.requestSubmit();
                  }, 0);
                }}
              >
                Salvar como rascunho
              </Button>
              <Button type="button" $secondary onClick={resetForm}>
                Limpar
              </Button>
            </Actions>

            {message && <Message>{message}</Message>}
            {errorMessage && <Message $error>{errorMessage}</Message>}
          </Form>
        </Card>

        <Card>
          <h3 style={{ marginTop: 0 }}>Publicações</h3>

          <Toolbar>
            <SearchInput
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Buscar por título, autor ou categoria"
            />

            <Select
              value={statusFilter}
              onChange={(event) =>
                setStatusFilter(
                  event.target.value as "all" | "published" | "draft",
                )
              }
            >
              <option value="all">Todos os status</option>
              <option value="published">Publicados</option>
              <option value="draft">Rascunhos</option>
            </Select>

            <Select
              value={categoryFilter}
              onChange={(event) => setCategoryFilter(event.target.value)}
            >
              <option value="all">Todas as categorias</option>
              {categoryOptions.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </Select>
          </Toolbar>

          <List>
            {filteredPosts.length === 0 ? (
              <ListItem>
                <ListTitle>Nenhuma publicação encontrada.</ListTitle>
              </ListItem>
            ) : (
              filteredPosts.map((post) => (
                <ListItem key={post.id}>
                  <ListTitle>{post.title}</ListTitle>
                  <ListMeta>
                    {post.category} •{" "}
                    {new Intl.DateTimeFormat("pt-BR", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    }).format(new Date(post.publishedAt))}
                  </ListMeta>
                  <TinyActions>
                    <StatusBadge $published={post.status === "published"}>
                      {post.status === "published" ? "Publicado" : "Rascunho"}
                    </StatusBadge>
                    <TinyButton type="button" onClick={() => handleEdit(post)}>
                      Editar
                    </TinyButton>
                    {post.status === "published" && (
                      <ViewLink
                        href={`/blog/${post.slug}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Visualizar
                      </ViewLink>
                    )}
                    <TinyButton
                      type="button"
                      onClick={() => handleDelete(post.id)}
                    >
                      Excluir
                    </TinyButton>
                  </TinyActions>
                </ListItem>
              ))
            )}
          </List>
        </Card>
      </Stack>
    </Container>
  );
}
