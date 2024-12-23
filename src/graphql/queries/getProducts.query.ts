import { gql } from "@apollo/client";

export const GET_PRODUCTS = gql`
  query GetProducts {
    products {
      productId
      name
      retailPrice
      wholeSalePrice
      SKU
      image
      description
      categoryId
      createdAt
      updatedAt
    }
  }
`;
