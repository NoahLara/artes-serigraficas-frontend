import {
  ActionIcon,
  Fieldset,
  Flex,
  Group,
  Image,
  NumberInput,
  Radio,
  Select,
  Stack,
  Table,
  Text,
  TextInput,
  Button,
} from "@mantine/core";
import { DateTimePicker } from "@mantine/dates";
import { useState } from "react";
import { RiAddLine, RiDeleteBinLine } from "react-icons/ri";
import { BsShop, BsGeo } from "react-icons/bs";
import { FaTruckFast } from "react-icons/fa6";
import { DeliveryMethod, Pedido } from "./new-order-form.types";

export const NewOrderForm = () => {
  const adultsSizeCatalog: string[] = [
    "S",
    "M",
    "L",
    "XL",
    "2XL",
    "3XL",
    "4XL",
    "5XL",
  ];

  const youthSizeCatalog: string[] = [
    "0-3",
    "3-6",
    "6-12",
    "12-24",
    "s",
    "m",
    "l",
    "xl",
  ];

  const deliveryMethods: DeliveryMethod[] = [
    {
      name: "Recoger en Tienda",
      icon: BsShop,
    },
    {
      name: "Punto de Entrega",
      icon: BsGeo,
    },
    {
      name: "A Domicilio",
      icon: FaTruckFast,
    },
  ];

  const [rows, setRows] = useState<Pedido[]>([]);
  const [talla, setTalla] = useState("");
  const [cantidad, setCantidad] = useState<number>(0);
  const [precio, setPrecio] = useState<number>(0.0);
  const [color, setColor] = useState("");
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [telefono, setTelefono] = useState("");
  const [fechaPedido, setFechaPedido] = useState<Date | null>(null);
  const [fechaEntrega, setFechaEntrega] = useState<Date | null>(null);
  const [metodoEntrega, setMetodoEntrega] = useState<string>(
    deliveryMethods[0].name
  );

  const addRow = () => {
    if (talla && cantidad && precio && color) {
      setRows((prev) => [...prev, { talla, cantidad, precio, color }]);
      setTalla("");
      setCantidad(0);
      setPrecio(0.0);
      setColor("");
    }
  };

  const enablaAddDetailForm = () => {
    return talla && cantidad && precio && color;
  };

  const deleteRow = (index: number) => {
    setRows((prev) => prev.filter((_, i) => i !== index));
  };

  const isFormComplete = () => {
    return (
      nombre &&
      email &&
      telefono &&
      rows.length > 0 &&
      fechaPedido &&
      fechaEntrega &&
      metodoEntrega
    );
  };

  const handleGenerateOrder = () => {
    if (isFormComplete()) {
      const orderData = {
        customer: { nombre, email, telefono },
        orderDetails: rows,
        deliveryInfo: { fechaPedido, fechaEntrega, metodoEntrega },
      };
      console.log("Pedido generado:", orderData);
    } else {
      alert("Por favor, complete todos los campos obligatorios.");
    }
  };

  const deliveryMethodsCards = deliveryMethods.map((item) => (
    <Radio.Card radius="md" value={item.name} key={item.name}>
      <Group wrap="nowrap" justify="center" align="center" p={20}>
        <Stack gap={10} align="center">
          <item.icon size={36} />
          <Flex align="center" gap={10}>
            <Radio.Indicator size="xs" />
            <Text size="xs">{item.name}</Text>
          </Flex>
        </Stack>
      </Group>
    </Radio.Card>
  ));

  return (
    <form>
      <Stack>
        {/* CUSTOMER INFORMATION */}
        <Fieldset legend="Informacion del Cliente" radius="md">
          <Flex align="center" gap={10}>
            <TextInput
              flex={1}
              label="Nombre"
              placeholder="Miguel Antonio Torres Melara"
              size="xs"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
            />
            <TextInput
              flex={1}
              label="Email"
              placeholder="miguelan.eml20@gmail.com"
              size="xs"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextInput
              label="Telefono"
              placeholder="7723-2343"
              size="xs"
              value={telefono}
              onChange={(e) => setTelefono(e.target.value)}
            />
          </Flex>
        </Fieldset>

        {/* DETAIL ORDER INFORMATION */}
        <Fieldset legend="Detalle del Pedido" radius="md">
          {/* EXAMPLE TSHIRT */}
          <Flex align="center" gap={10}>
            <Image
              src="src/assets/tshirt-model.webp"
              alt="Camisa Modelo"
              w={400}
            />
            <Stack>
              <Fieldset legend="Mangas" radius="md">
                <Radio.Group size="xs">
                  <Group mt="xs">
                    <Radio value="Manga Corta" label="Manga Corta" size="xs" />
                    <Radio value="Manga Larga" label="Manga Larga" size="xs" />
                  </Group>
                </Radio.Group>
              </Fieldset>
              <Fieldset legend="Tela" radius="md">
                <Radio.Group>
                  <Group mt="xs">
                    <Radio
                      value="100% Algodon"
                      label="100% Algodon"
                      size="xs"
                    />
                    <Radio value="Poliéster" label="Poliéster" size="xs" />
                  </Group>
                </Radio.Group>
              </Fieldset>
              <Fieldset legend="Tipo" radius="md">
                <Radio.Group>
                  <Group mt="xs">
                    <Radio value="Unisex" label="Unisex" size="xs" />
                    <Radio value="Mujer" label="Mujer" size="xs" />
                    <Radio value="Hoodie" label="Hoodie" size="xs" />
                  </Group>
                </Radio.Group>
              </Fieldset>
            </Stack>
          </Flex>

          {/* TABLE FORM */}
          <Flex align="flex-end" gap={10}>
            <Select
              flex={0.4}
              size="xs"
              label="Talla"
              placeholder="Seleccione una talla"
              value={talla}
              onChange={(value) => setTalla(value || "")}
              data={[
                { group: "Niños", items: youthSizeCatalog },
                { group: "Adultos", items: adultsSizeCatalog },
              ]}
            />

            <NumberInput
              flex={1}
              decimalScale={0}
              size="xs"
              label="Cantidad"
              placeholder="Ingrese la cantidad"
              value={cantidad}
              onChange={(value) => setCantidad(value as number)}
              min={1}
              max={10000}
            />

            <NumberInput
              flex={1}
              decimalScale={2}
              size="xs"
              label="Precio por unidad"
              placeholder="Ingrese el precio"
              value={precio}
              onChange={(value) => setPrecio(value as number)}
              min={1}
              max={10000}
            />

            <TextInput
              flex={1}
              label="Color"
              placeholder="Ingrese el nombre de color"
              size="xs"
              value={color}
              onChange={(event) => setColor(event.target.value)}
            />

            <ActionIcon
              variant="outline"
              onClick={addRow}
              disabled={!enablaAddDetailForm()}
            >
              <RiAddLine size={18} stroke="1.5" />
            </ActionIcon>
          </Flex>

          {/* TABLE */}
          <Table highlightOnHover mt="md">
            <thead>
              <tr>
                <th align="left">Talla</th>
                <th align="left">Cantidad</th>
                <th align="left">Precio por Unidad</th>
                <th align="left">Color</th>
                <th align="left">Subtotal</th>
              </tr>
            </thead>
            <tbody>
              {rows.length > 0 ? (
                rows.map((row, index) => (
                  <tr key={index}>
                    <td align="left">{row.talla}</td>
                    <td align="left">{row.cantidad}</td>
                    <td align="left">${row.precio}</td>
                    <td align="left">{row.color}</td>
                    <td align="left">${row.cantidad * row.precio}</td>
                    <td align="center">
                      <ActionIcon
                        color="red"
                        variant="outline"
                        onClick={() => deleteRow(index)}
                      >
                        <RiDeleteBinLine size={18} />
                      </ActionIcon>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td>
                    <Text size="xs" opacity={0.4}>
                      Sin pedidos ingresados...
                    </Text>
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        </Fieldset>

        {/* DELIVERY INFORMATION */}
        <Fieldset legend="Informacion de Entrega">
          <Flex align="center" gap={10}>
            <DateTimePicker
              flex={1}
              size="xs"
              lang="es"
              clearable
              valueFormat="DD MMM YYYY hh:mm A"
              label="Fecha del pedido"
              placeholder="Seleccione la fecha y hora"
              value={fechaPedido}
              onChange={setFechaPedido}
            />
            <DateTimePicker
              flex={1}
              size="xs"
              lang="es"
              clearable
              valueFormat="DD MMM YYYY hh:mm A"
              label="Fecha de entrega del pedido"
              placeholder="Seleccione la fecha y hora"
              value={fechaEntrega}
              onChange={setFechaEntrega}
            />
          </Flex>
          <Radio.Group
            value={metodoEntrega}
            onChange={setMetodoEntrega}
            size="xs"
            mt="xl"
            variant="cards"
          >
            <Group mt="xs" gap={15}>
              {deliveryMethodsCards}
            </Group>
          </Radio.Group>
        </Fieldset>
      </Stack>

      <Button
        size="xs"
        color="blue"
        onClick={handleGenerateOrder}
        disabled={!isFormComplete()}
      >
        Generar Pedido
      </Button>
    </form>
  );
};
