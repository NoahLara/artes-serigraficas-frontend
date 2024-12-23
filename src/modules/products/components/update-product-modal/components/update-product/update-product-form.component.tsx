import React, { useState } from "react";
import {
  TextInput,
  NumberInput,
  Button,
  Select,
  Alert,
  Flex,
  Text,
  Loader,
  Stack,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useMutation, useQuery } from "@apollo/client";
import { Category, Product } from "../../../../../shared/core/interfaces";
import { UPDATE_PRODUCT } from "../../../../../../graphql/queries/updateProduct.query";
import { GET_CATEGORIES } from "../../../../../../graphql/queries/getCategories.query";
import { PreviewImageUpdateProduct } from "../preview-image-update-product/preview-image-update-product.component";

interface UpdateProductFormProps {
  product: Product;
  onSuccess: () => void;
  onClose: () => void;
}

export const UpdateProductForm: React.FC<UpdateProductFormProps> = ({
  product,
  onSuccess,
  onClose,
}) => {
  const [
    updateProduct,
    { loading: loadingUpdateProduct, error: errorUpdateProduct },
  ] = useMutation(UPDATE_PRODUCT);

  const {
    loading: loadingCategories,
    error: errorCategories,
    data: categoriesData,
  } = useQuery<{ categories: Category[] }>(GET_CATEGORIES);
  const [success, setSuccess] = useState(false);

  const form = useForm({
    initialValues: {
      name: product.name,
      retailPrice: product.retailPrice / 100, // Convert from cents to dollars
      wholeSalePrice: product.wholeSalePrice / 100, // Convert from cents to dollars
      SKU: product.SKU,
      image: product.image || null,
      description: product.description || "",
      categoryId: product.categoryId || "",
    },
    validate: {
      name: (value) =>
        value.trim().length === 0 ? "Nombre del producto es obligatorio" : null,
      retailPrice: (value) => (value <= 0 ? "Precio debe ser mayor a 0" : null),
      wholeSalePrice: (value) =>
        value <= 0 ? "Precio debe ser mayor a 0" : null,
      SKU: (value) =>
        value.trim().length === 0 ? "Codigo SKU es obligatorio" : null,
      image: (value) =>
        !value ? "La imagen del producto es obligatoria" : null,
      categoryId: (value) =>
        value.trim().length === 0 ? "La categoria es obligatoria" : null,
    },
  });

  const handleSubmit = async (values: typeof form.values) => {
    setSuccess(false);
    try {
      const imageBase64 = values.image;
      const currentRetailPrice = values.retailPrice;
      const currentWholeSalePrice = values.wholeSalePrice;
      await updateProduct({
        variables: {
          id: product.productId,
          updateProductInput: {
            ...values,
            retailPrice: Math.round(currentRetailPrice * 100), // Convert back to cents
            wholeSalePrice: Math.round(currentWholeSalePrice * 100), // Convert back to cents
            image: imageBase64,
          },
        },
      });

      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        onSuccess();
        onClose();
      }, 2000);
    } catch (err) {
      console.error("Error updating product:", err);
    }
  };

  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      <Text size="md" fw={400}>
        Seleccione una imagen
      </Text>
      {/* PREVIEW IMAGE */}
      <Stack justify="center" align="center" p={25}>
        <PreviewImageUpdateProduct
          value={form.values.image} // Initialize with product.image
          onChange={(base64: string | ArrayBuffer | null) =>
            form.setFieldValue("image", base64)
          }
        />
        {form.errors.image && <Alert color="red">{form.errors.image}</Alert>}
      </Stack>

      <TextInput
        label="Nombre del Producto"
        placeholder="Ingrese nombre"
        withAsterisk
        {...form.getInputProps("name")}
      />
      <NumberInput
        label="Precio al Detalle"
        decimalScale={2}
        placeholder="e.g., 10, 12.50, 5.50, 24.40"
        withAsterisk
        {...form.getInputProps("retailPrice")}
      />
      <NumberInput
        label="Precio por Mayor"
        decimalScale={2}
        placeholder="e.g., 10, 12.50, 5.50, 24.40"
        withAsterisk
        {...form.getInputProps("wholeSalePrice")}
      />
      <TextInput
        label="SKU"
        placeholder="e.g., PRODUCT01"
        withAsterisk
        {...form.getInputProps("SKU")}
      />

      <TextInput
        label="Descripcion"
        placeholder="Describa el producto"
        {...form.getInputProps("description")}
      />

      <Flex>
        {loadingCategories ? (
          <Loader color="blue" />
        ) : errorCategories ? (
          <Alert title="Error" color="red" mt="lg">
            Categorias no pudieron cargarse. Porfavor refresque la pagina.
          </Alert>
        ) : (
          <Select
            w="100%"
            label="Categoria"
            placeholder="Seleccione una categoria"
            withAsterisk
            data={
              categoriesData && categoriesData.categories
                ? categoriesData.categories.map((category) => ({
                    value: category.categoryId,
                    label: category.name,
                  }))
                : []
            }
            {...form.getInputProps("categoryId")}
          />
        )}
      </Flex>

      <Button type="submit" fullWidth mt="lg" loading={loadingUpdateProduct}>
        Modificar Producto
      </Button>

      {success && (
        <Alert title="Success" color="green" mt="lg">
          Product modificado exitosamente
        </Alert>
      )}
      {errorUpdateProduct && (
        <Alert title="Error" color="red" mt="lg">
          {errorUpdateProduct.message}
        </Alert>
      )}
    </form>
  );
};
