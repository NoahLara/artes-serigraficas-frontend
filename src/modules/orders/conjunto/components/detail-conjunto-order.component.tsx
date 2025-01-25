import React, { useState, useEffect } from "react";
import {
  Button,
  Table,
  Select,
  NumberInput,
  Flex,
  Image,
  Loader,
  CloseButton,
  Combobox,
  TextInput,
  useCombobox,
  Textarea,
  Accordion,
  Group,
  Avatar,
  Text,
} from "@mantine/core";
import { useQuery } from "@apollo/client";
import { Category, Product, ProductDetail } from "../../../shared/core/interfaces";
import { DetailConjuntoOrderInterface } from "./detail-conjunto-order.interface";
import { GET_PRODUCTS } from "../../../../graphql/queries/getProducts.query";
import { GET_CATEGORIES } from "../../../../graphql/queries/getCategories.query";
import { FaRegTrashAlt } from "react-icons/fa";
import { TbRulerMeasure } from "react-icons/tb";

interface OrderConjuntoProps {
  onDetailChange: (details: DetailConjuntoOrderInterface[]) => void;
}

export const DetailOrderConjunto: React.FC<OrderConjuntoProps> = ({ onDetailChange }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [productNote, setProductNote] = useState<string>("");
  const [details, setDetails] = useState<DetailConjuntoOrderInterface[]>([]);
  const [productDetails, setProductDetails] = useState<ProductDetail[]>([]);

  const { data: productsData, loading: loadingProducts } = useQuery<{ products: Product[] }>(GET_PRODUCTS);
  const { data: categoriesData, loading: loadingCategories } = useQuery<{ categories: Category[] }>(GET_CATEGORIES);

  const combobox = useCombobox();

  useEffect(() => {
    if (productsData && categoriesData) {
      const conjuntoCategory = categoriesData.categories.find((category) => category.name.toLowerCase() === "conjunto");
      if (conjuntoCategory) {
        setFilteredProducts(productsData.products.filter((product) => product.categoryId === conjuntoCategory.categoryId));
      }
    }
  }, [productsData, categoriesData]);

  const handleProductSelect = (productName: string) => {
    const product = filteredProducts.find((p) => p.name === productName);
    if (product) {
      setSelectedProduct(product);

      // Check if product is already in details and prefill the note
      const existingDetail = details.find((detail) => detail.product.productId === product.productId);
      setProductNote(existingDetail ? existingDetail.note : "");
    }
  };

  const addSizeDetail = () => {
    if (!selectedProduct) return;

    setProductDetails([
      ...productDetails,
      { name: "XS", quantity: 0 }, // Set price initially as retail price
    ]);
  };

  const handleSizeChange = (index: number, field: keyof ProductDetail, value: string | number) => {
    const updatedDetails = productDetails.map((detail, i) => {
      if (i === index) {
        return { ...detail, [field]: value };
      }
      return detail;
    });
    setProductDetails(updatedDetails);
  };

  const addDetail = () => {
    if (!selectedProduct || productDetails.length === 0) return;

    const existingIndex = details.findIndex((detail) => detail.product.productId === selectedProduct.productId);

    const newDetail: DetailConjuntoOrderInterface = {
      product: selectedProduct,
      detail: productDetails,
      note: productNote,
    };

    const updatedDetails = [...details];

    if (existingIndex > -1) {
      // Merge sizes into existing product
      updatedDetails[existingIndex].detail = [...updatedDetails[existingIndex].detail, ...newDetail.detail];
      updatedDetails[existingIndex].note = productNote; // Update note
    } else {
      // Add as new product
      updatedDetails.push(newDetail);
    }

    setDetails(updatedDetails);
    onDetailChange(updatedDetails); // Notify parent
    setSelectedProduct(null);
    setSearchTerm("");
    setProductNote("");
    setProductDetails([]);
  };

  const removeDetail = (productIndex: number, sizeIndex: number) => {
    setDetails((prevDetails) => {
      const updatedDetails = [...prevDetails];

      if (updatedDetails[productIndex]?.detail?.[sizeIndex]) {
        updatedDetails[productIndex].detail.splice(sizeIndex, 1);

        // If no sizes left for the product, remove the product entirely
        if (updatedDetails[productIndex].detail.length === 0) {
          updatedDetails.splice(productIndex, 1);
        }
      }

      onDetailChange(updatedDetails); // Update parent with new details
      return updatedDetails;
    });
  };

  const removeProduct = (productIndex: number) => {
    setDetails((prevDetails) => {
      // Filter out the product by its index
      const updatedDetails = prevDetails.filter((_, index) => index !== productIndex);

      onDetailChange(updatedDetails); // Notify parent of changes
      return updatedDetails;
    });
  };

  if (loadingProducts || loadingCategories) return <Loader />;

  return (
    <div>
      <Combobox
        onOptionSubmit={(optionValue) => {
          handleProductSelect(optionValue);
          combobox.closeDropdown();
        }}
        store={combobox}
      >
        <Combobox.Target>
          <TextInput
            label="Buscar Producto"
            placeholder="Buscar por SKU o Nombre"
            value={searchTerm}
            onChange={(event) => {
              setSearchTerm(event.currentTarget.value);
              combobox.openDropdown();
            }}
            onFocus={() => combobox.openDropdown()}
            rightSection={
              searchTerm !== "" && (
                <CloseButton size="sm" onMouseDown={(event) => event.preventDefault()} onClick={() => setSearchTerm("")} aria-label="Limpiar valor" />
              )
            }
          />
        </Combobox.Target>

        <Combobox.Dropdown>
          <Combobox.Options>
            {filteredProducts
              .filter((product) =>
                searchTerm
                  ? product.name.toLowerCase().includes(searchTerm.toLowerCase()) || product.SKU.toLowerCase().includes(searchTerm.toLowerCase())
                  : true
              )
              .map((product, index) => (
                <Combobox.Option key={index} value={product.name}>
                  <Flex align="center" gap="sm">
                    <Image src={product.image as string} width={100} height={100} alt={product.name} />
                    <div>
                      <strong>{product.name}</strong>
                      <p>SKU: {product.SKU}</p>
                    </div>
                  </Flex>
                </Combobox.Option>
              ))}
          </Combobox.Options>
        </Combobox.Dropdown>
      </Combobox>
      {selectedProduct && (
        <div>
          <Flex gap="md" mt="md">
            <Image src={selectedProduct.image as string} width={200} height={200} alt={selectedProduct.name} />
            <div>
              <p>SKU: {selectedProduct.SKU}</p>
              <p>Nombre: {selectedProduct.name}</p>
              <p>Descripcion: {selectedProduct.description}</p>
              <p>
                Precio al detalle: <strong>${(selectedProduct.retailPrice / 100).toFixed(2)}</strong> | Precio por mayor :{" "}
                <strong>${(selectedProduct.wholeSalePrice / 100).toFixed(2)}</strong>
              </p>
            </div>
            <Textarea
              flex={1}
              label="Nota"
              placeholder="Agrega una nota al producto"
              value={productNote}
              onChange={(value) => setProductNote(value.currentTarget.value)}
            />
          </Flex>

          {productDetails.map((detail, index) => (
            <Flex key={index} gap="md" mt="md" align="flex-end">
              <Select
                label="Tamaño"
                data={["2", "4", "6", "8", "10", "12", "14", "16", "XS", "S", "M", "L", "XL", "2XL", "3XL", "4XL"]}
                value={detail.name as string}
                onChange={(value) => handleSizeChange(index, "name", value as string)}
              />
              <NumberInput label="Cantidad" min={1} value={detail.quantity} onChange={(value) => handleSizeChange(index, "quantity", value)} />
              <Button
                variant="outline"
                color="red"
                leftSection={<FaRegTrashAlt size={14} />}
                onClick={() => setProductDetails((prev) => prev.filter((_, i) => i !== index))}
              >
                Eliminar Talla
              </Button>
            </Flex>
          ))}

          <Flex gap="md" align="center">
            <Button variant="outline" mt="sm" leftSection={<TbRulerMeasure size={14} />} onClick={addSizeDetail}>
              Agregar Talla
            </Button>

            <Button mt="md" onClick={addDetail} disabled={!selectedProduct || productDetails.length === 0}>
              Agregar Producto
            </Button>
          </Flex>
        </div>
      )}

      <Text mt={50} size="lg" fw={700}>
        Productos agregados a la orden
      </Text>

      <Accordion mt={5}>
        {details.map((detail, productIndex) => {
          const { product, note, detail: sizeDetails } = detail;
          const { SKU, image, wholeSalePrice } = product;

          // Generate unique key and value
          const accordionKey = `${SKU}${productIndex}`;

          // Calculate subtotal
          const subTotal = (sizeDetails.reduce((total, det) => total + wholeSalePrice * det.quantity, 0) / 100).toFixed(2);

          return (
            <Accordion.Item value={accordionKey} key={accordionKey}>
              <Accordion.Control>
                <Group wrap="nowrap">
                  <Avatar src={image?.toString()} radius="xl" size="lg" />
                  <div>
                    <Text>SKU: {product.SKU}</Text>
                    <Text>Sub-total: ${subTotal}</Text>
                    <Text size="sm" color="dimmed" fw={400}>
                      Nota: {note}
                    </Text>
                  </div>
                </Group>
              </Accordion.Control>
              <Accordion.Panel>
                {/* BOTON PARA ELIMINAR TODAS LAS TALLAS TODO EL PRODUCTO DE LA ORDEN */}
                <Button variant="outline" color="red" onClick={() => removeProduct(productIndex)} mt="md">
                  <Flex gap={10} align="center">
                    <FaRegTrashAlt size={14} /> <Text>Remover todas las tallas</Text>
                  </Flex>
                </Button>

                {/* TABLA DE TALLAS */}

                <Table mt="md" highlightOnHover>
                  <thead>
                    <tr>
                      <th style={{ textAlign: "center" }}>Tamaño</th>
                      <th>Cantidad</th>
                      <th style={{ textAlign: "left" }}>Precio</th>
                      <th style={{ textAlign: "left" }}>Sub-total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {detail.detail.map((sizeDetail, sizeIndex) => (
                      <tr key={`${productIndex}-${sizeIndex}`}>
                        <td style={{ textAlign: "center" }}>{sizeDetail.name}</td>
                        <td style={{ textAlign: "center" }}>{sizeDetail.quantity}</td>
                        <td>${(detail.product.wholeSalePrice / 100).toFixed(2)}</td>
                        <td>${(sizeDetail.quantity * (detail.product.wholeSalePrice / 100)).toFixed(2)}</td>
                        <td style={{ textAlign: "center" }}>
                          <Button variant="outline" color="red" onClick={() => removeDetail(productIndex, sizeIndex)}>
                            <FaRegTrashAlt size={14} />
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Accordion.Panel>
            </Accordion.Item>
          );
        })}
      </Accordion>
    </div>
  );
};
