import React, { useState } from "react";
import { Button, Flex, Text, TextInput, Title, Tooltip } from "@mantine/core";
import { RiAddLargeLine } from "react-icons/ri";
import { useQuery } from "@apollo/client";
import { GET_PRODUCTS } from "../../graphql/queries/getProducts.query";
import { ProductsLoading } from "./components/products-loading/products-loading.component";
import { Product } from "../shared/core/interfaces";
import { ProductsGrid } from "./components/products-grid/products-grid.component";
import { NotFound } from "../shared/components/not-found/not-found.component";
import { useDisclosure } from "@mantine/hooks";
import { NewProductModal } from "./components/new-product-modal/new-product-modal.component";

export const ProductsPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>(""); // Search input state
  const [
    openedNewProductModal,
    { open: openNewProduct, close: closeNewProduct },
  ] = useDisclosure(false);

  const { loading, error, data, refetch } = useQuery<{ products: Product[] }>(
    GET_PRODUCTS
  );

  // Filter products based on the search term
  const filteredProducts = data?.products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <div style={{ padding: "20px" }}>
        <Flex justify="space-between" align="center">
          <Title order={2} mb="lg">
            Productos
          </Title>

          <Tooltip label="Nuevo Producto" position="left">
            <Button variant="default" onClick={openNewProduct}>
              <RiAddLargeLine />
            </Button>
          </Tooltip>
        </Flex>

        {/* Search Bar */}
        <TextInput
          placeholder="Buscar productos..."
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
          mb="lg"
          radius="md"
          size="md"
        />

        {loading && <ProductsLoading />}

        {error && (
          <Text c="red" ta="center" p={20}>
            Hubo un error al cargar los productos, porfavor recargue la pagina.
          </Text>
        )}

        {/* Products Grid */}
        {filteredProducts && filteredProducts?.length > 0 ? (
          <ProductsGrid filteredProducts={filteredProducts}></ProductsGrid>
        ) : (
          <NotFound
            text={"No se encontraron coincidencias para" + searchTerm}
          />
        )}
      </div>

      <NewProductModal
        opened={openedNewProductModal}
        close={closeNewProduct}
        onSuccess={refetch}
      />
    </>
  );
};
