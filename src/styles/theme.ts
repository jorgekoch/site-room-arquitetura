export const theme = {
  colors: {
    background: "#111412",
    backgroundSoft: "#171B18",
    surface: "#1D221F",
    surfaceSoft: "#222823",
    surfaceHover: "#2A312B",
    border: "#313A33",

    text: "#F5F1E8",
    textSoft: "#C8C1B4",
    textMuted: "#9F988C",

    primary: "#7FA08A",
    primaryHover: "#92B19C",
    primaryContrast: "#111412",

    secondary: "#B86F52",
    secondaryHover: "#C98062",
    secondaryContrast: "#FDF8F3",

    danger: "#FF7A7A",
    success: "#73C991",
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
    glow: "0 0 0 1px rgba(127, 160, 138, 0.18), 0 10px 30px rgba(127, 160, 138, 0.12)",
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