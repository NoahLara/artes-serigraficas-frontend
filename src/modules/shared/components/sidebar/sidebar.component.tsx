import { NavLink } from "@mantine/core";
import { Image } from "@mantine/core";
import * as S from "./sidebar.styles";
import asOriginal from "../../../../assets/as-orginal.png";
import { GiClothes } from "react-icons/gi";
// import { IoShirt } from "react-icons/io5";
import { AiFillProduct } from "react-icons/ai";
import { MdAssignmentAdd } from "react-icons/md";
import { IoShirt } from "react-icons/io5";

export const Sidebar: React.FC = () => {
  return (
    <S.SidebarContainer>
      <Image src={asOriginal} w={100} mx="xl" radius="xl" />
      <S.NavList>
        {/* 📌.:BOTON DE PRODUCTOS:. */}
        <NavLink href="#required-for-focus" label="Productos" leftSection={<AiFillProduct />} childrenOffset={28}>
          <NavLink component={S.LinkItem} to="/productos/Conjunto" label="Conjuntos" leftSection={<GiClothes />} />
        </NavLink>
        {/* 📌.:BOTON DE PEDIDOS:. */}
        <NavLink href="#required-for-focus" label="Pedidos" leftSection={<MdAssignmentAdd />} childrenOffset={28}>
          <NavLink component={S.LinkItem} to="/pedido/Conjuntos" label="Conjuntos" leftSection={<GiClothes />} />

          <NavLink component={S.LinkItem} to="/pedido/Camisas" label="Camisas" leftSection={<IoShirt />} />
        </NavLink>
      </S.NavList>
    </S.SidebarContainer>
  );
};
