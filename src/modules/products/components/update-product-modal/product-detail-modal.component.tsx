import { Modal } from "@mantine/core";
import React from "react";
import { ProductDetailProps } from "./product-detail-modal.interfaces";
import { UpdateProductForm } from "./components/update-product/update-product-form.component";

export const ProductDetail: React.FC<ProductDetailProps> = ({
  opened,
  product,
  onSuccess,
  onClose,
}) => {
  return (
    <Modal opened={opened} onClose={onClose} title="Detalle del Producto">
      <UpdateProductForm
        product={product}
        onSuccess={onSuccess}
        onClose={onClose}
      />
    </Modal>
  );
};
