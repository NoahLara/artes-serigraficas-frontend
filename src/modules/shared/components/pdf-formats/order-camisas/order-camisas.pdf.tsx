import { Page, Text, View, Document, Image } from "@react-pdf/renderer";
import { OrderConjuntoPDFProps } from "./order-camisas.interfaces";
import { orderStyles } from "./order-camisas.pdf.styles";
import { ProductDetail } from "../../../core/interfaces/product-size.interface";

const Detail = ({ label, value }: { label: string; value: string | number | string[] }) => (
  <Text style={orderStyles.text}>
    <Text style={orderStyles.text_bold}>{label}:</Text> {value}
  </Text>
);

// Define PDF content
export const OrderPDF: React.FC<OrderConjuntoPDFProps> = ({ orderInformation, detailOrder, product }) => {
  // Filter products with quantity > 0
  const filterProductsByQuantity = (sizes: ProductDetail[]) => sizes.filter((size) => size.quantity > 0);

  const filteredDetailOrder = {
    Hombre: filterProductsByQuantity(detailOrder.Hombre),
    Mujer: filterProductsByQuantity(detailOrder.Mujer),
    Niño: filterProductsByQuantity(detailOrder.Niño),
  };

  console.log(orderInformation);

  return (
    <Document>
      <Page size="LETTER" style={orderStyles.page}>
        {/* Header */}
        <Text style={orderStyles.header}>PEDIDO DISEÑO PERSONALIZADO</Text>

        {/* Product Information*/}
        <View style={orderStyles.product_information}>
          <View style={orderStyles.info_container}>
            <Detail label="SKU" value={product?.SKU} />
            <Detail label="Producto" value={product?.name} />
            {/* <Detail label="Cuello" value={orderInformation?.neckType} />
            <Detail label="Proporción" value={orderInformation.sizeAndFit} />
            <Detail label="Tela" value={orderInformation.fabric} />
            <Detail label="Gramaje" value={orderInformation.fabricThickness} />
            <Detail label="Manga" value={orderInformation.sleeveType} />
            <Detail label="Técnica" value={orderInformation.customizationTechniques} />
            <Detail label="Estampar" value={orderInformation.customizationLocations.join(", ")} />
            <Detail label="Color" value={orderInformation.color} />
            <Detail label="Propiedades Especiales" value={orderInformation.specialProperties.join(", ")} /> */}
            <Detail label="Descripción" value={product?.description} />
          </View>
          <View style={orderStyles.image_container}>
            <Image src={product.image?.toString()} style={orderStyles.product_image} />
          </View>
        </View>

        <View>
          <Text>Detalles del Pedido</Text>
          <View style={orderStyles.table}>
            <View style={[orderStyles.tableRow, orderStyles.tableHeader]}>
              <Text style={orderStyles.tableCell}>Categoría</Text>
              <Text style={orderStyles.tableCell}>Tamaño</Text>
              <Text style={orderStyles.tableCell}>Cantidad</Text>
              <Text style={orderStyles.tableCell}>Corte</Text>
              <Text style={orderStyles.tableCell}>Confeccion</Text>
              <Text style={orderStyles.tableCell}>Estampado</Text>
              <Text style={orderStyles.tableCell}>Empacado</Text>
            </View>

            {Object.entries(filteredDetailOrder).map(([category, sizes]) =>
              sizes.map((size, index) => (
                <View style={orderStyles.tableRow} key={`${category}-${index}`}>
                  <Text style={orderStyles.tableCell}>{category}</Text>
                  <Text style={orderStyles.tableCell}>{size.name}</Text>
                  <Text style={orderStyles.tableCell}>{size.quantity}</Text>
                  <Text style={orderStyles.tableCell}></Text>
                  <Text style={orderStyles.tableCell}></Text>
                  <Text style={orderStyles.tableCell}></Text>
                  <Text style={orderStyles.tableCell}></Text>
                </View>
              ))
            )}
          </View>
        </View>
        {/* 
        <View style={orderStyles.section}>
          <Text style={orderStyles.sectionTitle}>Información del Pago</Text>
          <Text style={orderStyles.text}>
            Anticipo: ${orderInformation.advancePayment.toFixed(2)} (
            {orderInformation.advancePaymentMethod})
          </Text>
          <Text style={orderStyles.text}>
            Pago Restante: ${orderInformation.restPayment.toFixed(2)} (
            {orderInformation.restPaymentMethod})
          </Text>
        </View>

        <View style={orderStyles.section}>
          <Text style={orderStyles.sectionTitle}>Detalles de Entrega</Text>
          <Text style={orderStyles.text}>
            Método de Entrega: {orderInformation.deliveryMethod}
          </Text>
          <Text style={orderStyles.text}>
            Punto de Reunión: {orderInformation.meetingPoint}
          </Text>
          <Text style={orderStyles.text}>
            Fecha de Entrega: {orderInformation.deliveryDate}
          </Text>
          <Text style={orderStyles.text}>
            Nota Final: {orderInformation.finalNote || "Sin notas adicionales"}
          </Text>
        </View> */}
      </Page>
    </Document>
  );
};

export default OrderPDF;
