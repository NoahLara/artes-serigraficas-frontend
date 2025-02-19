import { Document, Page, Text, Image, View } from "@react-pdf/renderer";
import { Customer } from "../../../core/interfaces";
import { orderStyles } from "./order-camisa.pdf.styles";
import { DetailCamisaOrderInterface } from "../../../../orders/camisa/components/detail-camisa-order.components.tsx/detail-camisa-order.interface";

interface ProductProps {
  detailOrder: DetailCamisaOrderInterface;
  customer: Customer;
  deliveryDate: Date | string;
}

export const OrderCamisaPDF = ({ detailOrder, customer, deliveryDate }: ProductProps) => {
  return (
    <Document>
      <Page size="LETTER" style={orderStyles.page}>
        {/* Header */}
        <View style={orderStyles.header}>
          <Text>Nombre del Cliente: {customer.customerName}</Text>
        </View>
        <View style={orderStyles.text}>
          <Text>Fecha de Entrega: {deliveryDate.toString()}</Text>
        </View>

        {/* Product Details */}
        <View style={orderStyles.product_information}>
          {/* Image or Placeholder */}
          <View style={orderStyles.image_container}>
            {detailOrder.image ? <Image src={detailOrder.image} style={orderStyles.product_image} /> : <Text style={orderStyles.text_bold}>NO IMAGEN</Text>}
          </View>

          {/* Table with Shirt Details */}
          <View style={orderStyles.table}>
            <View style={[orderStyles.tableRow, orderStyles.tableHeader]}>
              <Text style={orderStyles.tableCell}>Talla</Text>
              <Text style={orderStyles.tableCell}>Cantidad</Text>
            </View>
            {detailOrder.shirts.map((shirt, shirtIndex) => (
              <View key={shirtIndex} style={orderStyles.tableRow}>
                <Text style={orderStyles.tableCell}>{shirt.size}</Text>
                <Text style={orderStyles.tableCell}>{shirt.quantity}</Text>
              </View>
            ))}
          </View>
        </View>
      </Page>
    </Document>
  );
};
