import '@mantine/core/styles.css';
import { MantineProvider } from '@mantine/core';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { MainLayout } from './modules/layouts/main-layout';
import { OrdersPage } from './modules/orders/order.page';
import { EmployeesPage } from './modules/employees/employees.page';

export default function App() {
  return (
    <MantineProvider defaultColorScheme="dark">
      <BrowserRouter basename="/artes-serigraficas-frontend">
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route path="orders" element={<OrdersPage />} />
            <Route path="employees" element={<EmployeesPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </MantineProvider>
  );
} 