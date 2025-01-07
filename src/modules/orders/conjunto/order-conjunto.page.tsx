import { useState } from "react";
import { TextInput, NumberInput, Button, Select, Stack, Group, Divider, Text } from "@mantine/core";
import { useForm } from "@mantine/form";
import dayjs from "dayjs";
import { OrderConjuntoInterface } from "./order-conjunto.interface";
import { DetailConjuntoOrderInterface } from "./components/detail-conjunto-order.interface";
import { DetailOrderConjunto } from "./components/detail-conjunto-order.component";

export const OrderConjunto = () => {
  // Form setup with validation rules
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

  // Handle form submission
  const handleSubmit = (values: typeof form.values) => {
    const formattedValues: OrderConjuntoInterface = {
      ...values,
      madeDate: dayjs(values.madeDate).format("dddd DD MMMM YYYY hh:mm A"),
      date: dayjs(values.date).format("dddd DD MMMM YYYY hh:mm A"),
    };

    console.log("Order Form Submitted:", formattedValues);
    console.log("Detail Order:", detailOrder);
  };

  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      <Stack gap="md">
        {/* ORDER DETAIL */}
        <Text size="lg" fw={700}>
          Detalle del Pedido
        </Text>

        <DetailOrderConjunto onDetailChange={setDetailOrder} />

        {/* CUSTOMER DETAILS */}
        <Divider my="sm" />
        <Text size="lg" fw={700}>
          Detalles del Cliente
        </Text>

        <TextInput label="Nombre del Cliente" placeholder="Ingrese el nombre del cliente" withAsterisk {...form.getInputProps("customer.customerName")} />

        <TextInput label="Teléfono del Cliente" placeholder="Ingrese el número de teléfono" withAsterisk {...form.getInputProps("customer.customerPhone")} />

        <TextInput
          label="Correo Electrónico del Cliente"
          placeholder="Ingrese el correo electrónico (opcional)"
          {...form.getInputProps("customer.customerEmail")}
        />

        {/* PAYMENT DETAILS */}
        <Divider my="sm" />
        <Text size="lg" fw={700}>
          Detalles de Pago
        </Text>

        <NumberInput label="Pago Adelantado" placeholder="Ingrese el pago adelantado" withAsterisk {...form.getInputProps("payment.advancePayment")} />

        <Select
          label="Método de Pago Adelantado"
          placeholder="Seleccione un método"
          data={["Efectivo", "Transferencia", "Tarjeta"]}
          withAsterisk
          {...form.getInputProps("payment.advancePaymentMethod")}
        />

        <NumberInput label="Pago Restante" placeholder="Ingrese el pago restante" withAsterisk {...form.getInputProps("payment.restPayment")} />

        <Select
          label="Método de Pago Restante"
          placeholder="Seleccione un método"
          data={["Efectivo", "Transferencia", "Tarjeta"]}
          withAsterisk
          {...form.getInputProps("payment.restPaymentMethod")}
        />

        {/* DELIVERY DETAILS */}
        <Divider my="sm" />
        <Text size="lg" fw={700}>
          Detalles de Entrega
        </Text>

        <Select
          label="Método de Entrega"
          placeholder="Seleccione un método de entrega"
          data={["Domicilio", "Punto"]}
          withAsterisk
          {...form.getInputProps("delivery.deliveryMethod")}
        />

        <TextInput label="Punto de Encuentro" placeholder="Ingrese el punto de encuentro (si aplica)" {...form.getInputProps("delivery.meetingPoint")} />

        {/* SUBMIT BUTTON */}
        <Group mt="md">
          <Button type="submit">Enviar Pedido</Button>
        </Group>
      </Stack>
    </form>
  );
};
