import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Button, Flex, Text, TextInput, Title, Tooltip } from "@mantine/core";
import { RiAddLargeLine } from "react-icons/ri";
import { useQuery } from "@apollo/client";
import { GET_PRODUCTS } from "../../graphql/queries/getProducts.query";
import { GET_CATEGORIES } from "../../graphql/queries/getCategories.query";
import { ProductsLoading } from "./components/products-loading/products-loading.component";
import { ProductsGrid } from "./components/products-grid/products-grid.component";
import { NotFound } from "../shared/components/not-found/not-found.component";
import { useDisclosure } from "@mantine/hooks";
import { NewProductModal } from "./components/new-product-modal/new-product-modal.component";
import { Product, Category } from "../shared/core/interfaces";

export const ProductsPage: React.FC = () => {
  const { category: categoryName } = useParams<{ category: string }>();
  const [searchTerm, setSearchTerm] = useState<string>("");

  const [
    openedNewProductModal,
    { open: openNewProduct, close: closeNewProduct },
  ] = useDisclosure(false);

  const {
    loading: loadingProducts,
    error: errorProducts,
    data: productsData,
    refetch: refetchProducts,
  } = useQuery<{ products: Product[] }>(GET_PRODUCTS);

  const {
    loading: loadingCategories,
    error: errorCategories,
    data: categoriesData,
    refetch: refetchCategories,
  } = useQuery<{ categories: Category[] }>(GET_CATEGORIES);

  // State to store filtered products
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);

  // Effect to filter products based on category
  useEffect(() => {
    if (productsData && categoriesData) {
      const category = categoriesData.categories.find(
        (cat) => cat.name.toLowerCase() === categoryName?.toLowerCase()
      );

      if (category) {
        const filtered = productsData.products.filter(
          (product) => product.categoryId === category.categoryId
        );

        setFilteredProducts(filtered);
      } else {
        setFilteredProducts([]);
      }
    }
  }, [productsData, categoriesData, categoryName]);

  return (
    <>
      <div style={{ padding: "20px" }}>
        <Flex justify="space-between" align="center">
          <Title order={2} mb="lg">
            Listado de {categoryName}
          </Title>

          <Tooltip label="Agregar un nuevo conjunto" position="left">
            <Button variant="default" onClick={openNewProduct}>
              <RiAddLargeLine />
            </Button>
          </Tooltip>
        </Flex>

        {/* Search Bar */}
        <TextInput
          placeholder="Buscar productos..."
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
          mb="lg"
          radius="md"
          size="md"
        />

        {(loadingProducts || loadingCategories) && <ProductsLoading />}

        {(errorProducts || errorCategories) && (
          <Text color="red" ta="center" p={20}>
            Hubo un error al cargar los productos, por favor recargue la página.
          </Text>
        )}

        {/* Products Grid */}
        {filteredProducts && filteredProducts.length > 0 ? (
          <ProductsGrid
            filteredProducts={filteredProducts.filter((product) =>
              product.name.toLowerCase().includes(searchTerm.toLowerCase())
            )}
            onSuccess={() => {
              refetchProducts();
              refetchCategories();
            }}
          ></ProductsGrid>
        ) : (
          <NotFound
            text={`No se encontraron coincidencias para "${searchTerm}"`}
          />
        )}
      </div>

      <NewProductModal
        opened={openedNewProductModal}
        close={closeNewProduct}
        onSuccess={() => {
          refetchProducts();
          refetchCategories();
        }}
      />
    </>
  );
};
