import { Page, Text, View, Document, Image } from "@react-pdf/renderer";
import { OrderPDFProps } from "./order.interfaces";
import { orderStyles } from "./order.pdf.styles";
import { ProductSize } from "../../../core/interfaces/product-size.interface";

// Define PDF content
export const OrderPDF: React.FC<OrderPDFProps> = ({
  orderInformation,
  detailOrder,
  product,
}) => {
  // Filter products with quantity > 0
  const filterProductsByQuantity = (sizes: ProductSize[]) =>
    sizes.filter((size) => size.quantity > 0);

  const filteredDetailOrder = {
    Hombre: filterProductsByQuantity(detailOrder.Hombre),
    Mujer: filterProductsByQuantity(detailOrder.Mujer),
    Niño: filterProductsByQuantity(detailOrder.Niño),
  };

  return (
    <Document>
      <Page size="LETTER" style={orderStyles.page}>
        {/* Header */}
        <Text style={orderStyles.header}>PEDIDO DISEÑO PERSONALIZADO</Text>

        {/* Product Information*/}
        <View style={orderStyles.product_information}>
          <View style={orderStyles.image_container}>
            <Image
              src={product.image?.toString()}
              style={orderStyles.product_image}
            />
          </View>
          <View style={orderStyles.info_container}>
            <Text style={orderStyles.text}>
              <Text style={orderStyles.text_bold}>SKU:</Text> {product?.SKU}
            </Text>
            <Text style={orderStyles.text}>
              <Text style={orderStyles.text_bold}>Producto:</Text>{" "}
              {product?.name}
            </Text>
            <Text style={orderStyles.text}>
              <Text style={orderStyles.text_bold}>Descripción:</Text>{" "}
              {product?.description}
            </Text>
          </View>
        </View>

        {/* Order Details */}
        <View style={orderStyles.product_information}>
          <View style={orderStyles.info_container}>
            <Text style={orderStyles.text}>
              <Text style={orderStyles.text_bold}>Cuello:</Text>{" "}
              {orderInformation?.neckType}
            </Text>
            <Text style={orderStyles.text}>
              <Text style={orderStyles.text_bold}>Proporcion:</Text>{" "}
              {orderInformation.sizeAndFit}
            </Text>
            <Text style={orderStyles.text}>
              <Text style={orderStyles.text_bold}>Tela:</Text>{" "}
              {orderInformation.fabric}
            </Text>
            <Text style={orderStyles.text}>
              <Text style={orderStyles.text_bold}>Gramaje:</Text>{" "}
              {orderInformation.fabricThickness}
            </Text>
            <Text style={orderStyles.text}>
              <Text style={orderStyles.text_bold}>Manga:</Text>{" "}
              {orderInformation.sleeveType}
            </Text>
            <Text style={orderStyles.text}>
              <Text style={orderStyles.text_bold}>Técnica:</Text>{" "}
              {orderInformation.customizationTechniques}
            </Text>
            <Text style={orderStyles.text}>
              <Text style={orderStyles.text_bold}>Estampar:</Text>{" "}
              {orderInformation.customizationLocations.join(", ")}
            </Text>
            <Text style={orderStyles.text}>
              <Text style={orderStyles.text_bold}>Color:</Text>{" "}
              {orderInformation.color}
            </Text>
            <Text style={orderStyles.text}>
              <Text style={orderStyles.text_bold}>Propiedades Especiales:</Text>{" "}
              {orderInformation.specialProperties.join(", ")}
            </Text>
          </View>
        </View>

        {/* 
        <View style={orderStyles.section}>
          <Text style={orderStyles.sectionTitle}>Detalles del Pedido</Text>
          <View style={orderStyles.table}>
            <View style={[orderStyles.tableRow, orderStyles.tableHeader]}>
              <Text style={orderStyles.tableCell}>Categoría</Text>
              <Text style={orderStyles.tableCell}>Tamaño</Text>
              <Text style={orderStyles.tableCell}>Cantidad</Text>
            </View>

            {Object.entries(filteredDetailOrder).map(([category, sizes]) =>
              sizes.map((size, index) => (
                <View style={orderStyles.tableRow} key={`${category}-${index}`}>
                  <Text style={orderStyles.tableCell}>{category}</Text>
                  <Text style={orderStyles.tableCell}>{size.name}</Text>
                  <Text style={orderStyles.tableCell}>{size.quantity}</Text>
                </View>
              ))
            )}
          </View>
        </View>

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
