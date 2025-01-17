import React from "react";
import { Document, Page, Text, Image, View } from "@react-pdf/renderer";
import { DetailConjuntoOrderInterface } from "../../../../orders/conjunto/components/detail-conjunto-order.interface";
import { Customer } from "../../../core/interfaces";
import { stylesSheet } from "./order-conjunto.pdf.styles";

interface ProductProps {
  detailOrder: DetailConjuntoOrderInterface[];
  customer: Customer;
  deliveryDate: Date | string;
}

export const OrderConjuntoPDF = ({ detailOrder, customer, deliveryDate }: ProductProps) => {
  return (
    <Document>
      <Page size="LETTER" style={stylesSheet.page}>
        <View style={stylesSheet.title}>
          <Text>Nombre del Cliente: {customer.customerName}</Text>
        </View>
        <View style={stylesSheet.title}>
          <Text>Fecha de Entrega: {deliveryDate.toString()}</Text>
        </View>
        <View style={stylesSheet.detailContainer}>
          {detailOrder.map((order, index) => {
            if (index < 16) {
              // Ensure only 16 products per page
              return (
                <View key={order.product.productId} style={stylesSheet.gridCell}>
                  <View>
                    <Image src={order.product.image?.toString()} style={stylesSheet.productImage} />
                  </View>
                  <View style={stylesSheet.productDetails}>
                    <View style={stylesSheet.flexProductsDetails}>
                      <Text>Tallas:</Text>
                      {order.detail.map((sizeDetail, idx) => (
                        <Text key={idx}>{`${sizeDetail.name}: ${sizeDetail.quantity}`} </Text>
                      ))}
                    </View>
                  </View>
                  <View style={stylesSheet.noteStyles}>
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
