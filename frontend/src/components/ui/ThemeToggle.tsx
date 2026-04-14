import styled from "styled-components";
import { useThemeMode } from "../../contexts/ThemeModeContext";
import { Button } from "./Button";

const ToggleButton = styled(Button)`
  gap: 0.5rem;
`;

type ThemeToggleProps = {
  compact?: boolean;
};

export function ThemeToggle({ compact = false }: ThemeToggleProps) {
  const { mode, toggleTheme } = useThemeMode();

  return (
    <ToggleButton
      type="button"
      onClick={toggleTheme}
      aria-label="Alternar tema"
      title={mode === "dark" ? "Ativar tema claro" : "Ativar tema escuro"}
      variant="ghostLight"
    >
      {mode === "dark" ? "☀️" : "🌙"}
      {!compact && <span>{mode === "dark" ? "Claro" : "Escuro"}</span>}
    </ToggleButton>
  );
}