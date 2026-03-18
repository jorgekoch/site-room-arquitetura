export const theme = {
  colors: {
    background: "#0B0B10",
    backgroundSoft: "#12121A",
    surface: "#171722",
    surfaceHover: "#1F1F2B",
    border: "#2B2B3A",
    text: "#F5F7FA",
    textSoft: "#A9AFC0",
    textMuted: "#7F8599",
    primary: "#8B5CF6",
    primaryHover: "#9F75FF",
    primaryContrast: "#0B0B10",
    danger: "#FF6B6B",
    success: "#4ADE80",
  },

  fonts: {
    heading: "'Inter', system-ui, sans-serif",
    body: "'Inter', system-ui, sans-serif",
  },

  fontSizes: {
    xs: "0.75rem",
    sm: "0.875rem",
    md: "1rem",
    lg: "1.125rem",
    xl: "1.5rem",
    xxl: "2.25rem",
    hero: "clamp(2.4rem, 5vw, 4.8rem)",
  },

  spacing: {
    xs: "0.5rem",
    sm: "0.75rem",
    md: "1rem",
    lg: "1.5rem",
    xl: "2rem",
    xxl: "3rem",
    section: "5rem",
  },

  radius: {
    sm: "10px",
    md: "16px",
    lg: "24px",
    pill: "999px",
  },

  shadow: {
    sm: "0 6px 20px rgba(0, 0, 0, 0.18)",
    md: "0 12px 32px rgba(0, 0, 0, 0.28)",
    glow: "0 0 0 1px rgba(139, 92, 246, 0.18), 0 10px 30px rgba(139, 92, 246, 0.12)",
  },

  layout: {
    sidebarWidth: "290px",
    contentMaxWidth: "1240px",
    mobileTopbarHeight: "72px",
  },

  transitions: {
    default: "0.25s ease",
  },
};

export type AppTheme = typeof theme;