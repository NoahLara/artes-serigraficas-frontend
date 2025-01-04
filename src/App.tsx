import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";
import "@mantine/notifications/styles.css";
import { ApolloAppProvider } from "./graphql/ApolloProvider.jsx";
import { MantineProvider } from "@mantine/core";
import { BrowserRouter, Route, Routes } from "react-router-dom"; // Import Navigate
import { MainLayout } from "./modules/layouts/main-layout";
import { ProductsPage } from "./modules/products/products.page";
import { Notifications } from "@mantine/notifications";
import { OrdersPage } from "./modules/orders/orders.page.js";
import { DatesProvider } from "@mantine/dates";
import dayjs from "dayjs";
import "dayjs/locale/es"; // Import Spanish locale

dayjs.locale("es"); // Set Spanish as the default locale

export default function App() {
  return (
    <ApolloAppProvider>
      <MantineProvider defaultColorScheme="dark">
        <DatesProvider settings={{ locale: "es", firstDayOfWeek: 1 }}>
          <Notifications />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<MainLayout />}>
                {/* <Route index element={<Navigate to="productos" replace />} />
              <Route path="*" element={<Navigate to="productos" replace />} /> */}
                <Route path="productos/:category" element={<ProductsPage />} />

                <Route path="ordenes" element={<OrdersPage />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </DatesProvider>
      </MantineProvider>
    </ApolloAppProvider>
  );
}
