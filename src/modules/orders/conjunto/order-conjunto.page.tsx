import { ReactElement, useState } from "react";
import { TextInput, NumberInput, Button, Select, Stack, Group, Divider, Text, Flex, Modal } from "@mantine/core";
import { useForm } from "@mantine/form";
import { MdAssignmentAdd } from "react-icons/md";
import dayjs from "dayjs";
import { OrderConjuntoInterface } from "./order-conjunto.interface";
import { DetailConjuntoOrderInterface } from "./components/detail-conjunto-order.interface";
import { DetailOrderConjunto } from "./components/detail-conjunto-order.component";
import { DateTimePicker } from "@mantine/dates";
import { DocumentProps, pdf } from "@react-pdf/renderer";
import { OrderConjuntoPDF } from "../../shared/components/pdf-formats/order-conjunto/order-conjunto.pdf";
import { useDisclosure } from "@mantine/hooks";
import * as S from "./order-conjunto.styles";

export const OrderConjunto = () => {
  // Form setup with validation rules
  const form = useForm<OrderConjuntoInterface>({
    initialValues: {
      date: new Date(),
      madeDate: new Date(),
      customer: {
        customerName: "",
        customerPhone: "",
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
      },
      payment: {
        advancePayment: (value) => (value < 0 ? "El pago adelantado no puede ser negativo" : null),
        advancePaymentMethod: (value) => (value.trim().length === 0 ? "El método de pago es obligatorio" : null),
        restPayment: (value) => (value < 0 ? "El pago restante no puede ser negativo" : null),
        restPaymentMethod: (value) => (value.trim().length === 0 ? "El método de pago es obligatorio" : null),
      },
    },
  });

  const [detailOrder, setDetailOrder] = useState<DetailConjuntoOrderInterface[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [pdfData, setPdfData] = useState<ReactElement<DocumentProps> | null>(null);
  const [openedPDFModal, { open: openPDFModal, close: closePDFModal }] = useDisclosure(false);

  // Handle form submission
  const handleSubmit = (values: typeof form.values) => {
    // FOR FACTURA
    const formattedValues: OrderConjuntoInterface = {
      ...values,
      madeDate: dayjs(values.madeDate).format("dddd DD MMMM YYYY hh:mm A"),
      date: dayjs(values.date).format("dddd DD MMMM YYYY hh:mm A"),
    };

    console.log("Order Form Submitted:", formattedValues);
    console.log("Detail Order:", detailOrder);

    const pdfDocument = (
      <OrderConjuntoPDF
        detailOrder={detailOrder}
        customer={form.getValues().customer}
        deliveryDate={dayjs(form.getValues().date).format("dddd DD MMMM YYYY hh:mm A")}
      />
    );

    // Save the PDF document in the state for rendering
    setPdfData(pdfDocument);
    openPDFModal();
  };

  const getTotal = (details: DetailConjuntoOrderInterface[]) => {
    return details.reduce((totalSum, detail) => {
      const productTotal = detail.detail.reduce((sizeSum, sizeDetail) => sizeSum + sizeDetail.quantity * (sizeDetail.price / 100), 0);
      return totalSum + productTotal;
    }, 0);
  };

  const handleDetailChange = (updatedDetails: DetailConjuntoOrderInterface[]) => {
    setDetailOrder(updatedDetails);
    setTotal(getTotal(updatedDetails)); // Recalculate total
  };

  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      <Stack gap="md">
        {/* CUSTOMER DETAILS */}
        <Text size="lg" fw={700}>
          Detalles del Cliente
        </Text>

        <Flex gap={5}>
          <TextInput
            flex={3}
            label="Nombre del Cliente"
            placeholder="Ingrese el nombre del cliente"
            withAsterisk
            {...form.getInputProps("customer.customerName")}
          />

          <TextInput flex={1} label="Teléfono del Cliente" placeholder="9999-9999" withAsterisk {...form.getInputProps("customer.customerPhone")} />
        </Flex>

        {/* ORDER DETAIL */}
        <Divider my="sm" />
        <Text size="lg" fw={700}>
          Detalle del Pedido
        </Text>

        <DetailOrderConjunto onDetailChange={handleDetailChange} />

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
        <Group mt="md">
          <Button type="submit">Generar Pedido</Button>
        </Group>
      </Stack>

      <Modal opened={openedPDFModal} onClose={closePDFModal} title="Hojas de Pedido">
        {/* HOJA PEDIDO */}
        {pdfData && (
          <S.ModalContainer>
            {/* HOJA DE PEDIDO */}
            <S.CardPDF
              onClick={async () => {
                // Ensure pdfData is not null
                if (pdfData) {
                  // Generate the PDF as a Blob
                  const blob = await pdf(pdfData).toBlob();

                  // Create a URL for the Blob and open it in a new tab
                  const url = URL.createObjectURL(blob);
                  window.open(url, "_blank");
                }
              }}
            >
              <MdAssignmentAdd className="iconPdf" />
              <span>Hoja de Pedido</span>
            </S.CardPDF>
          </S.ModalContainer>
        )}
      </Modal>
    </form>
  );
};
