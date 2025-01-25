import styled from "styled-components";

export const ModalContainer = styled.div`
  width: 100%;
  padding: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
`;

export const CardPDF = styled.div`
  border: 2px solid #bcbcbc;
  border-radius: 10px;
  padding: 10px;
  text-decoration: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #fff;
  transition: all ease-in-out 0.1s;
  box-sizing: border-box;
  cursor: pointer;

  &:hover {
    box-shadow: 0px 0px 2px #fff;
    margin-top: -5px;
    transition: all ease-in-out 0.1s;
  }

  .iconPdf {
    font-size: 75px;
  }
  span {
    font-size: 20px;
    text-align: center;
  }
`;
