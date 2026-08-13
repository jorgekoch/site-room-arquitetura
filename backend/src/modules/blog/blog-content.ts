import sanitizeHtml from "sanitize-html";

const YOUTUBE_IFRAME_HOSTNAMES = [
  "www.youtube.com",
  "youtube.com",
  "www.youtube-nocookie.com",
  "youtube-nocookie.com",
];

const YOUTUBE_URL_HOSTNAMES = new Set([
  ...YOUTUBE_IFRAME_HOSTNAMES,
  "youtu.be",
]);

const CONTENT_ALLOWED_TAGS = Array.from(
  new Set([
    ...sanitizeHtml.defaults.allowedTags,
    "img",
    "h1",
    "h2",
    "h3",
    "h4",
    "h5",
    "h6",
    "iframe",
    "figure",
    "figcaption",
    "span",
    "table",
    "thead",
    "tbody",
    "tr",
    "th",
    "td",
  ]),
);

function countTagOccurrences(content: string, tagName: string) {
  const matches = content.match(new RegExp(`<${tagName}\\b`, "gi"));
  return matches?.length ?? 0;
}

function extractVisibleText(content: string) {
  return sanitizeHtml(content, {
    allowedTags: [],
    allowedAttributes: {},
  })
    .replace(/\s+/g, " ")
    .trim();
}

function hasAllowedProtocol(protocol: string) {
  return protocol === "https:" || protocol === "http:";
}

function hasYoutubeVideoId(pathname: string) {
  return /\/([A-Za-z0-9_-]{11})(?:$|[/?#])/i.test(pathname);
}

export function isAllowedYoutubeIframeSrc(value: string) {
  try {
    const parsed = new URL(value);
    const host = parsed.hostname.toLowerCase();

    return (
      parsed.protocol === "https:" &&
      YOUTUBE_IFRAME_HOSTNAMES.includes(host) &&
      /^\/embed\/[A-Za-z0-9_-]{11}(?:$|[/?#])/i.test(parsed.pathname)
    );
  } catch {
    return false;
  }
}

export function normalizeOptionalYoutubeUrl(value: string | null | undefined) {
  if (value === undefined) {
    return undefined;
  }

  if (value === null) {
    return null;
  }

  const trimmed = value.trim();

  if (!trimmed) {
    return null;
  }

  try {
    const parsed = new URL(trimmed);
    const host = parsed.hostname.toLowerCase();

    if (
      !hasAllowedProtocol(parsed.protocol) ||
      !YOUTUBE_URL_HOSTNAMES.has(host)
    ) {
      return null;
    }

    if (host === "youtu.be") {
      return hasYoutubeVideoId(parsed.pathname) ? trimmed : null;
    }

    if (/^\/watch$/i.test(parsed.pathname) && parsed.searchParams.get("v")) {
      return trimmed;
    }

    if (/^\/shorts\/[A-Za-z0-9_-]{11}(?:$|[/?#])/i.test(parsed.pathname)) {
      return trimmed;
    }

    if (/^\/embed\/[A-Za-z0-9_-]{11}(?:$|[/?#])/i.test(parsed.pathname)) {
      return trimmed;
    }
  } catch {
    return null;
  }

  return null;
}

export function sanitizeBlogContent(content: string) {
  return sanitizeHtml(content, {
    allowedTags: CONTENT_ALLOWED_TAGS,
    allowedAttributes: {
      a: ["href", "name", "target", "rel"],
      img: [
        "src",
        "srcset",
        "alt",
        "title",
        "width",
        "height",
        "loading",
        "style",
      ],
      iframe: [
        "src",
        "title",
        "width",
        "height",
        "allow",
        "allowfullscreen",
        "loading",
        "referrerpolicy",
        "frameborder",
        "style",
      ],
      "*": ["style"],
    },
    allowedSchemes: ["http", "https", "mailto", "tel"],
    allowedSchemesAppliedToAttributes: ["href", "src", "srcset"],
    allowProtocolRelative: false,
    allowedIframeHostnames: YOUTUBE_IFRAME_HOSTNAMES,
    allowedStyles: {
      "*": {
        "text-align": [/^(left|right|center|justify)$/],
      },
      img: {
        width: [/^\d+(?:\.\d+)?(?:px|%)$/],
        "max-width": [/^100%$/],
        height: [/^(?:auto|\d+(?:\.\d+)?(?:px|%))$/],
        float: [/^(left|right|none)$/],
        display: [/^(block|inline-block)$/],
        "margin-left": [/^(?:auto|0|\d+(?:\.\d+)?px)$/],
        "margin-right": [/^(?:auto|0|\d+(?:\.\d+)?px)$/],
      },
      iframe: {
        width: [/^\d+(?:\.\d+)?(?:px|%)$/],
        "max-width": [/^100%$/],
        height: [/^\d+(?:\.\d+)?px$/],
      },
    },
    exclusiveFilter(frame) {
      if (frame.tag !== "iframe") {
        return false;
      }

      return !isAllowedYoutubeIframeSrc(frame.attribs.src || "");
    },
    transformTags: {
      a: (tagName, attribs) => ({
        tagName,
        attribs: {
          ...attribs,
          rel: "noopener noreferrer",
        },
      }),
      iframe: (tagName, attribs) => ({
        tagName,
        attribs: {
          src: attribs.src || "",
          title: attribs.title || "Vídeo do YouTube",
          width: attribs.width,
          height: attribs.height,
          style: attribs.style,
          loading: "lazy",
          referrerpolicy: "strict-origin-when-cross-origin",
          allow:
            "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share",
          allowfullscreen: "true",
          frameborder: "0",
        },
      }),
    },
  }).trim();
}

export function getBlogReadingTime(content: string) {
  const visibleText = extractVisibleText(content);
  const words = visibleText
    ? visibleText.split(/\s+/).filter(Boolean).length
    : 0;

  return Math.max(2, Math.ceil(words / 180));
}

export function validateBlogContent(content: string) {
  const trimmedContent = content.trim();

  if (!trimmedContent) {
    return "Adicione conteúdo à publicação antes de salvar.";
  }

  const sanitizedContent = sanitizeBlogContent(trimmedContent);
  const originalIframeCount = countTagOccurrences(trimmedContent, "iframe");
  const sanitizedIframeCount = countTagOccurrences(sanitizedContent, "iframe");

  if (originalIframeCount > sanitizedIframeCount) {
    return "Os embeds do conteúdo aceitam apenas vídeos do YouTube.";
  }

  const visibleText = extractVisibleText(sanitizedContent);

  const hasMedia = /<(img|iframe)\b/i.test(sanitizedContent);

  if (!visibleText && !hasMedia) {
    return "Adicione conteúdo à publicação antes de salvar.";
  }

  if (visibleText.length < 20 && !hasMedia) {
    return "O conteúdo deve ter pelo menos 20 caracteres ou uma mídia válida.";
  }

  return null;
}
