import styled from "styled-components";

export const SidebarContainer = styled.aside`
  width: 200px;
  background-color: #f5f5f5;
  padding: 20px;
`;

export const SidebarTitle = styled.h3`
  margin-bottom: 20px;
  font-size: 1.2em;
`;

export const NavList = styled.ul`
  list-style: none;
  padding: 0;
  border:2px solid purple;
`;

export const NavItem = styled.li`
  margin: 10px 0;
  border:2px solid grey;
  display: flex;
  flex-flow: column;
`;