import React, { useState, useEffect } from "react";
import { Grid, Text, TextInput, Title } from "@mantine/core";
import * as S from "./orders.styles";

import { Card } from "../shared/components/card/card.component";
import { getProduct } from "./data/product.data";
import { Product } from "../shared/core/interfaces";

export const OrdersPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]); // Estado para los productos
  const [searchTerm, setSearchTerm] = useState(""); // Estado para el término de búsqueda

  // UseEffect para cargar los productos una vez que el componente esté montado
  useEffect(() => {
    const fetchProducts = async () => {
      const productResults = await getProduct(); // Obtener productos de manera asíncrona
      setProducts(productResults); // Actualizar el estado de los productos
    };

    fetchProducts(); // Llamada a la función
  }, []); // Este effect solo se ejecuta una vez cuando el componente se monta

  // Filtrar productos basado en el término de búsqueda
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <S.OrdersContainer>
      <Title order={2} mb="lg">
        Orders Management
      </Title>

      {/* Barra de búsqueda */}
      <TextInput
        placeholder="Search products..."
        value={searchTerm}
        onChange={(event) => setSearchTerm(event.target.value)}
        mb="lg"
        radius="md"
        size="md"
      />

      {/* Grid de productos */}
      <S.GridProductsContainer>
        <Grid >
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <Grid.Col key={product.id} span={3}>
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
            <Text c="dimmed" mt="lg" ta="center">
              No products found matching "{searchTerm}".
            </Text>
          )}
        </Grid>
      </S.GridProductsContainer>
    </S.OrdersContainer>
  );
};
