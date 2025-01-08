import React from "react";
import { Document, Page, Text, Image, View, StyleSheet } from "@react-pdf/renderer";
import { DetailConjuntoOrderInterface } from "../../../../orders/conjunto/components/detail-conjunto-order.interface";

// Styles for the PDF document
const styles = StyleSheet.create({
  page: {
    padding: 30,
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    height: "100%",
  },
  gridCell: {
    width: "30%",
    height: "30%",
    marginBottom: 15,
    padding: 10,
    textAlign: "center",
    border: "1px solid #ddd",
    boxSizing: "border-box",
  },
  productImage: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    marginBottom: 10,
  },
  productDetails: {
    fontSize: 10,
    marginTop: 5,
  },
  title: {
    textAlign: "center",
    fontSize: 18,
    marginBottom: 15,
    fontWeight: "bold",
  },
});

interface ProductProps {
  detailOrder: DetailConjuntoOrderInterface[];
}

export const OrderConjuntoPDF = ({ detailOrder }: ProductProps) => {
  return (
    <Document>
      <Page size="LETTER" style={styles.page}>
        {detailOrder.map((order, index) => {
          if (index < 9) {
            // Get the base64 image string directly
            const imageSrc = order.product.image?.toString();
            console.log("Image Source:", imageSrc); // Log the image source for debugging

            // Ensure that the base64 image exists
            if (!imageSrc || imageSrc.trim().length === 0) {
              return (
                <View key={order.product.productId} style={styles.gridCell}>
                  <Text>No Image Available</Text>
                  <View style={styles.productDetails}>
                    {order.detail.map((sizeDetail, idx) => (
                      <Text key={idx}>{`${sizeDetail.name}: ${sizeDetail.quantity}`}</Text>
                    ))}
                  </View>
                </View>
              );
            }

            return (
              <View key={order.product.productId} style={styles.gridCell}>
                {/* Image Rendering */}
                <Image src={imageSrc} style={styles.productImage} />
                <View style={styles.productDetails}>
                  {order.detail.map((sizeDetail, idx) => (
                    <Text key={idx}>{`${sizeDetail.name}: ${sizeDetail.quantity}`}</Text>
                  ))}
                </View>
              </View>
            );
          }
          return null; // Return null for out of range products (if more than 9)
        })}
      </Page>
    </Document>
  );
};
