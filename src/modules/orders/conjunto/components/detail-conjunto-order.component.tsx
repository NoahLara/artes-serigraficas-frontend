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
  const [productDetail, setProductDetail] = useState<ProductDetail>({ name: "S", quantity: 0, price: 0 });

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

  const addDetail = () => {
    if (!selectedProduct) return;

    const newDetail: DetailConjuntoOrderInterface = {
      product: selectedProduct,
      detail: [productDetail],
    };

    setDetails((prevDetails) => [...prevDetails, newDetail]);
    onDetailChange([...details, newDetail]);

    setSelectedProduct(null);
    setSearchTerm("");
    setProductDetail({ name: "S", quantity: 0, price: 0 });
  };

  const removeDetail = (index: number) => {
    const updatedDetails = details.filter((_, i) => i !== index);
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
            label="Search Product"
            placeholder="Search by SKU or Name"
            value={searchTerm}
            onChange={(event) => {
              setSearchTerm(event.currentTarget.value);
              combobox.openDropdown();
            }}
            onFocus={() => combobox.openDropdown()}
            rightSection={
              searchTerm !== "" && (
                <CloseButton size="sm" onMouseDown={(event) => event.preventDefault()} onClick={() => setSearchTerm("")} aria-label="Clear value" />
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
        <Flex gap="md" mt="md">
          <Image src={selectedProduct.image as string} width={50} height={50} alt={selectedProduct.name} />
          <div>
            <p>SKU: {selectedProduct.SKU}</p>
          </div>
        </Flex>
      )}

      {selectedProduct && (
        <Flex gap="md" mt="md">
          <Select
            label="Size"
            data={["XS", "S", "M", "L", "XL", "2XL", "3XL", "4XL", "2", "4", "6", "8", "10", "12", "14", "16"]}
            value={productDetail.name as string}
            onChange={(value) => setProductDetail({ ...productDetail, name: value as ProductDetail["name"] })}
          />
          <NumberInput
            label="Quantity"
            min={1}
            value={productDetail.quantity}
            onChange={(value) => setProductDetail({ ...productDetail, quantity: (value as number) || 0 })}
          />
          <Select
            label="Price"
            data={[
              { value: selectedProduct.retailPrice.toString(), label: `Retail: $${selectedProduct.retailPrice/100}` },
              { value: selectedProduct.wholeSalePrice.toString(), label: `Wholesale: $${selectedProduct.wholeSalePrice/100}` },
            ].filter(
              (option, index, self) => index === self.findIndex((o) => o.value === option.value) // Ensure unique value
            )}
            value={productDetail.price.toString()}
            onChange={(value) => setProductDetail({ ...productDetail, price: parseFloat(value || "0") })}
          />
        </Flex>
      )}

      <Button mt="md" onClick={addDetail} disabled={!selectedProduct}>
        Add Product
      </Button>

      <Table mt="md" highlightOnHover>
        <thead>
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>SKU</th>
            <th>Size</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {details.map((detail, index) => (
            <tr key={index}>
              <td>
                <Image src={detail.product.image as string} width={50} height={50} alt={detail.product.name} />
              </td>
              <td>{detail.product.name}</td>
              <td>{detail.product.SKU}</td>
              <td>{detail.detail[0].name}</td>
              <td>{detail.detail[0].quantity}</td>
              <td>${detail.detail[0].price}</td>
              <td>
                <Button color="red" onClick={() => removeDetail(index)}>
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};
