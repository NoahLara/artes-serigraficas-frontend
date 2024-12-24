import React from "react";
import { Modal } from "@mantine/core";
import { NewProductModalProps } from "./new-product-modal.interfaces";
import { ProductForm } from "./components/new-product-form/new-product-form.component";

export const NewProductModal: React.FC<NewProductModalProps> = ({
  opened,
  onSuccess,
  close,
}) => {
  return (
    <Modal opened={opened} onClose={close} title="Nuevo Producto">
      <ProductForm onSuccess={onSuccess} onClose={close} />
    </Modal>
  );
};
