import React from "react";
import { Document, Page, Text, View, Image } from "@react-pdf/renderer";
import { invoiceStyle } from "./invoice-conjunto.pdf.styles";
import { logoBase64 } from "./logo.base64";
import dayjs from "dayjs";
import { DetailConjuntoOrderInterface } from "../../../../../orders/conjunto/components/detail-conjunto-order.interface";
import { Customer } from "../../../../core/interfaces";

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

export const InvoiceConjuntoPDF: React.FC<{
  detailOrder: DetailConjuntoOrderInterface[];
  paymentInAdvance: number;
  customer: Customer;
}> = ({ detailOrder, paymentInAdvance, customer }) => {
  const companyDetails = {
    name: "ARTES SERIGRAFICAS",
    description: "Fabricacion de Producto Textiles y Publicitarios",
    city: "San Martin, San Salvador Este, El Salvador",
    date: dayjs(new Date()).format("dddd DD MMMM YYYY hh:mm A"),
    phone: "7743-7294",
    invoiceID: generateRandomID(),
  };

  // Total amount for all products (excluding IVA)
  const totalAmount =
    detailOrder.reduce((total, detail) => {
      return (
        total +
        detail.detail.reduce((subTotal, size) => {
          return subTotal + size.quantity * detail.product.wholeSalePrice;
        }, 0)
      );
    }, 0) / 100;

  // Calculate IVA (13%) if applicable
  const iva = customer.applyIVA ? totalAmount * 0.13 : 0;

  // Calculate the final amount including IVA
  const totalWithIva = totalAmount + iva;

  // Pending amount after subtracting the payment in advance
  const pendingAmount = totalWithIva - paymentInAdvance;

  // Calculate total quantity
  const totalQuantity = detailOrder.reduce((totalQty, detail) => {
    return totalQty + detail.detail.reduce((qty, size) => qty + size.quantity, 0);
  }, 0);

  return (
    <Document>
      <Page size="LETTER" style={invoiceStyle.page}>
        <View style={invoiceStyle.border}>
          {/* Header */}
          <View style={invoiceStyle.headerTable}>
            {/* Company Information Row */}
            <View style={invoiceStyle.headerRow}>
              <View style={invoiceStyle.logoTitleContainer}>
                <Image src={logoBase64.toString()} style={invoiceStyle.logo} />
                <View>
                  <Text style={invoiceStyle.titleName}>{companyDetails.name}</Text>
                  <Text style={invoiceStyle.textInfoCompany}>{companyDetails.description}</Text>
                  <Text style={invoiceStyle.textInfoCompany}>{companyDetails.city}</Text>
                  <Text style={invoiceStyle.textInfoCompany}>{companyDetails.phone}</Text>
                </View>
              </View>
              <View style={invoiceStyle.invoiceIDContainer}>
                <Text style={invoiceStyle.textInfoCompany}>No Factura: {companyDetails.invoiceID}</Text>
                <Text style={invoiceStyle.textInfoCompany}>Fecha: {companyDetails.date}</Text>
              </View>
            </View>

            {/* Customer Information */}
            <View style={invoiceStyle.customerInfoRow}>
              <Text style={invoiceStyle.textInfoCompany}>
                Cliente: {customer.customerName} | Teléfono: {customer.customerPhone}
              </Text>
            </View>
          </View>

          {/* Table of products */}
          <View style={invoiceStyle.table}>
            <View style={invoiceStyle.tableRowHeader}>
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
                <Text style={invoiceStyle.tableCell}>${(itemOrder.product.wholeSalePrice / 100).toFixed(2)}</Text>
                <Text style={invoiceStyle.tableCell}>
                  ${itemOrder.detail.reduce((subTotal, det) => subTotal + (itemOrder.product.wholeSalePrice * det.quantity) / 100, 0).toFixed(2)}
                </Text>
              </View>
            ))}
            <View style={invoiceStyle.tableRow}>
              <Text style={invoiceStyle.tableCellDescription}></Text>
              <Text style={invoiceStyle.tableCell}></Text>
              <Text style={invoiceStyle.tableCell}></Text>
              <Text style={invoiceStyle.tableCell}></Text>
              <Text style={invoiceStyle.tableCell}></Text>
            </View>
            {/* Total Quantity, SubTotal Amount, and IVA Calculation */}
            <View style={invoiceStyle.tableRowTotals}>
              <Text style={invoiceStyle.tableCellDescription}></Text>
              <Text style={invoiceStyle.tableCell}></Text>
              <Text style={invoiceStyle.tableCell}>{totalQuantity}</Text>
              <Text style={invoiceStyle.tableCell}>Sub-Total:</Text>
              <Text style={invoiceStyle.tableCell}>${totalAmount.toFixed(2)}</Text>
            </View>

            {/* IVA Row */}
            <View style={invoiceStyle.tableRowTotals}>
              <Text style={invoiceStyle.tableCellDescription}></Text>
              <Text style={invoiceStyle.tableCell}></Text>
              <Text style={invoiceStyle.tableCell}></Text>
              <Text style={invoiceStyle.tableCell}>IVA 13%:</Text>
              <Text style={invoiceStyle.tableCell}>{customer.applyIVA ? `$${iva.toFixed(2)}` : "N/A"}</Text>
            </View>

            {/* TOTAL Row */}
            <View style={invoiceStyle.tableRowTotals}>
              <Text style={invoiceStyle.tableCellDescription}></Text>
              <Text style={invoiceStyle.tableCell}></Text>
              <Text style={invoiceStyle.tableCell}></Text>
              <Text style={invoiceStyle.tableCell}>TOTAL:</Text>
              <Text style={invoiceStyle.tableCell}>${customer.applyIVA ? totalWithIva.toFixed(2) : totalAmount.toFixed(2)}</Text>
            </View>

            {/* Payment in advance */}
            <View style={invoiceStyle.tableRowTotals}>
              <Text style={invoiceStyle.tableCellDescription}></Text>
              <Text style={invoiceStyle.tableCell}></Text>
              <Text style={invoiceStyle.tableCell}></Text>
              <Text style={invoiceStyle.tableCell}>Anticipo</Text>
              <Text style={invoiceStyle.tableCell}>${paymentInAdvance.toFixed(2)}</Text>
            </View>

            {/* Pending amount */}
            <View style={invoiceStyle.tableRowTotals}>
              <Text style={invoiceStyle.tableCellDescription}></Text>
              <Text style={invoiceStyle.tableCell}></Text>
              <Text style={invoiceStyle.tableCell}></Text>
              <Text style={invoiceStyle.tableCell}>Restante a Pagar:</Text>
              <Text style={invoiceStyle.tableCellTOTALRESTANTE}>${pendingAmount.toFixed(2)}</Text>
            </View>
          </View>

          {/* Footer */}
          <View style={invoiceStyle.footer}>
            <Text style={invoiceStyle.footerText}>Gracias por su compra.</Text>
            <Text style={invoiceStyle.footerText}>
              "No temas, porque yo estoy contigo; no desmayes, porque yo soy tu Dios que te esfuerzo; siempre te ayudaré, siempre te sustentaré con la diestra
              de mi justicia." - Isaías 41:10
            </Text>
          </View>
        </View>
      </Page>
    </Document>
  );
};
