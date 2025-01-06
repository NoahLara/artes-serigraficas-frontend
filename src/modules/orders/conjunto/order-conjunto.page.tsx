import { useState } from "react";
import {
  //   TextInput,
  //   NumberInput,
  //   Button,
  //   Select,
  // Alert,
  // Flex,
  Text,
  Stack,
  //   Textarea,
  //   Radio,
  //   Group,
  //   Grid,
  //   Divider,
  //   Flex,
  //   Checkbox,
} from "@mantine/core";
import { useForm } from "@mantine/form";
// import { DateTimePicker } from "@mantine/dates";
import dayjs from "dayjs";
// import { BsGeo, BsShop } from "react-icons/bs";
// import { FaTruckFast } from "react-icons/fa6";
// import { Product, ProductByPerson } from "../../shared/core/interfaces";
// import { PDFDownloadLink } from "@react-pdf/renderer";
import { OrderConjuntoInterface } from "./order-conjunto.interface";
// import { DetailOrder } from "../camisa/components/detail-order/detail-order.component";
// import OrderPDF from "../../shared/components/pdf-formats/order-conjunto/order-conjunto.pdf";
import { DetailConjuntoOrderInterface } from "./components/detail-conjunto-order.interface";
import { DetailOrderConjunto } from "./components/detail-conjunto-order.component";

export const OrderConjunto = () => {
  const form = useForm<OrderConjuntoInterface>({
    initialValues: {
      date: "",
      madeDate: new Date(),
      orderSource: "",
      note: "",
      customer: {
        customerName: "",
        customerPhone: "",
        customerEmail: "",
      },
      payment: {
        advancePayment: 0.0,
        advancePaymentMethod: "",
        restPayment: 0.0,
        restPaymentMethod: "",
      },
      delivery: {
        deliveryMethod: "",
        meetingPoint: "",
      },
    },

    validate: {
      date: (value) => (!value ? "La fecha de entrega es obligatoria" : null),
      madeDate: (value) => (!value ? "La fecha de creación es obligatoria" : null),
      orderSource: (value) => (value.trim().length === 0 ? "El origen del pedido es obligatorio" : null),

      customer: {
        customerName: (value) => (value.trim().length === 0 ? "El nombre del cliente es obligatorio" : null),
        customerPhone: (value) => (value.trim().length === 0 ? "El número de teléfono es obligatorio" : null),
      },

      payment: {
        advancePayment: (value) => (value < 0 ? "El pago adelantado no puede ser negativo" : null),
        advancePaymentMethod: (value) => (value.trim().length === 0 ? "El método de pago es obligatorio" : null),
        restPayment: (value) => (value < 0 ? "El pago restante no puede ser negativo" : null),
        restPaymentMethod: (value) => (value.trim().length === 0 ? "El método de pago es obligatorio" : null),
      },

      delivery: {
        deliveryMethod: (value) => (value.trim().length === 0 ? "El método de entrega es obligatorio" : null),

        meetingPoint: (value, values) => {
          if (values.delivery.deliveryMethod === "Punto" && (!value || value.trim().length === 0)) {
            return "El punto de encuentro es obligatorio para entregas en Punto";
          }
          return null;
        },
      },
    },
  });

  const [detailOrder, setDetailOrder] = useState<DetailConjuntoOrderInterface[]>([]);
  //   const [pdfData, setPdfData] = useState<ReactElement | null>(null);

  const handleSubmit = (values: typeof form.values) => {
    // Format `madeDate` correctly
    const formattedValues: OrderConjuntoInterface = {
      ...values,
      madeDate: dayjs(values.madeDate, "dddd DD MMMM YYYY hh:mm A").format("dddd DD MMMM YYYY hh:mm A"),
      date: dayjs(values.date, "dddd DD MMMM YYYY hh:mm A").format("dddd DD MMMM YYYY hh:mm A"),
    };

    // Log the formatted values
    console.log("Order Form Submitted:", formattedValues);

    console.log("Detail Order:", detailOrder);

    // const pdfDocument = <OrderPDF orderInformation={formattedValues} detailOrder={detailOrder} product={selectedProduct} />;

    // Save the PDF document in the state for rendering
    // setPdfData(pdfDocument);
  };

  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      <Stack gap="md">
        {/* ORDER DETAIL*/}
        <Text size="lg" fw={700}>
          Detalle del Pedido
        </Text>

        <DetailOrderConjunto onDetailChange={setDetailOrder} />

        {/* PDF Download Link (only visible after submission) */}
        {/* {pdfData && (
          <PDFDownloadLink document={pdfData} fileName={`order-invoice-${Date.now()}.pdf`}>
            Descargar PDF
          </PDFDownloadLink>
        )} */}
      </Stack>
    </form>
  );
};
