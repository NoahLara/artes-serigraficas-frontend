import { NavLink } from "@mantine/core";
import { Image } from "@mantine/core";
import * as S from "./sidebar.styles";
import asOriginal from "../../../../assets/as-orginal.png";
import { AiOutlineOrderedList, AiOutlineTeam } from "react-icons/ai";

export const Sidebar: React.FC = () => {
  return (
    <S.SidebarContainer>
      <Image src={asOriginal} w={100} mx="xl" radius="xl" />
      <S.NavList>
        {/* 📌.:BOTON DE ORDENES:. */}
        <NavLink
          component={S.LinkItem} // Use styled Link directly
          to="/orders"
          label="Ordenes"
          leftSection={<AiOutlineOrderedList />}
        />
        {/* 📌.:BOTON DE EMPLEADOS:. */}
        {/* <NavLink
          component={S.LinkItem} // Use styled Link directly
          to="/employees"
          label="Empleados"
          leftSection={<AiOutlineTeam />}
        /> */}
      </S.NavList>
    </S.SidebarContainer>
  );
};
