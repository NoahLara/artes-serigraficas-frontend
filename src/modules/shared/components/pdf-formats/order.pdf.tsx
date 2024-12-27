import React from "react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";

// Define styles for the PDF
const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontSize: 10,
    fontFamily: "Helvetica",
  },
  header: {
    fontSize: 10,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  sectionTitle: {
    fontSize: 10,
    fontWeight: "bold",
    marginBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#000",
    borderBottomStyle: "solid",
  },
  section: {
    marginBottom: 20,
  },
  text: {
    marginBottom: 4,
  },
  table: {
    display: "flex",
    width: "100%",
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#000",
    marginTop: 10,
  },
  tableRow: {
    flexDirection: "row",
  },
  tableHeader: {
    backgroundColor: "#f0f0f0",
    fontWeight: "bold",
  },
  tableCell: {
    borderWidth: 1,
    borderColor: "#000",
    padding: 5,
    flex: 1,
    textAlign: "center",
  },
});

// Define PDF content
const OrderPDF = ({
  customerName,
  orderDate,
  detailOrder,
  formattedValues,
  selectedProduct,
}) => {
  // Filter products with quantity > 0
  const filterProductsByQuantity = (sizes) =>
    sizes.filter((size) => size.quantity > 0);

  const filteredDetailOrder = {
    Hombre: filterProductsByQuantity(detailOrder.Hombre),
    Mujer: filterProductsByQuantity(detailOrder.Mujer),
    Niño: filterProductsByQuantity(detailOrder.Niño),
  };

  return (
    <Document>
      <Page size="LETTER" style={styles.page}>
        {/* Header */}
        <Text style={styles.header}>Orden de Pedido</Text>

        {/* Customer Information */}
        <View style={styles.section}>
          <Image src={selectedProduct.image} style={{height:100}}/>
          <Text style={styles.sectionTitle}>Información del Cliente</Text>
          <Text style={styles.text}>Nombre: {customerName}</Text>
          <Text style={styles.text}>Fecha del Pedido: {orderDate}</Text>
        </View>

        {/* Product Information */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Detalles del Producto</Text>
          <Text style={styles.text}>
            Producto Seleccionado: {selectedProduct?.name}
          </Text>
          <Text style={styles.text}>SKU: {selectedProduct?.SKU}</Text>
        </View>

        {/* Order Details Table */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Detalles del Pedido</Text>
          <View style={styles.table}>
            {/* Table Header */}
            <View style={[styles.tableRow, styles.tableHeader]}>
              <Text style={styles.tableCell}>Categoría</Text>
              <Text style={styles.tableCell}>Tamaño</Text>
              <Text style={styles.tableCell}>Cantidad</Text>
            </View>

            {/* Table Rows */}
            {Object.entries(filteredDetailOrder).map(([category, sizes]) =>
              sizes.map((size, index) => (
                <View style={styles.tableRow} key={`${category}-${index}`}>
                  <Text style={styles.tableCell}>{category}</Text>
                  <Text style={styles.tableCell}>{size.name}</Text>
                  <Text style={styles.tableCell}>{size.quantity}</Text>
                </View>
              ))
            )}
          </View>
        </View>

        {/* Payment Information */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Información del Pago</Text>
          <Text style={styles.text}>
            Anticipo: ${formattedValues.advancePayment.toFixed(2)} (
            {formattedValues.advancePaymentMethod})
          </Text>
          <Text style={styles.text}>
            Pago Restante: ${formattedValues.restPayment.toFixed(2)} (
            {formattedValues.restPaymentMethod})
          </Text>
        </View>

        {/* Delivery Information */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Detalles de Entrega</Text>
          <Text style={styles.text}>
            Método de Entrega: {formattedValues.deliveryMethod}
          </Text>
          <Text style={styles.text}>
            Punto de Reunión: {formattedValues.meetingPoint}
          </Text>
          <Text style={styles.text}>
            Fecha de Entrega: {formattedValues.deliveryDate}
          </Text>
          <Text style={styles.text}>
            Nota Final: {formattedValues.finalNote || "Sin notas adicionales"}
          </Text>
        </View>
      </Page>
    </Document>
  );
};

export default OrderPDF;
