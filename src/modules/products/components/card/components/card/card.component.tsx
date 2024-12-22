import React from "react";
import { Button, Image, Card as CardComponent, Text } from "@mantine/core";
import { Product } from "../../../../../shared/core/interfaces";
import { useDisclosure } from "@mantine/hooks";
import { ProductDetail } from "../../../update-product-modal/product-detail-modal.component";

interface CardProps {
  shadow: string;
  padding: string;
  radius: string;
  withBorder: boolean;
  img_alt: string;
  text_weight: number;
  text_size: string;
  text_color: string;
  text_margin_top: string;
  product: Product;
}

export const Card: React.FC<CardProps> = ({
  shadow,
  padding,
  radius,
  withBorder,
  img_alt,
  text_weight,
  text_size,
  text_color,
  text_margin_top,
  product,
}) => {
  const [
    openedProductDetail,
    { open: openProductDetail, close: closeProductDetail },
  ] = useDisclosure(false);

  return (
    <>
      <CardComponent
        shadow={shadow}
        padding={padding}
        radius={radius}
        withBorder={withBorder}
        style={{
          height: 400,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <CardComponent.Section>
          <Image
            src={product.image}
            alt={img_alt}
            style={{ objectFit: "contain", height: 200 }}
          />
        </CardComponent.Section>

        <Text fw={text_weight} mt={text_margin_top} lineClamp={1}>
          {product.name}
        </Text>
        <Text size="sm" color="dimmed" mb={10}>
          ${(product.price / 100).toFixed(2)} {/* Display price */}
        </Text>
        <Text size={text_size} color={text_color} lineClamp={2}>
          {product.description}
        </Text>

        <Button variant="default" onClick={openProductDetail} mt="auto">
          Detalle
        </Button>
      </CardComponent>

      {/* PRODUCT DETAIL MODAL */}
      <ProductDetail
        opened={openedProductDetail}
        product={product}
        onClose={() => closeProductDetail()}
      />
    </>
  );
};
