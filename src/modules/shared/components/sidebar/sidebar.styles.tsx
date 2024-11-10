import styled from "styled-components";
import { Link } from 'react-router-dom';

export const SidebarContainer = styled.aside`
  width: 200px;
  padding: 20px;
  border-right: 1px solid #ececec;
`;

export const SidebarTitle = styled.h3`
  margin-bottom: 20px;
  font-size: 1.2em;
`;

export const NavList = styled.ul`
  list-style: none;
  padding: 0;
`;

export const LinkItem = styled(Link)`
  text-decoration: none;
  color: inherit;
`;