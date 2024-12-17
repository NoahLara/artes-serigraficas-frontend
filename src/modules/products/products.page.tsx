import React, { useState } from "react";
import { Grid, Text, TextInput, Title } from "@mantine/core";
import { useQuery } from "@apollo/client";
import { GET_PRODUCTS } from "../../graphql/queries/getProducts.query";
import { ProductsLoading } from "./components/products-loading.component";
import { Product } from "../shared/core/interfaces";
import { Card } from "../shared/components/card/card.component";

export const ProductsPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>(""); // Search input state

  const { loading, error, data } = useQuery<{ products: Product[] }>(
    GET_PRODUCTS
  );

  // Filter products based on the search term
  const filteredProducts = data?.products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={{ padding: "20px" }}>
      <Title order={2} mb="lg">
        Productos
      </Title>

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
          Error loading products.
        </Text>
      )}

      {/* Products Grid */}
      <Grid gutter="md">
        {filteredProducts && filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <Grid.Col key={product.productId} span={3}>
              <Card
                shadow="md"
                padding="lg"
                radius="md"
                withBorder={false}
                img_alt="product image"
                text_weight={500}
                text_size="sm"
                text_color="dimmed"
                text_margin_top="md"
                product={product}
              />
            </Grid.Col>
          ))
        ) : (
          <Text c="dimmed" mt="lg" ta="center" p={40}>
            No se encontraron productos para "{searchTerm}".
          </Text>
        )}
      </Grid>
    </div>
  );
};
