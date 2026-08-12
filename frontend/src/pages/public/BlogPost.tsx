import { Link, useParams } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import { Helmet } from "react-helmet-async";

import { Container } from "../../components/ui/Container";
import {
  getBlogPostBySlug,
  getPublishedBlogPosts,
  getYoutubeEmbedUrl,
} from "../../lib/blog";
import { sanitizeBlogContent } from "../../lib/blogContent";
import { media } from "../../styles/breakpoints";

const Page = styled.div`
  padding: 2rem 0 6rem;
`;

const BackLink = styled(Link)`
  display: inline-flex;
  margin-bottom: 1.5rem;
  color: ${({ theme }) => theme.colors.textSoft};
  font-weight: 600;

  &:hover {
    color: ${({ theme }) => theme.colors.text};
  }
`;

const Article = styled.article`
  display: grid;
  gap: 1.5rem;
  max-width: 860px;
  margin: 0 auto;
`;

const Cover = styled.img`
  width: 100%;
  height: 220px;
  object-fit: cover;
  border-radius: ${({ theme }) => theme.radius.lg};
  display: block;

  @media ${media.tablet} {
    height: 360px;
  }

  @media ${media.laptop} {
    height: 480px;
  }
`;

const Meta = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: 0.85rem;
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

const Title = styled.h1`
  margin: 0;
  font-size: clamp(2.1rem, 4vw, 4rem);
  line-height: 1.1;
`;

const Body = styled.div`
  display: grid;
  gap: 1rem;
  color: ${({ theme }) => theme.colors.text};
  line-height: 1.9;

  h2,
  h3,
  h4 {
    margin: 2rem 0 0.8rem;
    color: ${({ theme }) => theme.colors.text};
  }

  p {
    margin: 0;
    color: ${({ theme }) => theme.colors.textSoft};
  }

  img {
    width: 100%;
    max-height: 540px;
    object-fit: cover;
    border-radius: ${({ theme }) => theme.radius.md};
    margin: 1rem 0;
  }

  blockquote {
    margin: 1.5rem 0;
    padding: 1rem 1.2rem;
    border-left: 3px solid ${({ theme }) => theme.colors.secondary};
    background: ${({ theme }) => theme.colors.secondarySoft};
    color: ${({ theme }) => theme.colors.text};
    border-radius: 0 ${({ theme }) => theme.radius.sm}
      ${({ theme }) => theme.radius.sm} 0;
  }

  iframe {
    width: 100%;
    aspect-ratio: 16 / 9;
    border: 0;
    border-radius: ${({ theme }) => theme.radius.md};
    margin: 1rem 0;
  }
`;

const Related = styled.section`
  margin-top: 2rem;
  display: grid;
  gap: 1rem;
`;

const RelatedList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 1rem;
`;

const RelatedCard = styled(Link)`
  display: grid;
  gap: 0.7rem;
  padding: 1rem;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.md};
  background: ${({ theme }) => theme.colors.surface};
  height: 100%;
`;

const RelatedImage = styled.img`
  width: 100%;
  height: 160px;
  object-fit: cover;
  border-radius: ${({ theme }) => theme.radius.sm};
  display: block;

  @media ${media.tablet} {
    height: 180px;
  }
`;

const RelatedTitle = styled.h3`
  margin: 0;
  line-height: 1.4;
`;

const LoadingState = styled.div`
  padding: 3rem 1rem;
  text-align: center;
  color: ${({ theme }) => theme.colors.textSoft};
`;

const NotFoundState = styled.div`
  display: grid;
  gap: 1.25rem;
  padding: 3rem 1.5rem;
  text-align: center;
  color: ${({ theme }) => theme.colors.textSoft};
`;

const NotFoundTitle = styled.h2`
  margin: 0;
  font-size: clamp(1.5rem, 3vw, 2rem);
  color: ${({ theme }) => theme.colors.text};
