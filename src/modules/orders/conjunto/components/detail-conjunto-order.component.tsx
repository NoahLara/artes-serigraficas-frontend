import React, { useState, useEffect } from "react";
import { Button, Table, Select, NumberInput, Flex, Image, Loader, CloseButton, Combobox, TextInput, useCombobox } from "@mantine/core";
import { useQuery } from "@apollo/client";
import { Category, Product, ProductDetail } from "../../../shared/core/interfaces";
import { DetailConjuntoOrderInterface } from "./detail-conjunto-order.interface";
import { GET_PRODUCTS } from "../../../../graphql/queries/getProducts.query";
import { GET_CATEGORIES } from "../../../../graphql/queries/getCategories.query";

interface OrderConjuntoProps {
  onDetailChange: (details: DetailConjuntoOrderInterface[]) => void;
}

export const DetailOrderConjunto: React.FC<OrderConjuntoProps> = ({ onDetailChange }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
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
      { name: "S", quantity: 0, price: initialPrice }, // Set price initially as retail price
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
    };

    setDetails((prevDetails) => [...prevDetails, newDetail]);
    onDetailChange([...details, newDetail]);

    setSelectedProduct(null);
    setSearchTerm("");
    setProductDetails([]);
  };

  const removeDetail = (productIndex: number, sizeIndex: number) => {
    const updatedDetails = [...details];
    updatedDetails[productIndex].detail.splice(sizeIndex, 1);

    if (updatedDetails[productIndex].detail.length === 0) {
      updatedDetails.splice(productIndex, 1);
    }

    setDetails(updatedDetails);
    onDetailChange(updatedDetails);
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
                    <Image src={product.image as string} width={30} height={30} alt={product.name} />
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
            <Image src={selectedProduct.image as string} width={50} height={50} alt={selectedProduct.name} />
            <div>
              <p>SKU: {selectedProduct.SKU}</p>
            </div>
          </Flex>

          {productDetails.map((detail, index) => (
            <Flex key={index} gap="md" mt="md">
              <Select
                label="Tamaño"
                data={["XS", "S", "M", "L", "XL", "2XL", "3XL", "4XL", "2", "4", "6", "8", "10", "12", "14", "16"]}
                value={detail.name as string}
                onChange={(value) => handleSizeChange(index, "name", value as string)}
              />
              <NumberInput label="Cantidad" min={1} value={detail.quantity} onChange={(value) => handleSizeChange(index, "quantity", value)} />

              {/* Select Dropdown for Retail or Wholesale */}
              <Select
                label="Precio"
                value={detail.price === selectedProduct.retailPrice ? "Venta al por menor" : "Venta al por mayor"}
                onChange={(value) => {
                  const selectedPrice = value === "Venta al por menor" ? selectedProduct.retailPrice : selectedProduct.wholeSalePrice;
                  handleSizeChange(index, "price", selectedPrice); // Ensure price is set as number
                }}
                data={["Venta al por menor", "Venta al por mayor"]}
              />

              {/* Display price */}
              <NumberInput label="Precio" min={0} value={detail.price || 0} disabled rightSection={<span>${(detail.price || 0).toFixed(2)}</span>} />

              <Button color="red" onClick={() => removeDetail(details.length - 1, index)}>
                Eliminar
              </Button>
            </Flex>
          ))}

          <Button mt="sm" onClick={addSizeDetail}>
            Agregar Nuevo Tamaño
          </Button>

          <Button mt="md" onClick={addDetail} disabled={!selectedProduct || productDetails.length === 0}>
            Agregar Producto
          </Button>
        </div>
      )}

      <Table mt="md" highlightOnHover>
        <thead>
          <tr>
            <th>Imagen</th>
            <th>Nombre</th>
            <th>SKU</th>
            <th>Tamaño</th>
            <th>Cantidad</th>
            <th>Precio</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {details.map((detail, productIndex) =>
            detail.detail.map((sizeDetail, sizeIndex) => (
              <tr key={`${productIndex}-${sizeIndex}`}>
                <td>
                  <Image src={detail.product.image as string} width={50} height={50} alt={detail.product.name} />
                </td>
                <td>{detail.product.name}</td>
                <td>{detail.product.SKU}</td>
                <td>{sizeDetail.name}</td>
                <td>{sizeDetail.quantity}</td>
                <td>${sizeDetail.price.toFixed(2)}</td>
                <td>
                  <Button color="red" onClick={() => removeDetail(productIndex, sizeIndex)}>
                    Eliminar
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
