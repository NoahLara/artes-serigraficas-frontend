import { NavLink } from "@mantine/core";
import * as S from "./sidebar.styles";
import asOriginal from '../../../../assets/as-orginal.png';
import { AiOutlineOrderedList } from "react-icons/ai";
import { AiOutlineTeam } from "react-icons/ai";
import { Image } from '@mantine/core';

export const Sidebar: React.FC = () => {

    return (
      <S.SidebarContainer>
        <Image src={asOriginal} w={100} mx='xl' radius="xl"/>
        <S.NavList>
          {/* 📌.:BOTON DE ORDENES:. */}
          <S.LinkItem to="/orders">
            <NavLink
              label="Ordenes"
              leftSection={<AiOutlineOrderedList />}
            ></NavLink>
          </S.LinkItem>
          {/* 📌.:BOTON DE EMPLEADOS:. */}
          <S.LinkItem to="/employees">
            <NavLink
              label="Empleados"
              leftSection={<AiOutlineTeam />}
            ></NavLink>
          </S.LinkItem>
        </S.NavList>
      </S.SidebarContainer>
    );
    
}
