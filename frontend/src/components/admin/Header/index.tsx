import {
  Bell,
  Moon,
  Search
} from "lucide-react";

import * as S from "./styles";

export function Header() {
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
            JK
          </S.Avatar>

          <S.UserInfo>

            <strong>
              Jorge Koch
            </strong>

            <span>
              Administrador
            </span>

          </S.UserInfo>

        </S.User>

      </S.Right>

    </S.Container>
  );
}