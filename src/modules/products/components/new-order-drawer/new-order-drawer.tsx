import { Drawer, Flex, Image, Stack, Text } from "@mantine/core";
import React from "react";
import { Product } from "../../../../../shared/core/interfaces";
import { NewOrderForm } from "../new-order-form/new-order-form";

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
        size="xl"
        onClose={onClose}
        title="Nuevo Pedido"
        position="right"
        overlayProps={{ backgroundOpacity: 0.5, blur: 4 }}
      >
        {/* Drawer content */}

        <Flex justify="flex-start" align="flex-start">
          <Image src={product.image} radius="sm" h={100} w="auto" />

          <Stack align="flex-start" justify="center">
            <Text size="sm" fw={900}>
              Producto: {product.name}
            </Text>
            <Text size="xs">ID: {product.id}</Text>
          </Stack>
        </Flex>

        <NewOrderForm />
      </Drawer>
    </>
  );
};
