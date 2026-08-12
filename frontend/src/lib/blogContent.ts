import DOMPurify from "dompurify";

const YOUTUBE_EMBED_HOSTS = new Set([
  "www.youtube.com",
  "youtube.com",
  "www.youtube-nocookie.com",
  "youtube-nocookie.com",
]);

const BLOG_SANITIZE_OPTIONS = {
  USE_PROFILES: { html: true },
  ADD_ATTR: [
    "target",
    "rel",
    "allow",
    "allowfullscreen",
    "frameborder",
    "loading",
    "referrerpolicy",
    "title",
  ],
  ADD_TAGS: ["iframe"],
};

function parseHtml(content: string) {
  return new DOMParser().parseFromString(content, "text/html");
}

export function isAllowedYoutubeIframeSrc(value: string) {
  try {
    const parsed = new URL(value);
    const host = parsed.hostname.toLowerCase();
    const pathname = parsed.pathname.toLowerCase();

    return (
      parsed.protocol === "https:" &&
      YOUTUBE_EMBED_HOSTS.has(host) &&
      pathname.startsWith("/embed/")
    );
  } catch {
    return false;
  }
}

export function sanitizeBlogContent(content: string) {
  if (!content.trim()) {
    return "";
  }

  const sanitized = String(DOMPurify.sanitize(content, BLOG_SANITIZE_OPTIONS));
  const document = parseHtml(sanitized);

  document.querySelectorAll("iframe").forEach((iframe) => {
    const src = iframe.getAttribute("src")?.trim() || "";

    if (!isAllowedYoutubeIframeSrc(src)) {
      iframe.remove();
      return;
    }

    iframe.setAttribute("loading", "lazy");
    iframe.setAttribute("referrerpolicy", "strict-origin-when-cross-origin");
    iframe.setAttribute(
      "allow",
      "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share",
    );
    iframe.setAttribute("allowfullscreen", "true");
    iframe.removeAttribute("srcdoc");
  });

  return document.body.innerHTML.trim();
}

export function validateBlogContent(content: string) {
  const originalDocument = parseHtml(content);
  const sanitizedContent = sanitizeBlogContent(content);
  const sanitizedDocument = parseHtml(sanitizedContent);

  const originalIframeCount =
    originalDocument.querySelectorAll("iframe").length;
  const sanitizedIframeCount =
    sanitizedDocument.querySelectorAll("iframe").length;

  if (originalIframeCount > sanitizedIframeCount) {
    return "Os embeds do conteúdo aceitam apenas vídeos do YouTube.";
  }

  const visibleText =
    sanitizedDocument.body.textContent?.replace(/\s+/g, " ").trim() || "";
  const hasMedia = Boolean(sanitizedDocument.querySelector("img, iframe"));

  if (!visibleText && !hasMedia) {
    return "Adicione conteúdo à publicação antes de salvar.";
  }

  return null;
}
