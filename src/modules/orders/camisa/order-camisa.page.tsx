import React, { ReactElement, useState } from "react";
import { Title } from "@mantine/core";
import { OrderGeneralDetails } from "../../shared/core/interfaces/order-conjunto.interface";
import { useForm } from "@mantine/form";
import { DocumentProps } from "postcss";
import { useDisclosure } from "@mantine/hooks";
import { DetailCamisaOrderInterface } from "./components/detail-camisa-order.components.tsx/detail-camisa-order.interface";
import DetailCamisaOrderComponent from "./components/detail-camisa-order.components.tsx/detail-camisa-order.component";

export const OrderCamisa: React.FC = () => {
  const form = useForm<OrderGeneralDetails>({
    initialValues: {
      date: new Date(),
      madeDate: new Date(),
      customer: {
        customerName: "",
        customerPhone: "",
        applyIVA: undefined,
      },
      payment: {
        advancePayment: 0.0,
        advancePaymentMethod: "",
        restPayment: 0.0,
        restPaymentMethod: "",
      },
    },

    validate: {
      date: (value) => (!value ? "La fecha de entrega es obligatoria" : null),
      madeDate: (value) => (!value ? "La fecha de creación es obligatoria" : null),
      customer: {
        customerName: (value) => (value.trim().length === 0 ? "El nombre del cliente es obligatorio" : null),
        customerPhone: (value) => (value.trim().length === 0 ? "El número de teléfono es obligatorio" : null),
        applyIVA: (value) => (value === null ? "El IVA es obligatorio" : null),
      },
      payment: {
        advancePayment: (value) => (value < 0 ? "El pago adelantado no puede ser negativo" : null),
        advancePaymentMethod: (value) => (value.trim().length === 0 ? "El método de pago es obligatorio" : null),
        restPayment: (value) => (value < 0 ? "El pago restante no puede ser negativo" : null),
        restPaymentMethod: (value) => (value.trim().length === 0 ? "El método de pago es obligatorio" : null),
      },
    },
  });

  const [detailOrder, setDetailOrder] = useState<DetailCamisaOrderInterface>({});
  const [total, setTotal] = useState<number>(0);
  const [pdfOrderData, setPdfOrderData] = useState<ReactElement<DocumentProps> | null>(null);
  const [pdfInvoiceData, setPdfInvoiceData] = useState<ReactElement<DocumentProps> | null>(null);
  const [openedPDFModal, { open: openPDFModal, close: closePDFModal }] = useDisclosure(false);

  const handleFormChange = (values: DetailCamisaOrderInterface) => {
    console.log("Form updated:", values);
  };
  

  return (
    <>
      <Title order={4}>Pedido de Camisa Personalizada</Title>
      <DetailCamisaOrderComponent onChange={handleFormChange} />
    </>
  );
};
