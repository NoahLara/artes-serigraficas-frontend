import React, { useState } from "react";
import {
  TextInput,
  Card,
  Image,
  Text,
  Box,
  Flex,
  NumberInput,
  Stack,
  Grid,
  Divider,
} from "@mantine/core";
import { useQuery } from "@apollo/client";
import { Product } from "../../../shared/core/interfaces";
import { GET_PRODUCTS } from "../../../../graphql/queries/getProducts.query";
import { DetailOrderData } from "./detail-order.data";
import { ProductByPerson } from "../../../shared/core/interfaces/product-by-person.interface";
import { ProductSize } from "../../../shared/core/interfaces/product-size.interface";

export const DetailOrder: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [detailOrder, setDetailOrder] = useState<ProductByPerson>({
    ...DetailOrderData,
  });

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

  // Function to calculate totals for each person type
  const calculateTotalByType = (type: ProductSize[]) => {
    return type.reduce((total, detail) => {
      if (detail.quantity > 0) {
        return total + detail.quantity * detail.price;
      }
      return total;
    }, 0);
  };

  // Calculate totals for each group
  const totalHombre = calculateTotalByType(detailOrder.Hombre);
  const totalMujer = calculateTotalByType(detailOrder.Mujer);
  const totalNiño = calculateTotalByType(detailOrder.Niño);

  // Calculate the global total
  const globalTotal = totalHombre + totalMujer + totalNiño;

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
          marginBottom: "50px",
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

      {/* DETAIL ORDER */}
      <Grid>
        {/* HOMBRE */}
        <Grid.Col span={4} style={{ border: "1px solid grey" }}>
          <Text size="md" fw={700}>
            HOMBRE
          </Text>
          <Stack gap="lg" mt="sm">
            {detailOrder.Hombre.map((detail, index) => (
              <Flex gap={20} key={`hombre-${index}`}>
                <TextInput
                  size="xs"
                  label="Talla"
                  value={String(detail.name)}
                  disabled
                />
                <NumberInput
                  size="xs"
                  label="Cantidad"
                  value={detail.quantity}
                  onChange={(value) => {
                    const updatedHombre = [...detailOrder.Hombre];
                    updatedHombre[index].quantity =
                      parseInt(String(value ?? "0")) || 0;
                    setDetailOrder((prev) => ({
                      ...prev,
                      Hombre: updatedHombre,
                    }));
                  }}
                  min={0}
                />
                <NumberInput
                  size="xs"
                  label="Precio"
                  value={detail.price}
                  decimalScale={2}
                  onChange={(value) => {
                    const updatedHombre = [...detailOrder.Hombre];
                    updatedHombre[index].price =
                      parseFloat(String(value ?? "0")) || 0;
                    setDetailOrder((prev) => ({
                      ...prev,
                      Hombre: updatedHombre,
                    }));
                  }}
                  min={0}
                />
              </Flex>
            ))}
          </Stack>
          <Text size="lg" fw={700} mt="lg">
            Total HOMBRE: ${totalHombre.toFixed(2)}
          </Text>
        </Grid.Col>

        {/* MUJER */}
        <Grid.Col span={4} style={{ border: "1px solid grey" }}>
          <Text size="md" fw={700}>
            MUJER
          </Text>
          <Stack gap="lg" mt="sm">
            {detailOrder.Mujer.map((detail, index) => (
              <Flex gap={20} key={`mujer-${index}`}>
                <TextInput
                  size="xs"
                  label="Talla"
                  value={String(detail.name)}
                  disabled
                />
                <NumberInput
                  size="xs"
                  label="Cantidad"
                  value={detail.quantity}
                  onChange={(value) => {
                    const updatedMujer: ProductSize[] = [...detailOrder.Mujer];
                    updatedMujer[index].quantity =
                      parseInt(String(value ?? "0")) || 0;
                    setDetailOrder((prev) => ({
                      ...prev,
                      Mujer: updatedMujer,
                    }));
                  }}
                  min={0}
                />
                <NumberInput
                  size="xs"
                  label="Precio"
                  value={detail.price}
                  decimalScale={2}
                  onChange={(value) => {
                    const updatedMujer = [...detailOrder.Mujer];
                    updatedMujer[index].price =
                      parseFloat(String(value ?? "0")) || 0;
                    setDetailOrder((prev) => ({
                      ...prev,
                      Mujer: updatedMujer,
                    }));
                  }}
                  min={0}
                />
              </Flex>
            ))}
          </Stack>
          <Text size="lg" fw={700} mt="lg">
            Total MUJER: ${totalMujer.toFixed(2)}
          </Text>
        </Grid.Col>

        {/* NIÑO */}
        <Grid.Col span={4} style={{ border: "1px solid grey" }}>
          <Text size="md" fw={700}>
            NIÑOS
          </Text>
          <Stack gap="lg" mt="sm">
            {detailOrder.Niño.map((detail, index) => (
              <Flex gap={20} key={`niño-${index}`}>
                <TextInput
                  size="xs"
                  label="Talla"
                  value={String(detail.name)}
                  disabled
                />
                <NumberInput
                  size="xs"
                  label="Cantidad"
                  value={detail.quantity}
                  onChange={(value) => {
                    const updatedNiño = [...detailOrder.Niño];
                    updatedNiño[index].quantity =
                      parseInt(String(value ?? "0")) || 0;
                    setDetailOrder((prev) => ({
                      ...prev,
                      Niño: updatedNiño,
                    }));
                  }}
                  min={0}
                />
                <NumberInput
                  size="xs"
                  label="Precio"
                  value={detail.price}
                  decimalScale={2}
                  onChange={(value) => {
                    const updatedNiño = [...detailOrder.Niño];
                    updatedNiño[index].price =
                      parseFloat(String(value ?? "0")) || 0;
                    setDetailOrder((prev) => ({
                      ...prev,
                      Niño: updatedNiño,
                    }));
                  }}
                  min={0}
                />
              </Flex>
            ))}
          </Stack>
          <Text size="lg" fw={700} mt="lg">
            Total NIÑOS: ${totalNiño.toFixed(2)}
          </Text>
        </Grid.Col>
      </Grid>

      {/* GLOBAL TOTAL */}
      <Divider my="lg" />
      <Flex justify="center" mt="lg">
        <Text size="xl" fw={900}>
          TOTAL GLOBAL: ${globalTotal.toFixed(2)}
        </Text>
      </Flex>
    </Box>
  );
};
