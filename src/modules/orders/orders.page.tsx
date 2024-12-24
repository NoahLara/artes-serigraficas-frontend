import React from "react";
import {
  TextInput,
  NumberInput,
  Button,
  Select,
  // Alert,
  // Flex,
  Text,
  Stack,
  Textarea,
  Radio,
  Group,
  Grid,
} from "@mantine/core";
import { useForm } from "@mantine/form";

interface OrderFormProps {
  onSuccess: () => void;
  onClose: () => void;
}

export const OrdersPage: React.FC<OrderFormProps> = ({ onSuccess, onClose }) => {
  const form = useForm({
    initialValues: {
      createdBy: "",
      deliveryDate: "",
      madeDate: "",
      orderSource: "",
      customerName: "",
      phoneNumber: "",
      email: "",
      advancePayment: 0,
      advancePaymentMethod: "",
      restPayment: 0,
      restPaymentMethod: "",
      deliveryMethod: "",
      meetingPoint: "",
      finalNote: "",
    },
    validate: {
      createdBy: (value) =>
        value.trim().length === 0
          ? "El campo 'Creado por' es obligatorio"
          : null,
      deliveryDate: (value) =>
        value.trim().length === 0 ? "La fecha de entrega es obligatoria" : null,
      madeDate: (value) =>
        value.trim().length === 0
          ? "La fecha de creación es obligatoria"
          : null,
      orderSource: (value) =>
        value.trim().length === 0
          ? "El origen del pedido es obligatorio"
          : null,
      customerName: (value) =>
        value.trim().length === 0
          ? "El nombre del cliente es obligatorio"
          : null,
      phoneNumber: (value) =>
        value.trim().length === 0
          ? "El número de teléfono es obligatorio"
          : null,
      advancePayment: (value) =>
        value < 0 ? "El pago adelantado no puede ser negativo" : null,
      restPayment: (value) =>
        value < 0 ? "El pago restante no puede ser negativo" : null,
      deliveryMethod: (value) =>
        value.trim().length === 0
          ? "El método de entrega es obligatorio"
          : null,
    },
  });

  const handleSubmit = (values: typeof form.values) => {
    console.log("Order Form Submitted:", values);
    onSuccess();
    onClose();
  };

  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      <Stack gap="md">
        {/* Order Information and Client Information in one row */}
        <Grid>
          <Grid.Col span={6}>
            <Text size="lg" fw={700}>
              Información del Pedido
            </Text>
            <TextInput
              label="Creado por"
              placeholder="Nombre del creador del pedido"
              withAsterisk
              {...form.getInputProps("createdBy")}
            />
            <TextInput
              label="Fecha de entrega"
              placeholder="YYYY-MM-DD"
              withAsterisk
              {...form.getInputProps("deliveryDate")}
            />
            <TextInput
              label="Fecha de creación"
              placeholder="YYYY-MM-DD"
              withAsterisk
              {...form.getInputProps("madeDate")}
            />
            <Select
              label="Origen del pedido"
              placeholder="Selecciona una opción"
              withAsterisk
              data={[
                { value: "WhatsApp", label: "WhatsApp" },
                { value: "En el local", label: "En el local" },
                { value: "De Empleado", label: "De Empleado" },
              ]}
              {...form.getInputProps("orderSource")}
            />
          </Grid.Col>
          <Grid.Col span={6}>
            <Text size="lg" fw={700}>
              Información del Cliente
            </Text>
            <TextInput
              label="Nombre del cliente"
              placeholder="Nombre del cliente"
              withAsterisk
              {...form.getInputProps("customerName")}
            />
            <TextInput
              label="Número de teléfono"
              placeholder="Teléfono"
              withAsterisk
              {...form.getInputProps("phoneNumber")}
            />
            <TextInput
              label="Correo electrónico"
              placeholder="Correo (opcional)"
              {...form.getInputProps("email")}
            />
          </Grid.Col>
        </Grid>

        {/* Payment Method and Delivery Method in one row */}
        <Grid>
          <Grid.Col span={6}>
            <Text size="lg" fw={700}>
              Método de Pago
            </Text>
            <NumberInput
              label="Pago adelantado"
              placeholder="Monto adelantado"
              withAsterisk
              {...form.getInputProps("advancePayment")}
            />
            <Select
              label="Método de pago adelantado"
              placeholder="Selecciona una opción"
              data={[
                { value: "Efectivo", label: "Efectivo" },
                { value: "Transferencia", label: "Transferencia" },
                { value: "Cheque", label: "Cheque" },
                { value: "Tarjeta", label: "Tarjeta" },
              ]}
              {...form.getInputProps("advancePaymentMethod")}
            />
            <NumberInput
              label="Pago restante"
              placeholder="Monto restante"
              withAsterisk
              {...form.getInputProps("restPayment")}
            />
            <Select
              label="Método de pago restante"
              placeholder="Selecciona una opción"
              data={[
                { value: "Efectivo", label: "Efectivo" },
                { value: "Transferencia", label: "Transferencia" },
                { value: "Cheque", label: "Cheque" },
                { value: "Tarjeta", label: "Tarjeta" },
              ]}
              {...form.getInputProps("restPaymentMethod")}
            />
          </Grid.Col>
          <Grid.Col span={6}>
            <Text size="lg" fw={700}>
              Método de Entrega
            </Text>
            <Radio.Group
              label="Método de entrega"
              withAsterisk
              {...form.getInputProps("deliveryMethod")}
            >
              <Group mt="xs">
                <Radio value="Envío a domicilio" label="Envío a domicilio" />
                <Radio value="Recoge en local" label="Recoge en local" />
                <Radio value="Punto de encuentro" label="Punto de encuentro" />
              </Group>
            </Radio.Group>
            {form.values.deliveryMethod === "Meeting Point" && (
              <TextInput
                label="Punto de encuentro"
                placeholder="Ubicación del punto de encuentro"
                {...form.getInputProps("meetingPoint")}
              />
            )}
          </Grid.Col>
        </Grid>

        {/* Final Note */}
        <Text size="lg" fw={700}>
          Nota Final
        </Text>
        <Textarea
          label="Nota"
          placeholder="Escribe alguna nota adicional"
          {...form.getInputProps("finalNote")}
        />

        {/* Submit Button */}
        <Button type="submit" fullWidth>
          Crear Pedido
        </Button>
      </Stack>
    </form>
  );
};
