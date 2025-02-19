import { Document, Page, Text, Image, View } from "@react-pdf/renderer";
import { Customer } from "../../../core/interfaces";
import { DetailCamisaOrderInterface } from "../../../../orders/camisa/components/detail-camisa-order.components.tsx/detail-camisa-order.interface";
import { stylesSheet } from "./order-camisa.pdf.styles";

interface ProductProps {
  detailOrder: DetailCamisaOrderInterface;
  customer: Customer;
  deliveryDate: Date | string;
}

export const OrderCamisaPDF = ({ detailOrder, customer, deliveryDate }: ProductProps) => {
  return (
    <Document>
      <Page size="LETTER" style={stylesSheet.page}>
        {/* Header */}
        <View style={stylesSheet.header}>
          <Text>Pedido de Camisa Personalizada</Text>
          <Text>Nombre del Cliente: {customer.customerName}</Text>
          <Text>Fecha de Entrega: {deliveryDate.toString()}</Text>
        </View>

        {/* Product Details */}
        <View style={stylesSheet.product_information}>
          {/* Image or Placeholder */}
          <View style={stylesSheet.image_container}>
            {detailOrder.image ? <Image src={detailOrder.image} style={stylesSheet.product_image} /> : <Text style={stylesSheet.text_bold}>NO IMAGEN</Text>}
          </View>
        </View>

        {/* Shirt Details */}
        <View style={stylesSheet.table}>
          <View style={[stylesSheet.tableRow, stylesSheet.tableHeader]}>
            <Text style={stylesSheet.tableCell}>Talla</Text>
            <Text style={stylesSheet.tableCell}>Cantidad</Text>
            <Text style={stylesSheet.tableCell}>Corte</Text>
            <Text style={stylesSheet.tableCell}>Confección</Text>
            <Text style={stylesSheet.tableCell}>Estampado</Text>
            <Text style={stylesSheet.tableCell}>Empaque</Text>
          </View>
          {detailOrder.shirts.map((shirt, index) => (
            <View key={index} style={stylesSheet.tableRow}>
              <Text style={stylesSheet.tableCell}>{shirt.size}</Text>
              <Text style={stylesSheet.tableCell}>{shirt.quantity}</Text>
              <Text style={stylesSheet.tableCell}> </Text>
              <Text style={stylesSheet.tableCell}> </Text>
              <Text style={stylesSheet.tableCell}> </Text>
              <Text style={stylesSheet.tableCell}> </Text>
            </View>
          ))}
        </View>

        {/* Additional Order Details */}
        <View style={stylesSheet.detailContainer}>
          <Text style={stylesSheet.title}>Detalles Adicionales:</Text>
          <Text>Tipo de Cuello: {detailOrder.neck}</Text>
          <Text>Tipo de Manga: {detailOrder.sleeve}</Text>
          <Text>Tipo de Tela: {detailOrder.fabric}</Text>
          <Text>Ajuste: {detailOrder.fit}</Text>
          <Text>Peso de Tela: {detailOrder.fabricWeight}g</Text>
          <Text>Técnica de Estampado: {detailOrder.technique}</Text>
          <Text>Ubicaciones de Estampado: {detailOrder.stamping.join(", ")}</Text>
          {detailOrder.note && <Text>Nota: {detailOrder.note}</Text>}
        </View>
      </Page>
    </Document>
  );
};
