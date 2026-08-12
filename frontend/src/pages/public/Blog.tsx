import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

import { Container } from "../../components/ui/Container";
import { useFeaturedProjects } from "../../hooks/useFeaturedProjects";
import { getPublishedBlogPosts } from "../../lib/blog";
import { media } from "../../styles/breakpoints";

const Page = styled.div`
  padding: 2rem 0 6rem;

  @media ${media.tablet} {
    padding: 2.5rem 0 7rem;
  }
`;

const TopBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  margin-bottom: 2rem;
`;

const BackLink = styled(Link)`
  color: ${({ theme }) => theme.colors.textSoft};
  font-weight: 600;

  &:hover {
    color: ${({ theme }) => theme.colors.text};
  }
`;

const Hero = styled.div`
  display: grid;
  gap: 2rem;
  margin-bottom: 2.5rem;

  @media ${media.laptop} {
    grid-template-columns: 1.4fr 0.6fr;
    align-items: end;
  }
`;

const HeroText = styled.div`
  display: grid;
  gap: 1rem;
`;

const Eyebrow = styled.span`
  color: ${({ theme }) => theme.colors.primary};
  font-size: ${({ theme }) => theme.fontSizes.xs};
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
`;

const Title = styled.h1`
  font-size: clamp(2.3rem, 5vw, 4.4rem);
  line-height: 1.04;
  margin: 0;
`;

const Description = styled.p`
  margin: 0;
  max-width: 620px;
  font-size: 1.08rem;
  line-height: 1.8;
`;

const MetaCard = styled.div`
  padding: 1.25rem;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.lg};
  background: ${({ theme }) => theme.colors.surface};
  box-shadow: ${({ theme }) => theme.shadow.sm};
`;

const MetaTitle = styled.h2`
  margin: 0 0 1rem;
  font-size: 1rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.textMuted};
`;

const MetaList = styled.ul`
  display: grid;
  gap: 0.7rem;
  list-style: none;
  padding: 0;
  margin: 0;
`;

const MetaItem = styled.li`
  color: ${({ theme }) => theme.colors.textSoft};
  line-height: 1.6;
`;

const Layout = styled.div`
  display: grid;
  gap: 2rem;

  @media ${media.laptop} {
    grid-template-columns: 0.9fr 1.6fr 0.9fr;
    align-items: start;
  }
`;

const Panel = styled.aside`
  display: grid;
  gap: 1rem;
`;

const PanelTitle = styled.h3`
  margin: 0;
  font-size: 0.8rem;
  letter-spacing: 0.08em;
  color: ${({ theme }) => theme.colors.textMuted};
  text-transform: uppercase;
`;

const ProjectList = styled.div`
  display: grid;
  gap: 1rem;
`;

const ProjectCard = styled(Link)`
  display: block;
  overflow: hidden;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.lg};
  background: ${({ theme }) => theme.colors.surface};
  transition: transform ${({ theme }) => theme.transitions.default};

  &:hover {
    transform: translateY(-2px);
  }
`;

const ProjectImage = styled.img`
  width: 100%;
  height: 180px;
  object-fit: cover;
  display: block;
`;

const ProjectBody = styled.div`
  padding: 1rem;
`;

const ProjectName = styled.strong`
  display: block;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 0.4rem;
`;

const ProjectMeta = styled.span`
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: 0.8rem;
`;

const Feed = styled.section`
  display: grid;
  gap: 1.5rem;
`;

const FeaturedCard = styled.article`
  overflow: hidden;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.lg};
  background: ${({ theme }) => theme.colors.surface};
`;

const FeaturedImage = styled.img`
  width: 100%;
  height: 380px;
  object-fit: cover;
  display: block;

  @media ${media.tablet} {
    height: 460px;
  }
`;

const FeaturedBody = styled.div`
  padding: 1.5rem;
  display: grid;
  gap: 0.9rem;
`;

const Tag = styled.span`
  display: inline-flex;
  align-items: center;
  width: fit-content;
  padding: 0.4rem 0.7rem;
  border-radius: ${({ theme }) => theme.radius.pill};
  border: 1px solid ${({ theme }) => theme.colors.primaryBorder};
  background: ${({ theme }) => theme.colors.primarySoft};
  color: ${({ theme }) => theme.colors.primary};
  font-size: 0.72rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
`;

const FeaturedTitle = styled.h2`
  margin: 0;
  font-size: clamp(1.7rem, 2vw, 2.5rem);
  line-height: 1.2;
