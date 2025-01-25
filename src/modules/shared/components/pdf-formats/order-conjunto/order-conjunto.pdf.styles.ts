import { StyleSheet } from "@react-pdf/renderer";

// Styles for the PDF document
export const stylesSheet = StyleSheet.create({
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
    width: "33%",
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

export const orderStyles = StyleSheet.create({
  page: {
    padding: 50,
    fontSize: 12,
    fontFamily: "Helvetica",
  },
  text: {
    marginBottom: 4,
  },
  column: {
    flex: 1,
    paddingHorizontal: 10,
  },
  text_bold: {
    fontWeight: 800,
  },

  header: {
    fontWeight: 800,
    marginBottom: 20,
    textAlign: "center",
    textTransform: "uppercase",
  },

  product_information: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    borderBottom: "1px solid #000",
  },

  image_container: {
    flexGrow: 0,
  },
  product_image: {
    width: "150px",
    height: "125px",
  },

  info_container: {
    flexGrow: 1,
  },

  table: {
    fontSize: "8px",
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
