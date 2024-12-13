import React from "react";
import { Card as CardComponent, Image, Text } from "@mantine/core";
import { Product } from "../../core/interfaces";

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
  return (
    <CardComponent
      shadow={shadow}
      padding={padding}
      radius={radius}
      withBorder={withBorder}
    >
      <CardComponent.Section>
        <Image src={product.image} alt={img_alt} />
      </CardComponent.Section>
      <Text fw={text_weight} mt={text_margin_top}>
        {product.name}
      </Text>
      <Text size={text_size} color={text_color}>
        Descrip
      </Text>
    </CardComponent>
  );
};
