import {
  TextInput,
  NumberInput,
  Button,
  Alert,
  Text,
  Stack,
} from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { FaCheckCircle } from "react-icons/fa";
import { VscError } from "react-icons/vsc";
import { useForm } from "@mantine/form";
import { useMutation, useQuery } from "@apollo/client";
import { CREATE_PRODUCT } from "../../../../../../graphql/queries/createProduct.query";
import { PreviewImageNewProduct } from "../preview-image-new-product/preview-image-new-product.component";
import { Category } from "../../../../../shared/core/interfaces";
import { GET_CATEGORIES } from "../../../../../../graphql/queries/getCategories.query";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

interface ProductFormProps {
  onSuccess: () => void;
  onClose: () => void;
}

export const ProductForm: React.FC<ProductFormProps> = ({
  onSuccess,
  onClose,
}) => {
  const { category: categoryName } = useParams<{ category: string }>();

  const [categoryIdToSave, setCategoryIdToSave] = useState<string>("");

  const [createProduct, { error: errorCreateProduct }] =
    useMutation(CREATE_PRODUCT);

  const { data: categoriesData } = useQuery<{
    categories: Category[];
  }>(GET_CATEGORIES);

  const form = useForm({
    initialValues: {
      name: "",
      retailPrice: 0.0,
      wholeSalePrice: 0.0,
      SKU: "",
      image: null as string | ArrayBuffer | null,
      description: "",
      categoryId: "",
    },
    validate: {
      name: (value) =>
        value.trim().length === 0 ? "Nombre del producto es obligatorio" : null,
      retailPrice: (value) =>
        value <= 0 ? "Precio debe de ser mayor a 0" : null,
      wholeSalePrice: (value) =>
        value <= 0 ? "Precio debe de ser mayor a 0" : null,
      SKU: (value) => {
        if (value.trim().length === 0) {
          return "Codigo SKU es obligatorio";
        } else if (value.trim().length < 3 || value.trim().length > 100) {
          return "Codigo SKU debe tener almenos 3 caracteres";
        }
        return null;
      },
      image: (value) => (!value ? "Imagen del producto es obligatoria" : null),
      // categoryId: (value) =>
      //   value.trim().length === 0 ? "La categoria es obligatoria" : null,
    },
  });

  useEffect(() => {
    if (categoryName && categoriesData) {
      const categoryId = categoriesData.categories.find(
        (cat) => cat.name.toLowerCase() === categoryName?.toLowerCase()
      )?.categoryId;

      setCategoryIdToSave(categoryId || "");
      form.setFieldValue("categoryId", categoryIdToSave || "");
    }
  }, [categoriesData, categoryName, categoryIdToSave, form]);

  const handleSubmit = async (values: typeof form.values) => {
    try {
      const imageBase64 = values.image;
      const currentRetailPrice = values.retailPrice;
      const currentWholeSalePrice = values.wholeSalePrice;

      await createProduct({
        variables: {
          input: {
            ...values,
            retailPrice: currentRetailPrice * 100,
            wholeSalePrice: currentWholeSalePrice * 100,
            image: imageBase64,
          },
        },
      });

      form.reset();
      onCreateSuccess();
      onSuccess();
      onClose();
    } catch (err) {
      onCreateError();
      console.error("Error creating product:", err);
    }
  };

  const onCreateSuccess = () => {
    notifications.show({
      color: "teal",
      icon: <FaCheckCircle />,
      title: "Nuevo Producto",
      message: `El producto ${form.values.SKU} has sido creado exitosamente`,
      position: "top-right",
      time: 5000,
    });
  };
  const onCreateError = () => {
    notifications.show({
      color: "red",
      icon: <VscError />,
      title: "Nuevo Producto",
      message: `El producto ${form.values.SKU} no se pudo crear, intentelo de nuevo`,
      position: "top-right",
    });
    console.log("Error creating product: ", errorCreateProduct);
  };

  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      <Text size="md" fw={400}>
        Seleccione una imagen
      </Text>
      {/* PREVIEW IMAGE */}
      <Stack justify="center" align="center" p={25}>
        <PreviewImageNewProduct
          value={form.values.image}
          onChange={(base64: string | ArrayBuffer | null) =>
            form.setFieldValue("image", base64)
          }
        />
        {form.errors.image && <Alert color="red">{form.errors.image}</Alert>}
      </Stack>

      <TextInput
        label="Nombre del Producto"
        placeholder="e.g., Sample Product"
        withAsterisk
        {...form.getInputProps("name")}
      />
      <NumberInput
        label="Precio al Detalle"
        placeholder="e.g., 6.50"
        decimalScale={2}
        withAsterisk
        {...form.getInputProps("retailPrice")}
      />

      <NumberInput
        label="Precio por Mayor"
        placeholder="e.g., 10.35"
        decimalScale={2}
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
        label="Descripción"
        placeholder="Describe el producto"
        {...form.getInputProps("description")}
      />

      <Button type="submit" fullWidth mt="lg">
        Crear Producto
      </Button>
    </form>
  );
};
