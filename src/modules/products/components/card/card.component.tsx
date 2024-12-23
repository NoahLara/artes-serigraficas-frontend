import React from "react";
import {
  Button,
  Image,
  Card as CardComponent,
  Text,
  Tooltip,
  Flex,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Product } from "../../../shared/core/interfaces";
import { ProductDetail } from "../update-product-modal/product-detail-modal.component";

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
  // text_size,
  // text_color,
  // text_margin_top,
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
          height: 375,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        {/* IMAGE */}
        <CardComponent.Section>
          <Image
            src={product.image}
            alt={img_alt}
            style={{ objectFit: "contain", height: 200 }}
          />
        </CardComponent.Section>
        {/* PRODUCT SKU */}
        <Flex justify="center">
          <Text fw={text_weight} size="xl">{product.SKU}</Text>
        </Flex>
        {/* PRODUCT NAME */}
        <Text>{product.name}</Text>
        {/* PRODUCT PRICES */}
        <Flex justify="flex-start" align="center" gap="sm">
          {/* RETAIL PRICE */}
          <Flex align="center" gap="xs">
            <Tooltip
              label="Precio al Detalle: Este es el precio para ventas individuales."
              position="top"
            >
              <Text size="sm" color="dimmed">
                $
                {product.retailPrice
                  ? (product.retailPrice / 100).toFixed(2)
                  : "N/A"}
              </Text>
            </Tooltip>
          </Flex>
          <Text size="sm" color="dimmed">
            /
          </Text>
          {/* WHOLESALE PRICE */}
          <Flex align="center" gap="xs">
            <Tooltip
              label="Precio por Mayor: Este es el precio para ventas en grandes cantidades."
              position="top"
            >
              <Text size="sm" color="dimmed">
                $
                {product.wholeSalePrice
                  ? (product.wholeSalePrice / 100).toFixed(2)
                  : "N/A"}
              </Text>
            </Tooltip>
          </Flex>
        </Flex>
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