`;

const FeaturedMeta = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: 0.85rem;
`;

const FeaturedExcerpt = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.textSoft};
  line-height: 1.8;
`;

const ReadMoreLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  width: fit-content;
  color: ${({ theme }) => theme.colors.primary};
  font-weight: 700;

  &:hover {
    text-decoration: underline;
  }
`;

const PostList = styled.div`
  display: grid;
  gap: 1rem;
`;

const PostCard = styled(Link)`
  display: grid;
  grid-template-columns: 120px 1fr;
  gap: 1rem;
  padding: 0.9rem;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.md};
  background: ${({ theme }) => theme.colors.surface};

  @media ${media.tablet} {
    grid-template-columns: 160px 1fr;
  }
`;

const PostThumb = styled.img`
  width: 100%;
  height: 110px;
  object-fit: cover;
  border-radius: ${({ theme }) => theme.radius.sm};
  display: block;
`;

const PostBody = styled.div`
  display: grid;
  gap: 0.45rem;
`;

const PostTitle = styled.h3`
  margin: 0;
  font-size: 1.08rem;
  line-height: 1.35;
`;

const PostExcerpt = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.textSoft};
  line-height: 1.7;
  font-size: 0.94rem;
`;

const PostMeta = styled.span`
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: 0.78rem;
`;

const EmptyState = styled.div`
  padding: 2rem;
  border: 1px dashed ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.lg};
  color: ${({ theme }) => theme.colors.textSoft};
  text-align: center;
  background: ${({ theme }) => theme.colors.surface};
`;

const FilterBar = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin: 0 0 1.5rem;
`;

const FilterButton = styled.button<{ $active?: boolean }>`
  border: 1px solid
    ${({ theme, $active }) =>
      $active ? theme.colors.primary : theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.pill};
  background: ${({ theme, $active }) =>
    $active ? theme.colors.primarySoft : "transparent"};
  color: ${({ theme, $active }) =>
    $active ? theme.colors.primary : theme.colors.textSoft};
  padding: 0.55rem 0.9rem;
  font-weight: 700;
  cursor: pointer;
`;

