import {
  Bell,
  Moon,
  Search,
} from "lucide-react";

import * as S from "./styles";

import { useCurrentAdmin } from "../../../hooks/useCurrentAdmin";

export function Header() {
  const {
    user,
    loading,
  } = useCurrentAdmin();

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

        <S.IconButton>
          <Bell size={18} />
        </S.IconButton>

        <S.IconButton>
          <Moon size={18} />
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