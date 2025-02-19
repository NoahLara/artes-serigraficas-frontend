import React, { useState } from "react";
import { TextInput, NumberInput, Button, Alert, Flex, Text, Loader, Stack } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useMutation, useQuery } from "@apollo/client";
import { notifications } from "@mantine/notifications";
import { Category, Product } from "../../../../../shared/core/interfaces";
import { UPDATE_PRODUCT } from "../../../../../../graphql/queries/updateProduct.query";
import { GET_CATEGORIES } from "../../../../../../graphql/queries/getCategories.query";
import { PreviewImageUpdateProduct } from "../preview-image-update-product/preview-image-update-product.component";
import { FaCheckCircle } from "react-icons/fa";
import { VscError } from "react-icons/vsc";

interface UpdateProductFormProps {
  product: Product;
  onSuccess: () => void;
  onClose: () => void;
}

export const UpdateProductForm: React.FC<UpdateProductFormProps> = ({ product, onSuccess, onClose }) => {
  const [updateProduct, { loading: loadingUpdateProduct }] = useMutation(UPDATE_PRODUCT);

  const { loading: loadingCategories, error: errorCategories } = useQuery<{
    categories: Category[];
  }>(GET_CATEGORIES);

  const [loading, setLoading] = useState(false);

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
      name: (value) => (value.trim().length === 0 ? "Nombre del producto es obligatorio" : null),
      retailPrice: (value) => (value <= 0 ? "Precio debe ser mayor a 0" : null),
      wholeSalePrice: (value) => (value <= 0 ? "Precio debe ser mayor a 0" : null),
      SKU: (value) => (value.trim().length === 0 ? "Codigo SKU es obligatorio" : null),
      image: (value) => (!value ? "La imagen del producto es obligatoria" : null),
      categoryId: (value) => (value.trim().length === 0 ? "La categoria es obligatoria" : null),
    },
  });

  const handleSubmit = async (values: typeof form.values) => {
    onLoading();
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

      onCloseLoading();
      onCreateSuccess();
      onSuccess();
      onClose();
    } catch (err) {
      onCloseLoading();
      onCreateError();
      console.error("Error updating product:", err);
    }
  };

  const onLoading = () => {
    setLoading(true);
    notifications.show({
      color: "teal",
      icon: <FaCheckCircle />,
      title: "CARGANDO....",
      message: `Espere hasta que se haya completado la operación`,
      position: "top-right",
    });
  };

  const onCloseLoading = () => {
    setLoading(false);
    notifications.clean();
  };

  const onCreateSuccess = () => {
    notifications.show({
      color: "teal",
      icon: <FaCheckCircle />,
      title: "Modificar Producto",
      message: `El producto ${form.values.SKU} has sido modificado exitosamente`,
      position: "top-right",
      time: 5000,
    });
  };
  const onCreateError = () => {
    notifications.show({
      color: "red",
      icon: <VscError />,
      title: "Modificar Producto",
      message: `El SKU ${form.values.SKU} ya se encuentra guardado, intente con otro SKU`,
      position: "top-right",
    });
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
          onChange={(base64: string | ArrayBuffer | null) => form.setFieldValue("image", base64)}
          loading={loading}
        />
        {form.errors.image && <Alert color="red">{form.errors.image}</Alert>}
      </Stack>

      <TextInput label="Nombre del Producto" placeholder="Ingrese nombre" withAsterisk {...form.getInputProps("name")} disabled={loading} />
      <NumberInput
        label="Precio al Detalle"
        decimalScale={2}
        placeholder="e.g., 10, 12.50, 5.50, 24.40"
        withAsterisk
        {...form.getInputProps("retailPrice")}
        disabled={loading}
      />
      <NumberInput
        label="Precio por Mayor"
        decimalScale={2}
        placeholder="e.g., 10, 12.50, 5.50, 24.40"
        withAsterisk
        {...form.getInputProps("wholeSalePrice")}
        disabled={loading}
      />
      <TextInput label="SKU" placeholder="e.g., PRODUCT01" withAsterisk {...form.getInputProps("SKU")} disabled={loading} />

      <TextInput label="Descripcion" placeholder="Describa el producto" {...form.getInputProps("description")} disabled={loading} />

      <Flex>
        {loadingCategories ? (
          <Loader color="blue" />
        ) : errorCategories ? (
          <Alert title="Error" color="red" mt="lg">
            Categorias no pudieron cargarse. Porfavor refresque la pagina.
          </Alert>
        ) : (
          ""
        )}
      </Flex>

      <Button type="submit" fullWidth mt="lg" loading={loadingUpdateProduct} disabled={loading}>
        Modificar Producto
      </Button>
    </form>
  );
};
