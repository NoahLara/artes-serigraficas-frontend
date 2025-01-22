import { StyleSheet } from "@react-pdf/renderer";

export const invoiceStyle = StyleSheet.create({
  page: {
    padding: 30,
    fontSize: 12,
  },
  border: {
    border: "1px solid black",
    padding: 20,
    borderRadius: 2,
  },
  headerTable: {
    display: "flex",
    flexDirection: "column",
    marginBottom: 5,
    border: "1px solid black",
    borderRadius: 2,
  },
  headerRow: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    padding: 5,
  },
  logoTitleContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 10,
  },
  logo: {
    width: 60,
    height: 60,
    objectFit: "contain",
  },
  titleName: {
    fontSize: 14,
    fontWeight: "bold",
  },
  textInfoCompany: {
    fontSize: 10,
    marginBottom: 4,
  },
  invoiceIDContainer: {
    textAlign: "right",
    backgroundColor: "#bdd7ee",
    padding: 8,
    border: "2px solid black",
    borderRadius: 2,
  },

  table: {
    fontSize: 8,
    width: "100%",
    borderTop: "1px solid black",
    borderBottom: "1px solid black",
    marginBottom: 2,
  },
  tableRowHeader: {
    fontSize: 9,
    fontWeight: "heavy",
    backgroundColor: "#bdd7ee",
    display: "flex",
    flexDirection: "row",
    borderRight: "1px solid black",
    borderLeft: "1px solid black",
    borderBottom: "1px solid black",
    paddingVertical: 4,
  },
  tableRow: {
    display: "flex",
    flexDirection: "row",
    borderRight: "1px solid black",
    borderLeft: "1px solid black",
    borderBottom: "1px solid black",
    paddingVertical: 4,
  },
  tableCell: {
    flex: 1,
    textAlign: "center",
  },
  tableCellDescription: {
    flex: 2,
    textAlign: "left",
  },
  footer: {
    marginTop: 20,
    textAlign: "center",
  },
  footerText: {
    fontSize: 6,
    fontStyle: "italic",
  },
});
