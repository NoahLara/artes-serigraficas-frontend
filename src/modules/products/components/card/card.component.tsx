import React from "react";
import { Button, Card as CardComponent, Image, Text } from "@mantine/core";
import { Product } from "../../../shared/core/interfaces";
import { NewOrderDrawer } from "./components/new-order-drawer/new-order-drawer";
import { useDisclosure } from "@mantine/hooks";

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
  const [opened, { open, close }] = useDisclosure(false);
  console.log(product.image);

  return (
    <>
      <CardComponent
        shadow={shadow}
        padding={padding}
        radius={radius}
        withBorder={withBorder}
      >
        <CardComponent.Section>
          <Image src={product.image} alt={img_alt} />{" "}
        </CardComponent.Section>
        <Text fw={text_weight} mt={text_margin_top}>
          {product.name}
        </Text>
        <Text size={text_size} color={text_color}>
          Descripcion del Producto
        </Text>
        <Button variant="default" onClick={open}>
          Crear orden
        </Button>
      </CardComponent>

      <NewOrderDrawer opened={opened} product={product} onClose={close} />
    </>
  );
};
