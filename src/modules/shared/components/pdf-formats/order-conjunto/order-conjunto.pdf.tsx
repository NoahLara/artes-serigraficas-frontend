import React from "react";
import { Document, Page, Text, Image, View, StyleSheet } from "@react-pdf/renderer";
import { DetailConjuntoOrderInterface } from "../../../../orders/conjunto/components/detail-conjunto-order.interface";
import { Customer } from "../../../core/interfaces";

// Styles for the PDF document
const styles = StyleSheet.create({
  page: {
    padding: 30,
    display: "flex",
    flexDirection: "column",
  },
  detailContainer: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "flex-start",
    height: "90%",
  },
  gridCell: {
    width: "25%",
    height: "25%",
    marginBottom: 15,
    textAlign: "justify",
    border: "1px solid #ddd",
    boxSizing: "border-box",
  },
  productImage: {
    width: "100%",
    height: "100%",
    objectFit: "contain",
    marginBottom: 1,
  },
  productDetails: {
    fontSize: 8,
    marginTop: 2,
  },
  noteStyles: {
    fontSize: 8,
    marginTop: 2,
  },
  flexProductsDetails: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 3,
  },
  title: {
    textAlign: "left",
    fontSize: 10,
    fontWeight: "bold",
  },
});

interface ProductProps {
  detailOrder: DetailConjuntoOrderInterface[];
  customer: Customer;
  deliveryDate: Date | string;
}

export const OrderConjuntoPDF = ({ detailOrder, customer, deliveryDate }: ProductProps) => {
  return (
    <Document>
      <Page size="LETTER" style={styles.page}>
        <View style={styles.title}>
          <Text>Nombre del Cliente: {customer.customerName}</Text>
        </View>
        <View style={styles.title}>
          <Text>Fecha de Entrega: {deliveryDate.toString()}</Text>
        </View>
        <View style={styles.detailContainer}>
          {detailOrder.map((order, index) => {
            if (index < 16) {
              // Ensure only 16 products per page
              return (
                <View key={order.product.productId} style={styles.gridCell}>
                  <View>
                    <Image src={order.product.image?.toString()} style={styles.productImage} />
                  </View>
                  <View style={styles.productDetails}>
                    <View style={styles.flexProductsDetails}>
                      <Text>Tallas:</Text>
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
        </View>
      </Page>
    </Document>
  );
};
