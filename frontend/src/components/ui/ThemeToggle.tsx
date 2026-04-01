import styled from "styled-components";
import { useThemeMode } from "../../contexts/ThemeModeContext";

const ToggleButton = styled.button<{ $compact?: boolean }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  min-width: ${({ $compact }) => ($compact ? "40px" : "48px")};
  height: ${({ $compact }) => ($compact ? "40px" : "44px")};
  padding: ${({ $compact }) => ($compact ? "0 0.75rem" : "0 1rem")};
  border-radius: ${({ theme }) => theme.radius.pill};
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.text};
  cursor: pointer;
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: 600;
  transition:
    background ${({ theme }) => theme.transitions.default},
    border-color ${({ theme }) => theme.transitions.default},
    transform ${({ theme }) => theme.transitions.default};

  &:hover {
    background: ${({ theme }) => theme.colors.surfaceHover};
    transform: translateY(-1px);
  }
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
      $compact={compact}
    >
      {mode === "dark" ? "☀️" : "🌙"}
      {!compact && <span>{mode === "dark" ? "Claro" : "Escuro"}</span>}
    </ToggleButton>
  );
}