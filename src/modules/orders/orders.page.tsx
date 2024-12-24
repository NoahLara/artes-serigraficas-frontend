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
  Divider,
  Flex,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { DateTimePicker } from "@mantine/dates";
import dayjs from "dayjs";
import { BsGeo, BsShop } from "react-icons/bs";
import { FaTruckFast } from "react-icons/fa6";
import { DetailOrder } from "./components/detail-order/detail-order.component";

interface OrderFormProps {
  onSuccess: () => void;
  onClose: () => void;
}

export const OrdersPage: React.FC<OrderFormProps> = ({
  onSuccess,
  onClose,
}) => {
  const form = useForm({
    initialValues: {
      createdBy: "",
      deliveryDate: null, // Default to null
      madeDate: new Date(), // Default to current date
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
        !value ? "La fecha de entrega es obligatoria" : null,
      madeDate: (value) =>
        !value ? "La fecha de creación es obligatoria" : null,
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
    // Format `madeDate` correctly
    const formattedValues = {
      ...values,
      madeDate: dayjs(values.madeDate, "dddd DD MMMM YYYY hh:mm A").format(
        "dddd DD MMMM YYYY hh:mm A"
      ),
      deliveryDate: dayjs(
        values.deliveryDate,
        "dddd DD MMMM YYYY hh:mm A"
      ).format("dddd DD MMMM YYYY hh:mm A"),
    };

    // Log the formatted values
    console.log("Order Form Submitted:", formattedValues);

    // Trigger success and close callbacks
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
            <DateTimePicker
              label="Fecha de entrega"
              placeholder="DD MMM YYYY hh:mm A"
              valueFormat="dddd DD MMMM YYYY hh:mm A"
              withAsterisk
              {...form.getInputProps("deliveryDate")}
            />

            <DateTimePicker
              label="Fecha de creación"
              placeholder="DD MMM YYYY hh:mm A"
              valueFormat="dddd DD MMMM YYYY hh:mm A"
              withAsterisk
              {...form.getInputProps("madeDate", {
                type: "input",
              })}
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
        <Divider my="md" />
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
              <Flex justify="space-between" align="center" gap={20}>
                <Radio.Card radius="md" value="A Domicilio">
                  <Group wrap="nowrap" justify="center" align="center" p={20}>
                    <Stack gap={10} align="center">
                      <FaTruckFast size={36} />
                      <Flex align="center" gap={10}>
                        <Radio.Indicator size="xs" />
                        <Text size="xs">A Domicilio</Text>
                      </Flex>
                    </Stack>
                  </Group>
                </Radio.Card>

                <Radio.Card radius="md" value="En Local">
                  <Group wrap="nowrap" justify="center" align="center" p={20}>
                    <Stack gap={10} align="center">
                      <BsShop size={36} />
                      <Flex align="center" gap={10}>
                        <Radio.Indicator size="xs" />
                        <Text size="xs">En Local</Text>
                      </Flex>
                    </Stack>
                  </Group>
                </Radio.Card>

                <Radio.Card radius="md" value="Punto">
                  <Group wrap="nowrap" justify="center" align="center" p={20}>
                    <Stack gap={10} align="center">
                      <BsGeo size={36} />
                      <Flex align="center" gap={10}>
                        <Radio.Indicator size="xs" />
                        <Text size="xs">Punto</Text>
                      </Flex>
                    </Stack>
                  </Group>
                </Radio.Card>
              </Flex>
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
        <Divider my="md" />
        {/* ORDER DETAIL*/}
        <Text size="lg" fw={700}>
          Detalle del Pedido
        </Text>
        <DetailOrder></DetailOrder>
        {/* END ORDER DETAIL */}
        <Divider my="md" />
        {/* Final Note */}
        <Text size="lg" fw={700}>
          Nota Final19
        </Text>
        <Textarea
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
