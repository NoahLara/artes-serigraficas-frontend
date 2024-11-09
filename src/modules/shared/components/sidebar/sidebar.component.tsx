import { Link } from "react-router-dom";
import * as S from "./sidebar.styles";

export const Sidebar: React.FC = () => {

    return (
      <S.SidebarContainer>
        <S.SidebarTitle>Sidebar Navigation</S.SidebarTitle>
        <S.NavList>
          <S.NavItem>
            <Link to="/orders">Orders</Link>
            <Link to="/employees">Employees</Link>
          </S.NavItem>
        </S.NavList>
      </S.SidebarContainer>
    );
    
}
