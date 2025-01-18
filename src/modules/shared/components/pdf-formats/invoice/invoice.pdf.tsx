import React from "react";
import { Document, Page, Text, View, Image } from "@react-pdf/renderer";
import { invoiceStyle } from "./invoice.pdf.styles";
import { logoBase64 } from "./logo.base64";
import dayjs from "dayjs";
import { DetailConjuntoOrderInterface } from "../../../../orders/conjunto/components/detail-conjunto-order.interface";

// Utility to generate random ID
const generateRandomID = () => {
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const numbers = "0123456789";
  let id = "";
  for (let i = 0; i < 5; i++) {
    if (i % 2 === 0) {
      id += numbers[Math.floor(Math.random() * numbers.length)];
    } else {
      id += letters[Math.floor(Math.random() * letters.length)];
    }
  }
  return id.toUpperCase();
};

export const InvoicePDF: React.FC<{
  detailOrder: DetailConjuntoOrderInterface[];
  paymentInAdvance: number;
}> = ({ detailOrder, paymentInAdvance }) => {
  // Dummy data
  const companyDetails = {
    logo: "../../../../../assets/as-orginal.png", // Replace with your logo URL
    name: "ARTES SERIGRAFICAS",
    description: "Fabricacion de Producto Textiles y Publicitarios",
    city: "San Martin, San Salvador Este, El Salvador",
    date: dayjs(new Date()).format("dddd DD MMMM YYYY hh:mm A"),
    phone: "7743-7294",
  };

  // Calculate totals
  const totalAmount =
    detailOrder.reduce((total, detail) => {
      return (
        total +
        detail.detail.reduce((subTotal, size) => {
          return subTotal + size.quantity * size.price;
        }, 0)
      );
    }, 0) / 100; // Convert cents to dollars

  const pendingAmount = totalAmount - paymentInAdvance;

  return (
    <Document>
      <Page size="C5" style={invoiceStyle.page}>
        {/* Header */}
        <View style={invoiceStyle.header}>
          <View>
            <Text style={invoiceStyle.titleName}>{companyDetails.name}</Text>
            <Text style={invoiceStyle.textInfoCompany}>{companyDetails.description}</Text>
            <Text style={invoiceStyle.textInfoCompany}>{companyDetails.city}</Text>
            <Text style={invoiceStyle.textInfoCompany}>{companyDetails.phone}</Text>
          </View>
          <Image src={logoBase64.toString()} style={invoiceStyle.logo} />
        </View>

        <Text style={invoiceStyle.textInfoCompany}>Fecha: {companyDetails.date}</Text>
        <Text style={invoiceStyle.textInfoCompany}>No Factura: {generateRandomID()}</Text>

        {/* Table of products */}
        <View style={invoiceStyle.table}>
          <View style={invoiceStyle.tableRow}>
            <Text style={invoiceStyle.tableCell}>SKU</Text>
            <Text style={invoiceStyle.tableCellDescription}>DETALLE</Text>
            <Text style={invoiceStyle.tableCell}>CANTIDAD</Text>
            <Text style={invoiceStyle.tableCell}>PRECIO</Text>
            <Text style={invoiceStyle.tableCell}>IMPORTE</Text>
          </View>
          {detailOrder.map((itemOrder, index) => (
            <View style={invoiceStyle.tableRow} key={index}>
              <Text style={invoiceStyle.tableCell}>{itemOrder.product.SKU}</Text>
              <Text style={invoiceStyle.tableCellDescription}>{itemOrder.product.name}</Text>
              <Text style={invoiceStyle.tableCell}>{itemOrder.detail.reduce((totalQuantity, det) => totalQuantity + det.quantity, 0)}</Text>
              <Text style={invoiceStyle.tableCell}>
                ${((itemOrder.detail.length > 11 ? itemOrder.product.wholeSalePrice : itemOrder.product.retailPrice) / 100).toFixed(2)}
              </Text>
              <Text style={invoiceStyle.tableCell}>
                ${(itemOrder.detail.reduce((subTotal, det) => subTotal + det.price * det.quantity, 0) / 100).toFixed(2)}
              </Text>
            </View>
          ))}

          {/* {detailOrder.map((detail) =>
            detail.detail.map((size, index) => (
              <View style={invoiceStyle.tableRow} key={index}>
                <Text style={invoiceStyle.tableCellDescription}>{detail.product.name}</Text>
                <Text style={invoiceStyle.tableCell}>{size.name}</Text>
                <Text style={invoiceStyle.tableCell}>{size.quantity}</Text>
                <Text style={invoiceStyle.tableCell}>${(size.price / 100).toFixed(2)}</Text>
                <Text style={invoiceStyle.tableCell}>${((size.price * size.quantity) / 100).toFixed(2)}</Text>
              </View>
            ))
          )} */}

          {/* Total Row */}
          <View style={invoiceStyle.tableRow}>
            <Text style={invoiceStyle.tableCellDescription}></Text>
            <Text style={invoiceStyle.tableCell}></Text>
            <Text style={invoiceStyle.tableCell}></Text>
            <Text style={invoiceStyle.tableCell}>Total</Text>
            <Text style={invoiceStyle.tableCell}>${totalAmount.toFixed(2)}</Text>
          </View>

          {/* Payment in Advance Row */}
          <View style={invoiceStyle.tableRow}>
            <Text style={invoiceStyle.tableCellDescription}></Text>
            <Text style={invoiceStyle.tableCell}></Text>
            <Text style={invoiceStyle.tableCell}></Text>
            <Text style={invoiceStyle.tableCell}>Anticipo</Text>
            <Text style={invoiceStyle.tableCell}>${paymentInAdvance.toFixed(2)}</Text>
          </View>

          {/* Pending Amount Row */}
          <View style={invoiceStyle.tableRow}>
            <Text style={invoiceStyle.tableCellDescription}></Text>
            <Text style={invoiceStyle.tableCell}></Text>
            <Text style={invoiceStyle.tableCell}></Text>
            <Text style={invoiceStyle.tableCell}>Resta</Text>
            <Text style={invoiceStyle.tableCell}>${pendingAmount.toFixed(2)}</Text>
          </View>
        </View>

        {/* Footer */}
        <View style={invoiceStyle.footer}>
          <Text style={invoiceStyle.textInfoCompany}>Gracias por su compra.</Text>
          <Text style={invoiceStyle.textInfoCompany}>Anticipo: ${paymentInAdvance.toFixed(2)}</Text>
          <Text style={invoiceStyle.textInfoCompany}>Pendiente por pagar: ${pendingAmount.toFixed(2)}</Text>
        </View>
      </Page>
    </Document>
  );
};
