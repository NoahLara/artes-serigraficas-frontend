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
    width: "25%",
    height: "25%",
    marginBottom: 15,
    padding: 10,
    textAlign: "justify",
    border: "1px solid #ddd",
    boxSizing: "border-box",
  },
  productImage: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    marginBottom: 1,
  },
  productDetails: {
    fontSize: 5,
    marginTop: 2,
  },
  noteStyles: {
    fontSize: 5,
    marginTop: 2,
  },
  flexProductsDetails: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 3,
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
          if (index < 16) {
            // Ensure only 16 products per page
            return (
              <View key={order.product.productId} style={styles.gridCell}>
                <View style={styles.productImage}>
                  <Image src={order.product.image?.toString()} style={styles.productImage} />
                </View>
                <View style={styles.productDetails}>
                  <View style={styles.flexProductsDetails}>
                    <Text>Tallas: </Text>
                    {order.detail.map((sizeDetail, idx) => (
                      <Text key={idx}>{`${sizeDetail.name}: ${sizeDetail.quantity}`} </Text>
                    ))}
                  </View>
                </View>
                <View style={styles.noteStyles}>
                  <Text>Nota: {order.note}</Text>
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
