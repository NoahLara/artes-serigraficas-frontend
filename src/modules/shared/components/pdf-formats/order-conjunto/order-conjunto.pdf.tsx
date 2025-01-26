import { Document, Page, Text, Image, View } from "@react-pdf/renderer";
import { DetailConjuntoOrderInterface } from "../../../../orders/conjunto/components/detail-conjunto-order.interface";
import { Customer } from "../../../core/interfaces";
import { stylesSheet } from "./order-conjunto.pdf.styles";

// Utility to chunk an array into smaller arrays of a given size
const chunkArray = <T,>(array: T[], chunkSize: number): T[][] => {
  const chunks: T[][] = [];
  for (let i = 0; i < array.length; i += chunkSize) {
    chunks.push(array.slice(i, i + chunkSize));
  }
  return chunks;
};

interface ProductProps {
  detailOrder: DetailConjuntoOrderInterface[];
  customer: Customer;
  deliveryDate: Date | string;
}

export const OrderConjuntoPDF = ({ detailOrder, customer, deliveryDate }: ProductProps) => {
  const pages = chunkArray(detailOrder, 12); // Chunk into pages of 12 products

  return (
    <Document>
      {pages.map((page, pageIndex) => (
        <Page size="LETTER" style={stylesSheet.page} key={pageIndex}>
          {/* Header */}
          <View style={stylesSheet.title}>
            <Text>Nombre del Cliente: {customer.customerName}</Text>
          </View>
          <View style={stylesSheet.title}>
            <Text>Fecha de Entrega: {deliveryDate.toString()}</Text>
          </View>

          {/* Product Details */}
          <View style={stylesSheet.detailContainer}>
            {page.map((order) => (
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
            ))}
          </View>
        </Page>
      ))}
    </Document>
  );
};
