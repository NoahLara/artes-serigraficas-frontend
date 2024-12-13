import { Drawer, Image, Text } from "@mantine/core";
import React from "react";
import { Product } from "../../../../core/interfaces";

interface NewOrderDrawerProps {
  opened: boolean;
  product: Product;
  onClose: () => void;
}

export const NewOrderDrawer: React.FC<NewOrderDrawerProps> = ({
  opened,
  product,
  onClose,
}) => {
  return (
    <>
      <Drawer
        opened={opened}
        onClose={onClose}
        title={product.name}
        position="right"
        overlayProps={{ backgroundOpacity: 0.5, blur: 4 }}
      >
        {/* Drawer content */}

        <Image
          src={product.image}
          radius="sm"
          style={{ border: `1px  grey red` }}
          h={100}
          w="auto"
        />
        <Text size="xs">ID: {product.id}</Text>
      </Drawer>
    </>
  );
};
