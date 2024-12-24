import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";
import "@mantine/notifications/styles.css";
import { ApolloAppProvider } from "./graphql/ApolloProvider.jsx";
import { MantineProvider } from "@mantine/core";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom"; // Import Navigate
import { MainLayout } from "./modules/layouts/main-layout";
import { ProductsPage } from "./modules/products/products.page";
import { Notifications } from "@mantine/notifications";

export default function App() {
  return (
    <ApolloAppProvider>
      <MantineProvider defaultColorScheme="dark">
        <Notifications />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<MainLayout />}>
              {/* <Route index element={<Navigate to="productos" replace />} />
              <Route path="*" element={<Navigate to="productos" replace />} /> */}
              <Route path="productos" element={<ProductsPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </MantineProvider>
    </ApolloAppProvider>
  );
}
