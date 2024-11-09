import React from "react";
import * as S from "./orders.styles";

export const OrdersPage: React.FC = () => {
  return (
    <S.OrdersContainer>
      <S.OrdersTitle>Orders Management</S.OrdersTitle>
      {/* Add additional content or components specific to Orders here */}
      <h4>We Are At Orders</h4>
    </S.OrdersContainer>
  );
};