export default function Blog() {
  const { projects } = useFeaturedProjects();

  const [posts, setPosts] = useState<
    Awaited<ReturnType<typeof getPublishedBlogPosts>>
  >([]);
  const [selectedCategory, setSelectedCategory] = useState("all");

  useEffect(() => {
    let active = true;

    const fetchPosts = async () => {
      const publishedPosts = await getPublishedBlogPosts();
      if (active) {
        setPosts(publishedPosts);
      }
    };

    void fetchPosts();

    return () => {
      active = false;
    };
  }, []);

  const categories = useMemo(
    () => [
      "all",
      ...Array.from(new Set(posts.map((post) => post.category))).sort(),
    ],
    [posts],
  );

  const filteredPosts = useMemo(
    () =>
      selectedCategory === "all"
        ? posts
        : posts.filter((post) => post.category === selectedCategory),
    [posts, selectedCategory],
  );

  const featuredPost = filteredPosts[0];
  const otherPosts = filteredPosts.slice(1);
  const highlightProjects = projects.slice(0, 3);

  if (!featuredPost) {
    return (
      <Page>
        <Container>
          <TopBar>
            <BackLink to="/">← Voltar ao início</BackLink>
          </TopBar>

          <FilterBar>
            {categories.map((category) => (
              <FilterButton
                key={category}
                type="button"
                $active={selectedCategory === category}
                onClick={() => setSelectedCategory(category)}
              >
                {category === "all" ? "Todas" : category}
              </FilterButton>
            ))}
          </FilterBar>

          <EmptyState>
            Ainda não há publicações nessa categoria no blog.
          </EmptyState>
        </Container>
      </Page>
    );
  }

  return (
    <Page>
      <Container>
        <TopBar>
          <BackLink to="/">← Voltar ao início</BackLink>
        </TopBar>

        <FilterBar>
          {categories.map((category) => (
            <FilterButton
              key={category}
              type="button"
              $active={selectedCategory === category}
              onClick={() => setSelectedCategory(category)}
            >
              {category === "all" ? "Todas" : category}
            </FilterButton>
          ))}
        </FilterBar>

        <Hero>
          <HeroText>
            <Eyebrow>ROOM Journal</Eyebrow>
            <Title>Notícias, ideias e projetos em movimento.</Title>
            <Description>
              Conteúdo pensado para mostrar a visão da ROOM em arquitetura,
              paisagem, materialidade e cotidiano.
            </Description>
          </HeroText>

          <MetaCard>
            <MetaTitle>Sobre o blog</MetaTitle>
            <MetaList>
              <MetaItem>Atualizações do escritório</MetaItem>
              <MetaItem>Projetos em destaque</MetaItem>
              <MetaItem>Reflexões sobre arquitetura sustentável</MetaItem>
            </MetaList>
          </MetaCard>
        </Hero>

        <FilterBar>
          {categories.map((category) => (
            <FilterButton
              key={category}
              type="button"
              $active={selectedCategory === category}
              onClick={() => setSelectedCategory(category)}
            >
              {category === "all" ? "Tudo" : category}
            </FilterButton>
          ))}
        </FilterBar>

        <Layout>
          <Panel>
            <PanelTitle>Projetos em destaque</PanelTitle>
            <ProjectList>
              {highlightProjects.length > 0 ? (
                highlightProjects.map((project) => (
                  <ProjectCard
                    key={project.id}
                    to={`/projetos/${project.slug}`}
                  >
                    <ProjectImage
                      src={
                        project.featuredImage ||
                        "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=900&q=80"
                      }
                      alt={project.title}
                    />
                    <ProjectBody>
                      <ProjectName>{project.title}</ProjectName>
                      <ProjectMeta>
                        {project.city}
                        {project.city && project.state ? " / " : ""}
                        {project.state}
                      </ProjectMeta>
                    </ProjectBody>
                  </ProjectCard>
                ))
              ) : (
                <EmptyState>Projetos em destaque em breve.</EmptyState>
              )}
            </ProjectList>
          </Panel>

          <Feed>
            <FeaturedCard>
              <FeaturedImage
                src={
                  featuredPost.coverImage ||
                  "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80"
                }
                alt={featuredPost.title}
              />
              <FeaturedBody>
                <Tag>{featuredPost.category}</Tag>
                <FeaturedTitle>{featuredPost.title}</FeaturedTitle>
                <FeaturedMeta>
                  <span>{featuredPost.author}</span>
                  <span>•</span>
                  <span>
                    {new Intl.DateTimeFormat("pt-BR", {
                      day: "2-digit",
                      month: "long",
                      year: "numeric",
                    }).format(new Date(featuredPost.publishedAt))}
                  </span>
                  <span>•</span>
                  <span>{featuredPost.readingTime} min de leitura</span>
                </FeaturedMeta>
                <FeaturedExcerpt>{featuredPost.excerpt}</FeaturedExcerpt>
                <ReadMoreLink to={`/blog/${featuredPost.slug}`}>
                  Ler publicação →
                </ReadMoreLink>
              </FeaturedBody>
            </FeaturedCard>

            <PostList>
              {otherPosts.map((post) => (
                <PostCard key={post.id} to={`/blog/${post.slug}`}>
                  <PostThumb
                    src={
                      post.coverImage ||
                      "https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=900&q=80"
                    }
                    alt={post.title}
                  />
                  <PostBody>
                    <Tag>{post.category}</Tag>
                    <PostTitle>{post.title}</PostTitle>
                    <PostMeta>
                      {new Intl.DateTimeFormat("pt-BR", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      }).format(new Date(post.publishedAt))}
                    </PostMeta>
                    <PostExcerpt>{post.excerpt}</PostExcerpt>
                  </PostBody>
                </PostCard>
              ))}
            </PostList>
          </Feed>

          <Panel>
            <PanelTitle>Últimas publicações</PanelTitle>
            <ProjectList>
              {filteredPosts.slice(0, 4).map((post) => (
                <ProjectCard key={post.id} to={`/blog/${post.slug}`}>
                  <ProjectImage
                    src={
                      post.coverImage ||
                      "https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=900&q=80"
                    }
                    alt={post.title}
                  />
                  <ProjectBody>
                    <ProjectName>{post.title}</ProjectName>
                    <ProjectMeta>
                      {new Intl.DateTimeFormat("pt-BR", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      }).format(new Date(post.publishedAt))}
                    </ProjectMeta>
                  </ProjectBody>
                </ProjectCard>
              ))}
            </ProjectList>
          </Panel>
        </Layout>
      </Container>
    </Page>
  );
}
