import React from "react";
import { Outlet } from "react-router-dom";
import * as S from "./main-layout.styles";
import { Header, Sidebar } from "../shared/components";

export const MainLayout: React.FC = () => {
  return (
    <S.LayoutContainer>
      <Sidebar />
      <S.ContentArea>
        <Header />
        <S.PageContent>
          <Outlet />
        </S.PageContent>
      </S.ContentArea>
    </S.LayoutContainer>
  );
}