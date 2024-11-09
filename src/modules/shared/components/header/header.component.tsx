import React from "react";
import * as S from "./header.styles";
import { Darkmode } from "../darkmode/darkmode.component";

export const Header: React.FC = () => {
  return (
    <S.HeaderContainer>
      <S.HeaderTitle>Artes Serigraficas</S.HeaderTitle>
      <Darkmode />
    </S.HeaderContainer>
  );
};