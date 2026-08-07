import {
  ChevronDown,
  LogOut,
  Settings,
  User,
} from "lucide-react";

import * as S from "./styles";

export function UserMenu() {
  function handleLogout() {
    localStorage.removeItem("room.token");

    window.location.href = "/admin/login";
  }

  return (
    <S.Container>

      <S.Trigger>

        <S.Avatar>
          JK
        </S.Avatar>

        <S.Info>

          <strong>
            Jorge Koch
          </strong>

          <span>
            OWNER
          </span>

        </S.Info>

        <ChevronDown size={18} />

      </S.Trigger>

      <S.Dropdown>

        <S.Item>

          <User size={16} />

          Meu Perfil

        </S.Item>

        <S.Item>

          <Settings size={16} />

          Configurações

        </S.Item>

        <S.Divider />

        <S.Item
          onClick={handleLogout}
        >

          <LogOut size={16} />

          Sair

        </S.Item>

      </S.Dropdown>

    </S.Container>
  );
}