`;

const NotFoundLink = styled(Link)`
  display: inline-flex;
  align-self: center;
  justify-self: center;
  padding: 0.7rem 1.4rem;
  border-radius: ${({ theme }) => theme.radius.pill};
  background: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.primaryContrast};
  font-weight: 700;
  text-decoration: none;
`;

export default function BlogPost() {
  const { slug } = useParams();
  const [post, setPost] =
    useState<Awaited<ReturnType<typeof getBlogPostBySlug>>>(undefined);
  const [relatedPosts, setRelatedPosts] = useState<
    Awaited<ReturnType<typeof getPublishedBlogPosts>>
  >([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;

    const load = async () => {
      if (!slug) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const [nextPost, nextRelated] = await Promise.all([
          getBlogPostBySlug(slug),
          getPublishedBlogPosts(),
        ]);

        if (!active) return;

        setPost(nextPost);
        setRelatedPosts(
          nextRelated.filter((item) => item.slug !== slug).slice(0, 3),
        );
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    };

    void load();

    return () => {
      active = false;
    };
  }, [slug]);

  const safeHtml = useMemo(() => {
    if (!post?.content) {
      return "";
    }

    return sanitizeBlogContent(post.content);
  }, [post?.content]);

  if (loading) {
    return (
      <Page>
        <Container>
          <BackLink to="/blog">← Voltar ao blog</BackLink>
          <LoadingState>Carregando publicação...</LoadingState>
        </Container>
      </Page>
    );
  }

  if (!post) {
    return (
      <Page>
        <Container>
          <BackLink to="/blog">← Voltar ao blog</BackLink>
          <NotFoundState>
            <NotFoundTitle>Publicação não encontrada</NotFoundTitle>
            <p>
              Esta publicação pode ter sido removida ou o endereço está
              incorreto.
            </p>
            <NotFoundLink to="/blog">Ver todas as publicações</NotFoundLink>
          </NotFoundState>
        </Container>
      </Page>
    );
  }

  const youtubeEmbedUrl = getYoutubeEmbedUrl(post.youtubeUrl);
  const pageTitle = `${post.title} — ROOM Arquitetura Sustentável`;
  const pageDescription =
    post.excerpt ||
    `Leia ${post.title} no blog da ROOM Arquitetura Sustentável.`;

  return (
    <Page>
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:type" content="article" />
        {post.coverImage && (
          <meta property="og:image" content={post.coverImage} />
        )}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={pageDescription} />
        {post.coverImage && (
          <meta name="twitter:image" content={post.coverImage} />
        )}
      </Helmet>

      <Container>
        <BackLink to="/blog">← Voltar ao blog</BackLink>

        <Article>
          {post.coverImage && (
            <Cover src={post.coverImage} alt={post.title} loading="eager" />
          )}

          <Meta>
            <Tag>{post.category}</Tag>
            <span>{post.author}</span>
            <span>•</span>
            <span>
              {new Intl.DateTimeFormat("pt-BR", {
                day: "2-digit",
                month: "long",
                year: "numeric",
              }).format(new Date(post.publishedAt))}
            </span>
            <span>•</span>
            <span>{post.readingTime} min</span>
          </Meta>

          <Title>{post.title}</Title>

          <Body dangerouslySetInnerHTML={{ __html: safeHtml }} />

          {youtubeEmbedUrl && (
            <iframe
              src={youtubeEmbedUrl}
              title={post.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          )}
        </Article>

        {relatedPosts.length > 0 && (
          <Related>
            <h2>Leia também</h2>
            <RelatedList>
              {relatedPosts.map((item) => (
                <RelatedCard key={item.id} to={`/blog/${item.slug}`}>
                  <RelatedImage
                    src={
                      item.coverImage ||
                      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=900&q=80"
                    }
                    alt={item.title}
                    loading="lazy"
                  />
                  <RelatedTitle>{item.title}</RelatedTitle>
                </RelatedCard>
              ))}
            </RelatedList>
          </Related>
        )}
      </Container>
    </Page>
  );
}
