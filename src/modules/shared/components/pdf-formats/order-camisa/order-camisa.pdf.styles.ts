import { StyleSheet } from "@react-pdf/renderer";

// Styles for the PDF document
export const stylesSheet = StyleSheet.create({
  page: {
    padding: 50,
    fontSize: 12,
    fontFamily: "Helvetica",
    backgroundColor: "#f9f9f9",
  },
  header: {
    fontWeight: 800,
    marginBottom: 20,
    textAlign: "center",
    fontSize: 14,
    color: "#333",
  },
  text: {
    marginBottom: 4,
    fontSize: 10,
  },
  text_bold: {
    fontWeight: "bold",
    fontSize: 10,
  },
  product_information: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    borderBottom: "1px solid #000",
    paddingBottom: 10,
    marginBottom: 10,
  },
  image_container: {
    width: "40%",
    textAlign: "center",
  },
  product_image: {
    width: "100%",
    height: "auto",
    objectFit: "contain",
    borderRadius: 5,
  },
  table: {
    fontSize: "10px",
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
  detailContainer: {
    paddingTop: 10,
  },
  title: {
    fontSize: 12,
    fontWeight: "bold",
    marginBottom: 5,
    textDecoration: "underline",
  },
});
