import { StyleSheet } from "@react-pdf/renderer";

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
