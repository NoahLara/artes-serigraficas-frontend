import React from "react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  //   PDFDownloadLink,
} from "@react-pdf/renderer";

// Define styles
const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontSize: 12,
  },
  section: {
    marginBottom: 10,
  },
  header: {
    fontSize: 18,
    marginBottom: 10,
    fontWeight: "bold",
  },
  table: {
    display: "flex",
    width: "auto",
    marginTop: 10,
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#000",
  },
  row: {
    flexDirection: "row",
  },
  cell: {
    borderWidth: 1,
    borderColor: "#000",
    padding: 5,
    flexGrow: 1,
  },
});

// Define PDF content
const OrderPDF: React.FC = () => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Text style={styles.header}>Invoice</Text>
        <View style={styles.section}>
          <Text>Customer: John Doe</Text>
          <Text>Date: 2024-12-24</Text>
        </View>
        <View style={styles.table}>
          <View style={styles.row}>
            <Text style={styles.cell}>Item</Text>
            <Text style={styles.cell}>Quantity</Text>
            <Text style={styles.cell}>Price</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.cell}>Product A</Text>
            <Text style={styles.cell}>2</Text>
            <Text style={styles.cell}>$30</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.cell}>Product B</Text>
            <Text style={styles.cell}>1</Text>
            <Text style={styles.cell}>$20</Text>
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default OrderPDF;
