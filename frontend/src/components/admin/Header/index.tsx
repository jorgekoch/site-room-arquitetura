import {
  Bell,
  Moon,
  Sun,
  Search,
} from "lucide-react";

import * as S from "./styles";

import { useCurrentAdmin } from "../../../hooks/useCurrentAdmin";
import { useThemeMode } from "../../../contexts/ThemeModeContext";

export function Header() {
  const {
    user,
    loading,
  } = useCurrentAdmin();

  const {
    mode,
    toggleTheme,
  } = useThemeMode();

  const initials =
    user?.name
      ?.split(" ")
      .filter(Boolean)
      .slice(0, 2)
      .map(
        (name) =>
          name.charAt(0).toUpperCase()
      )
      .join("") ?? "AD";

  return (
    <S.Container>
      <S.Left>
        <S.Title>
          Painel Administrativo
        </S.Title>
      </S.Left>

      <S.Right>
        <S.Search>
          <Search size={18} />

          <input
            placeholder="Pesquisar..."
          />
        </S.Search>

        <S.IconButton
          type="button"
          aria-label="Notificações"
        >
          <Bell size={18} />
        </S.IconButton>

        <S.IconButton
          type="button"
          onClick={toggleTheme}
          aria-label={
            mode === "dark"
              ? "Ativar modo claro"
              : "Ativar modo escuro"
          }
          title={
            mode === "dark"
              ? "Ativar modo claro"
              : "Ativar modo escuro"
          }
        >
          {mode === "dark" ? (
            <Sun size={18} />
          ) : (
            <Moon size={18} />
          )}
        </S.IconButton>

        <S.User>
          <S.Avatar>
            {initials}
          </S.Avatar>

          <S.UserInfo>
            <strong>
              {loading
                ? "Carregando..."
                : user?.name ?? "Usuário"}
            </strong>

            <span>
              {user?.role === "SUPER_ADMIN"
                ? "Administrador"
                : "Equipe"}
            </span>
          </S.UserInfo>
        </S.User>
      </S.Right>
    </S.Container>
  );
}