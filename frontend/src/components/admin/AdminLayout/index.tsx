import { Outlet } from "react-router-dom";

import { Sidebar } from "../Sidebar";
import { Header } from "../Header";

import * as S from "./styles";

export function AdminLayout() {
  return (
    <S.Container>

      <Sidebar />

      <S.Main>

        <Header />

        <S.Content>

          <Outlet />

        </S.Content>

      </S.Main>

    </S.Container>
  );
}