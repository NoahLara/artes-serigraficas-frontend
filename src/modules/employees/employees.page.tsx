import React from "react";
import * as S from "./employees.styles";

export const EmployeesPage: React.FC = () => {
  return (
    <S.EmployeesContainer>
      <S.EmployeesTitle>Employees Management</S.EmployeesTitle>
      {/* Add additional content or components specific to Employees here */}
      <h4>We Are At Employees</h4>
    </S.EmployeesContainer>
  );
};