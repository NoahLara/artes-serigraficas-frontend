import { gql } from "@apollo/client";

export const UPDATE_PRODUCT = gql`
  mutation UpdateProduct(
    $id: String!
    $updateProductInput: UpdateProductInput!
  ) {
    updateProduct(id: $id, updateProductInput: $updateProductInput) {
      productId
      name
      retailPrice
      wholeSalePrice
      SKU
      image
      description
      categoryId
      updatedAt
    }
  }
`;
