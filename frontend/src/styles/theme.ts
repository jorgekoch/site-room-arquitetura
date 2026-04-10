export const darkTheme = {
  colors: {
    background: "#10140D",
    backgroundSoft: "#171D14",
    surface: "#1C2318",
    surfaceSoft: "#232C1F",
    surfaceHover: "#2B3624",
    border: "#48543B",

    text: "#F7F3EB",
    textSoft: "#D8D0C1",
    textMuted: "#AA9F8D",

    primary: "#344203",
    primaryHover: "#455707",
    primaryContrast: "#F7F3EB",
    primarySoft: "rgba(52, 66, 3, 0.12)",
    primaryBorder: "rgba(52, 66, 3, 0.28)",
    primaryRing: "rgba(52, 66, 3, 0.18)",

    secondary: "#B3460D",
    secondaryHover: "#C65A21",
    secondaryContrast: "#FFF7F1",
    secondarySoft: "rgba(179, 70, 13, 0.12)",
    secondaryBorder: "rgba(179, 70, 13, 0.28)",
    secondaryGlow: "rgba(179, 70, 13, 0.12)",

    danger: "#D66B6B",
    dangerSoft: "rgba(214, 107, 107, 0.08)",
    dangerBorder: "rgba(214, 107, 107, 0.35)",
    success: "#5F7820",
    successSoft: "rgba(95, 120, 32, 0.12)",
    successBorder: "rgba(95, 120, 32, 0.35)",
  },

  fonts: {
    heading: "'Poppins', system-ui, sans-serif",
    body: "'Poppins', system-ui, sans-serif",
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
    glow: "0 10px 28px rgba(52, 66, 3, 0.28)",
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

export const lightTheme = {
  ...darkTheme,
  colors: {
    background: "#F4EFE5",
    backgroundSoft: "#ECE5D8",
    surface: "#FFFCF6",
    surfaceSoft: "#F6F0E4",
    surfaceHover: "#EEE5D6",
    border: "#D7CCB7",

    text: "#1E1A14",
    textSoft: "#433B31",
    textMuted: "#746957",

    primary: "#344203",
    primaryHover: "#455707",
    primaryContrast: "#F7F3EB",
    primarySoft: "rgba(52, 66, 3, 0.1)",
    primaryBorder: "rgba(52, 66, 3, 0.22)",
    primaryRing: "rgba(52, 66, 3, 0.16)",

    secondary: "#B3460D",
    secondaryHover: "#C65A21",
    secondaryContrast: "#FFF7F1",
    secondarySoft: "rgba(179, 70, 13, 0.1)",
    secondaryBorder: "rgba(179, 70, 13, 0.22)",
    secondaryGlow: "rgba(179, 70, 13, 0.1)",

    danger: "#C85C5C",
    dangerSoft: "rgba(200, 92, 92, 0.08)",
    dangerBorder: "rgba(200, 92, 92, 0.28)",
    success: "#4F651A",
    successSoft: "rgba(79, 101, 26, 0.1)",
    successBorder: "rgba(79, 101, 26, 0.28)",
  },
};

export type AppTheme = typeof darkTheme;
