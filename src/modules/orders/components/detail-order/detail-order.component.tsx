import React, { useState } from "react";
import { TextInput, Card, Image, Text, Box, Flex } from "@mantine/core";
import { useQuery } from "@apollo/client";
import { Product } from "../../../shared/core/interfaces";
import { GET_PRODUCTS } from "../../../../graphql/queries/getProducts.query";

export const DetailOrder: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");

  const { loading, error, data } = useQuery(GET_PRODUCTS);

  // Filter products based on SKU or name
  const filteredProducts = data?.products.filter(
    (product: Product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.SKU.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleProductClick = (product: Product) => {
    console.log("Selected Product:", product);
  };

  return (
    <Box style={{ padding: "20px" }}>
      {/* Search Bar */}
      <TextInput
        placeholder="Buscar productos por nombre o SKU..."
        value={searchTerm}
        onChange={(event) => setSearchTerm(event.target.value)}
        mb="lg"
      />

      {/* Product Grid with Horizontal Scroll */}
      <Box
        style={{
          maxWidth: "1200px",
          display: "flex",
          overflowX: "auto",
          gap: "1rem",
        }}
      >
        {loading && <Text>Cargando productos...</Text>}
        {error && (
          <Text color="red">Hubo un error al cargar los productos.</Text>
        )}
        {filteredProducts?.length > 0 ? (
          filteredProducts.map((product: Product) => (
            <Card
              key={product.productId}
              style={{
                maxWidth: "150px",
                flex: "0 0 auto",
                cursor: "pointer",
              }}
              onClick={() => handleProductClick(product)}
            >
              <Card.Section>
                <Image
                  src={product.image}
                  alt="product image"
                  style={{ objectFit: "contain" }}
                />
              </Card.Section>
              <Flex justify="center">
                <Text fw={800} size="xl">
                  {product.SKU}
                </Text>
              </Flex>
            </Card>
          ))
        ) : (
          <Text>No se encontraron productos.</Text>
        )}
      </Box>
    </Box>
  );
};
