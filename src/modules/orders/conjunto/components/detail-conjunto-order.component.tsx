import React, { useState, useEffect } from "react";
import { Button, Table, Select, NumberInput, Flex, Image, Loader, CloseButton, Combobox, TextInput, useCombobox, Textarea } from "@mantine/core";
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
    if (product) setSelectedProduct(product);
  };

  const addSizeDetail = () => {
    if (!selectedProduct) return;

    // Default the price to 0 or retail price based on initial selection
    const initialPrice = selectedProduct.retailPrice; // Default to retail price

    setProductDetails([
      ...productDetails,
      { name: "XS", quantity: 0, price: initialPrice }, // Set price initially as retail price
    ]);
  };

  const handleSizeChange = (index: number, field: keyof ProductDetail, value: string | number) => {
    const updatedDetails = productDetails.map((detail, i) => {
      if (i === index) {
        if (field === "price") {
          // Convert value to number if it's not already
          const priceValue = typeof value === "number" ? value : parseFloat(value.toString());
          return { ...detail, price: priceValue };
        }
        return { ...detail, [field]: value };
      }
      return detail;
    });
    setProductDetails(updatedDetails);
  };

  const addDetail = () => {
    if (!selectedProduct || productDetails.length === 0) return;

    const newDetail: DetailConjuntoOrderInterface = {
      product: selectedProduct,
      detail: productDetails,
      note: productNote,
    };

    setDetails((prevDetails) => [...prevDetails, newDetail]);
    onDetailChange([...details, newDetail]);

    setSelectedProduct(null);
    setSearchTerm("");
    setProductNote("");
    setProductDetails([]);
  };

  const removeDetail = (productIndex: number, sizeIndex: number) => {
    const updatedDetails = [...details];

    if (updatedDetails[productIndex]?.detail?.[sizeIndex]) {
      updatedDetails[productIndex].detail.splice(sizeIndex, 1);

      if (updatedDetails[productIndex].detail.length === 0) {
        updatedDetails.splice(productIndex, 1);
      }

      setDetails(updatedDetails);
      onDetailChange(updatedDetails);
    }
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
            <Textarea label="Nota" placeholder="Agrege una nota al producto" flex={1} onChange={(value) => setProductNote(value.currentTarget.value)} />
          </Flex>

          {productDetails.map((detail, index) => (
            <Flex key={index} gap="md" mt="md" align="flex-end">
              <Select
                label="Tamaño"
                data={["XS", "S", "M", "L", "XL", "2XL", "3XL", "4XL", "2", "4", "6", "8", "10", "12", "14", "16"]}
                value={detail.name as string}
                onChange={(value) => handleSizeChange(index, "name", value as string)}
              />
              <NumberInput label="Cantidad" min={1} value={detail.quantity} onChange={(value) => handleSizeChange(index, "quantity", value)} />
              <Select
                label="Precio"
                value={detail.price === selectedProduct?.retailPrice ? "Precio al detalle" : "Precio por mayor"}
                onChange={(value) => {
                  const selectedPrice = value === "Precio al detalle" ? selectedProduct?.retailPrice : selectedProduct?.wholeSalePrice;
                  handleSizeChange(index, "price", selectedPrice);
                }}
                data={["Precio al detalle", "Precio por mayor"]}
              />
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
      <Table mt="md" highlightOnHover>
        <thead>
          <tr>
            <th>Imagen</th>
            <th style={{ textAlign: "left" }}>Nombre</th>
            <th style={{ textAlign: "left" }}>SKU</th>
            <th style={{ textAlign: "center" }}>Tamaño</th>
            <th>Cantidad</th>
            <th style={{ textAlign: "left" }}>Precio</th>
            <th style={{ textAlign: "left" }}>Sub-total</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {details.map((detail, productIndex) =>
            detail.detail.map((sizeDetail, sizeIndex) => (
              <tr key={`${productIndex}-${sizeIndex}`}>
                <td>
                  <Image src={detail.product.image as string} style={{ objectFit: "contain" }} width={50} height={50} alt={detail.product.name} />
                </td>
                <td>{detail.product.name}</td>
                <td>{detail.product.SKU}</td>
                <td style={{ textAlign: "center" }}>{sizeDetail.name}</td>
                <td style={{ textAlign: "center" }}>{sizeDetail.quantity}</td>
                <td>${(sizeDetail.price / 100).toFixed(2)}</td>
                <td>${(sizeDetail.quantity * (sizeDetail.price / 100)).toFixed(2)}</td>
                <td style={{ textAlign: "center" }}>
                  <Button variant="outline" color="red" onClick={() => removeDetail(productIndex, sizeIndex)}>
                    <FaRegTrashAlt size={14} />
                  </Button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </Table>
    </div>
  );
};
