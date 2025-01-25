import { gql } from "@apollo/client";

export const CREATE_PRODUCT = gql`
  mutation CreateProduct($input: CreateProductInput!) {
    createProduct(createProductInput: $input) {
      name
      retailPrice
      wholeSalePrice
      SKU
      image
      description
      categoryId
    }
  }
`;
