import React, { ReactElement, useEffect, useState } from "react";
import { Divider, Flex, Stack, Text, TextInput, Title, Switch, NumberInput, Select, Group, Button, Modal } from "@mantine/core";
import { OrderGeneralDetails } from "../../shared/core/interfaces/order-conjunto.interface";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { DetailCamisaOrderInterface } from "./components/detail-camisa-order.components.tsx/detail-camisa-order.interface";
import DetailCamisaOrderComponent from "./components/detail-camisa-order.components.tsx/detail-camisa-order.component";
import { DateTimePicker } from "@mantine/dates";
import { MdAssignmentAdd } from "react-icons/md";
import { FaFileInvoiceDollar } from "react-icons/fa";
import { DocumentProps, pdf } from "@react-pdf/renderer";
import * as S from "./order-camisa.styles";
import dayjs from "dayjs";
import { OrderCamisaPDF } from "../../shared/components/pdf-formats/order-camisa/order-camisa.pdf";
import { InvoiceCamisaPDF } from "../../shared/components/pdf-formats/order-camisa/invoice/invoice-camisa.pdf";

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

  const [detailOrder, setDetailOrder] = useState<DetailCamisaOrderInterface>({
    image: "",
    shirts: [],
    neck: "Redondo",
    sleeve: "Corta",
    fabric: "Algodón",
    fit: "Regular",
    fabricWeight: 170,
    technique: "Serigrafía",
    stamping: [],
    note: "",
  });
  const [total, setTotal] = useState<number>(0);
  const [pdfOrderData, setPdfOrderData] = useState<ReactElement<DocumentProps> | null>(null);
  const [pdfInvoiceData, setPdfInvoiceData] = useState<ReactElement<DocumentProps> | null>(null);
  const [openedPDFModal, { open: openPDFModal, close: closePDFModal }] = useDisclosure(false);

  const handleDetailChange = (updatedDetails: DetailCamisaOrderInterface) => {
    setDetailOrder(updatedDetails);
    setTotal(getTotal(updatedDetails, form.getValues().customer.applyIVA ?? false)); // Recalculate total with IVA
  };

  const getTotal = (details: DetailCamisaOrderInterface, applyIVA: boolean | null): number => {
    // Calculate the total amount for a single shirt order
    const totalAmount = details.shirts.reduce((shirtSum, shirt) => shirtSum + shirt.quantity * shirt.price, 0);

    // Apply IVA (13%) if required
    return applyIVA ? totalAmount * 1.13 : totalAmount;
  };

  // Recalculate total whenever applyIVA changes
  useEffect(() => {
    setTotal(getTotal(detailOrder, form.getValues().customer.applyIVA ?? false));
  }, [form, form.values.customer.applyIVA, detailOrder]);

  const handleSubmit = (values: typeof form.values) => {
    // FOR FACTURA
    const formattedValues: OrderGeneralDetails = {
      ...values,
      madeDate: dayjs(values.madeDate).format("dddd DD MMMM YYYY hh:mm A"),
      date: dayjs(values.date).format("dddd DD MMMM YYYY hh:mm A"),
    };
    console.log("Order Form Submitted:", formattedValues);
    console.log("Detail Order:", detailOrder);
    const pdfDocument = (
      <OrderCamisaPDF
        detailOrder={detailOrder}
        customer={form.getValues().customer}
        deliveryDate={dayjs(form.getValues().date).format("dddd DD MMMM YYYY hh:mm A")}
      />
    );
    const pdfInvoice = (
      <InvoiceCamisaPDF detailOrder={detailOrder} paymentInAdvance={form.getValues().payment.advancePayment} customer={form.getValues().customer} />
    );
    // Save the PDF document in the state for rendering
    setPdfOrderData(pdfDocument);
    // Save the PDF Invoice document in the state for rendering
    setPdfInvoiceData(pdfInvoice);
    openPDFModal();
  };

  return (
    <>
      <Stack gap="md">
        <Title order={4}>Pedido de Camisa Personalizada</Title>
        <DetailCamisaOrderComponent onChange={handleDetailChange} />
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <Stack gap="md">
            {/* CUSTOMER DETAILS */}
            <Text size="lg" fw={700}>
              Detalles del Cliente
            </Text>

            <Flex gap={5} align="center">
              <TextInput
                flex={3}
                label="Nombre del Cliente"
                placeholder="Ingrese el nombre del cliente"
                withAsterisk
                {...form.getInputProps("customer.customerName")}
              />
              <TextInput flex={1} label="Teléfono del Cliente" placeholder="9999-9999" withAsterisk {...form.getInputProps("customer.customerPhone")} />
            </Flex>
            <Switch
              label="¿Cliente aplica a IVA?"
              checked={form.values.customer.applyIVA}
              onChange={(e) => form.setFieldValue("customer.applyIVA", e.currentTarget.checked)}
            />

            {/* PAYMENT DETAILS */}
            <Divider my="sm" />
            <Text size="lg" fw={700}>
              Detalles de Pago
            </Text>

            <Text size="lg" fw={700}>
              Total del Pedido: ${total.toFixed(2)}
            </Text>

            <NumberInput
              label="Pago Adelantado"
              placeholder="Ingrese el pago adelantado"
              withAsterisk
              {...form.getInputProps("payment.advancePayment")}
              max={total}
              min={0}
            />

            <Select
              label="Método de Pago Adelantado"
              placeholder="Seleccione un método"
              data={["Efectivo", "Transferencia", "Tarjeta"]}
              withAsterisk
              {...form.getInputProps("payment.advancePaymentMethod")}
            />

            <Text size="lg" fw={700}>
              Restate total: ${(total - form.getValues().payment.advancePayment).toFixed(2)}
            </Text>

            <Select
              label="Método de Pago Restante"
              placeholder="Seleccione un método"
              data={["Efectivo", "Transferencia", "Tarjeta"]}
              withAsterisk
              {...form.getInputProps("payment.restPaymentMethod")}
            />

            {/* GENERAL DETAILS SECTION */}
            <Text size="lg" fw={700}>
              Detalles Generales
            </Text>

            <DateTimePicker
              label="Fecha de Creación"
              placeholder="Seleccione la fecha de creación"
              withAsterisk
              lang="es"
              clearable
              valueFormat="DD MMM YYYY hh:mm A"
              value={form.values.madeDate as Date}
              onChange={(date) => form.setFieldValue("madeDate", date || new Date())}
            />

            <DateTimePicker
              label="Fecha de Entrega"
              placeholder="Seleccione la fecha de entrega"
              withAsterisk
              lang="es"
              clearable
              valueFormat="DD MMM YYYY hh:mm A"
              value={form.values.date as Date}
              onChange={(date) => form.setFieldValue("date", date || new Date())}
            />

            {/* SUBMIT BUTTON */}
            <Group mt="md">{detailOrder.shirts.length > 0 && <Button type="submit">Generar Pedido</Button>}</Group>
          </Stack>
        </form>

        {/* MODAL */}
        <Modal opened={openedPDFModal} onClose={closePDFModal} title="Hojas de Pedido">
          {/* HOJA PEDIDO */}
          {pdfOrderData && (
            <S.ModalContainer>
              {/* HOJA DE PEDIDO */}
              <S.CardPDF
                onClick={async () => {
                  // Ensure pdfOrderData is not null
                  if (pdfOrderData) {
                    // Generate the PDF as a Blob
                    const blob = await pdf(pdfOrderData).toBlob();

                    // Create a URL for the Blob and open it in a new tab
                    const url = URL.createObjectURL(blob);
                    window.open(url, "_blank");
                  }
                }}
              >
                <MdAssignmentAdd className="iconPdf" />
                <span>Hoja de Pedido</span>
              </S.CardPDF>

              <S.CardPDF
                onClick={async () => {
                  // Ensure pdfOrderData is not null
                  if (pdfInvoiceData) {
                    // Generate the PDF as a Blob
                    const blob = await pdf(pdfInvoiceData).toBlob();

                    // Create a URL for the Blob and open it in a new tab
                    const url = URL.createObjectURL(blob);
                    window.open(url, "_blank");
                  }
                }}
              >
                <FaFileInvoiceDollar className="iconPdf" />
                <span>Factura</span>
              </S.CardPDF>
            </S.ModalContainer>
          )}
        </Modal>
      </Stack>
    </>
  );
};
