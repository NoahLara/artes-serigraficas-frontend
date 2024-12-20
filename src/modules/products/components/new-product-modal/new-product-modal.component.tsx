import React from "react";
import { Modal } from "@mantine/core";
import { NewProductModalProps } from "./new-product-modal.interfaces";
import { ProductForm } from "./components/new-product-form.component";

export const NewProductModal: React.FC<NewProductModalProps> = ({
  opened,
  close,
}) => {
  const handleSuccess = () => {
    console.log("Product created successfully!");
  };

  return (
    <Modal opened={opened} onClose={close} title="Nuevo Producto">
      <ProductForm onSuccess={handleSuccess} onClose={close} />
    </Modal>
  );
};
