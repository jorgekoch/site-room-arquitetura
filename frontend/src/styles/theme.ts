export const theme = {
  colors: {
  background: "#121815",
  backgroundSoft: "#18201C",
  surface: "#1F2823",
  surfaceSoft: "#26322B",
  surfaceHover: "#2E3C34",
  border: "#3A4A40",

  text: "#F7F5F0",
  textSoft: "#D6D0C5",
  textMuted: "#AFA89B",

  primary: "#4FB286",
  primaryHover: "#68C79B",
  primaryContrast: "#0F1412",

  secondary: "#b3460d",
  secondaryHover: "#D88463",
  secondaryContrast: "#FFF8F2",

  danger: "#FF7A7A",
  success: "#6ED3A3",
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
    hero: "clamp(2.2rem, 4vw, 3.8rem)",
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
    sm: "0 6px 20px rgba(0, 0, 0, 0.15)",
    md: "0 12px 28px rgba(0, 0, 0, 0.22)",
    glow: "0 10px 28px rgba(79, 178, 134, 0.35)",
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