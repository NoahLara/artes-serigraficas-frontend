import styled from "styled-components";

export const LayoutContainer = styled.div`
  display: flex;
  height: 100vh;
  border:1px solid red;
`;

export const ContentArea = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  border:1px solid red;
`;


export const PageContent = styled.main`
  padding: 20px;
  flex: 1;
  border:1px solid red;
`;