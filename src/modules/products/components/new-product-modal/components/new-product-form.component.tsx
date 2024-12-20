import React, { useState } from "react";
import {
  TextInput,
  NumberInput,
  Button,
  Select,
  Alert,
  Flex,
  Text,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useMutation } from "@apollo/client";
import { CREATE_PRODUCT } from "../../../../../graphql/queries/createProduct.query";
import { PreviewImageNewProduct } from "./preview-image-new-product/preview-image-new-product.component";

interface ProductFormProps {
  onSuccess: () => void;
  onClose: () => void;
}

export const ProductForm: React.FC<ProductFormProps> = ({
  onSuccess,
  onClose,
}) => {
  const [createProduct, { loading, error }] = useMutation(CREATE_PRODUCT);
  const [success, setSuccess] = useState(false);

  const form = useForm({
    initialValues: {
      name: "",
      price: 0,
      SKU: "",
      image: null as string | ArrayBuffer | null,
      description: "",
      categoryId: "",
    },
    validate: {
      name: (value) =>
        value.trim().length === 0 ? "Product name is required" : null,
      price: (value) => (value <= 0 ? "Price must be greater than zero" : null),
      SKU: (value) => (value.trim().length === 0 ? "SKU is required" : null),
      image: (value) => (!value ? "Image is required" : null),
      categoryId: (value) =>
        value.trim().length === 0 ? "Category is required" : null,
    },
  });

  const handleSubmit = async (values: typeof form.values) => {
    setSuccess(false);
    try {
      const imageBase64 = values.image;
      await createProduct({
        variables: {
          input: { ...values, image: imageBase64 },
        },
      });

      form.reset();
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        onSuccess();
        onClose();
      }, 2000);
    } catch (err) {
      console.error("Error creating product:", err);
    }
  };

  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      <Text size="md" fw={400}>
        Seleccione una imagen
      </Text>
      {/* PREVIEW IMAGE */}
      <Flex justify="center" align="center" p={25}>
        <PreviewImageNewProduct
          value={form.values.image}
          onChange={(base64: string | ArrayBuffer | null) =>
            form.setFieldValue("image", base64)
          }
        />
        {form.errors.image && <Alert color="red">{form.errors.image}</Alert>}
      </Flex>

      <TextInput
        label="Nombre del Producto"
        placeholder="e.g., Sample Product"
        withAsterisk
        {...form.getInputProps("name")}
      />
      <NumberInput
        label="Precio"
        placeholder="e.g., 100"
        withAsterisk
        {...form.getInputProps("price")}
      />
      <TextInput
        label="SKU"
        placeholder="e.g., PRODUCT01"
        withAsterisk
        {...form.getInputProps("SKU")}
      />

      <TextInput
        label="Descripción"
        placeholder="Describe el producto"
        {...form.getInputProps("description")}
      />
      <Select
        label="Categoría"
        placeholder="Selecciona una categoría"
        withAsterisk
        data={[
          {
            value: "cb5c9f47-43d0-4eb7-90a6-2caf7305c083",
            label: "Electrónica",
          },
          { value: "a1b2c3d4-5678-9abc-def0-1234567890ab", label: "Ropa" },
        ]}
        {...form.getInputProps("categoryId")}
      />
      <Button type="submit" fullWidth mt="lg" loading={loading}>
        Crear Producto
      </Button>

      {success && (
        <Alert title="Éxito" color="green" mt="lg">
          Producto creado con éxito.
        </Alert>
      )}
      {error && (
        <Alert title="Error" color="red" mt="lg">
          {error.message}
        </Alert>
      )}
    </form>
  );
};
