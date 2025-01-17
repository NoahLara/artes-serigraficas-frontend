import { StyleSheet } from "@react-pdf/renderer";

export const invoiceStyle = StyleSheet.create({
  page: {
    padding: 20,
  },
  header: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
  },
  logo: {
    width: "70px",
    height: "70px",
  },
  companyInfo: {
    textAlign: "right",
  },
  titleName: {
    fontSize: 14,
  },
  textInfoCompany: {
    fontSize: 10,
  },
  table: {
    width: "100%",
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#000",
    marginTop: 1,
    fontSize: 8,
  },
  tableRow: {
    flexDirection: "row",
    borderBottomStyle: "solid",
    borderBottomWidth: 1,
    borderBottomColor: "#000",
  },
  tableCellDescription: {
    flex: 5,
    padding: 5,
    textAlign: "center",
  },
  tableCell: {
    flex: 1,
    padding: 5,
    textAlign: "center",
  },
  footer: {
    marginTop: 20,
    textAlign: "right",
  },
});
