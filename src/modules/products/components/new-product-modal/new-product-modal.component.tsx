import { Modal } from "@mantine/core";
import React from "react";
import { NewProductModalProps } from "./new-product-modal.interfaces";

export const NewProductModal: React.FC<NewProductModalProps> = ({
  opened,
  close,
}) => {
  return <Modal opened={opened} onClose={close} title="Nuevo Producto">
    <h3>Nuevo Producto</h3>
  </Modal>;
};
