import { NavLink } from "@mantine/core";
import { Image } from "@mantine/core";
import * as S from "./sidebar.styles";
import asOriginal from "../../../../assets/as-orginal.png";
import { GiClothes } from "react-icons/gi";
import { MdAssignmentAdd } from "react-icons/md";

export const Sidebar: React.FC = () => {
  return (
    <S.SidebarContainer>
      <Image src={asOriginal} w={100} mx="xl" radius="xl" />
      <S.NavList>
        {/* 📌.:BOTON DE ORDENES:. */}
        <NavLink
          component={S.LinkItem} // Use styled Link directly
          to="/ordenes"
          label="Ordenes"
          leftSection={<MdAssignmentAdd />}
        />
        {/* 📌.:BOTON DE PRODUCTOS:. */}
        <NavLink
          component={S.LinkItem} // Use styled Link directly
          to="/productos"
          label="Productos"
          leftSection={<GiClothes />}
        />
      </S.NavList>
    </S.SidebarContainer>
  );
};
