import React from "react";
import { ProductsGridProps } from "./products-grid.interfaces";
import { Grid } from "@mantine/core";
import { Card } from "../card/card.component";

export const ProductsGrid: React.FC<ProductsGridProps> = ({
  filteredProducts,
  onSuccess,
}) => {
  return (
    <Grid gutter="md">
      {filteredProducts &&
        filteredProducts.map((product) => (
          <Grid.Col key={product.productId} span={3}>
            <Card
              shadow="md"
              padding="lg"
              radius="md"
              withBorder={false}
              img_alt="product image"
              text_weight={800}
              text_size="sm"
              text_color="dimmed"
              text_margin_top="md"
              product={product}
              onSuccess={onSuccess}
            />
          </Grid.Col>
        ))}
    </Grid>
  );
};
