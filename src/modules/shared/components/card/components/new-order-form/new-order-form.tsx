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
} from "@mantine/core";
import { useState } from "react";
import { RiAddLine, RiDeleteBinLine } from "react-icons/ri";

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

  const [rows, setRows] = useState<
    { talla: string; cantidad: number; color: string }[]
  >([]);
  const [talla, setTalla] = useState("");
  const [cantidad, setCantidad] = useState<number>(0);
  const [color, setColor] = useState("");

  const addRow = () => {
    if (talla && cantidad && color) {
      setRows((prev) => [...prev, { talla, cantidad, color }]);
      setTalla("");
      setCantidad(0);
      setColor("");
    }
  };

  const deleteRow = (index: number) => {
    setRows((prev) => prev.filter((_, i) => i !== index));
  };

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
            />
            <TextInput
              flex={1}
              label="Email"
              placeholder="miguelan.eml20@gmail.com"
              size="xs"
            />
            <TextInput label="Telefono" placeholder="7723-2343" size="xs" />
          </Flex>
        </Fieldset>

        {/* ORDER INFORMATION */}
        <Fieldset legend="Pedido" radius="md">
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
                    <Radio value="Mujer" label="Poliéster" size="xs" />
                    <Radio value="Hoodie" label="Hoodie" size="xs" />
                  </Group>
                </Radio.Group>
              </Fieldset>
            </Stack>
          </Flex>

          {/* TABLE FORM */}
          <Flex align="flex-end" gap={10}>
            <Select
              flex={0.3}
              size="xs"
              label="Talla"
              placeholder="Seleccione una talla"
              value={talla}
              onChange={(value) => setTalla(value || "")}
              data={[
                { group: "Ninos", items: youthSizeCatalog },
                { group: "Adultos", items: adultsSizeCatalog },
              ]}
            />

            <NumberInput
              flex={1}
              size="xs"
              label="Cantidad"
              placeholder="Ingrese la cantidad"
              value={cantidad}
              onChange={(value) => setCantidad(value as number)}
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

            <ActionIcon variant="outline" onClick={addRow}>
              <RiAddLine size={18} stroke="1.5" />
            </ActionIcon>
          </Flex>

          {/* TABLE */}
          <Table highlightOnHover mt="md">
            <thead>
              <tr>
                <th align="left">Talla</th>
                <th align="left">Cantidad</th>
                <th align="left">Color</th>
                <th align="left">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {rows.length > 0 ? (
                rows.map((row, index) => (
                  <tr key={index}>
                    <td align="left">{row.talla}</td>
                    <td align="left">{row.cantidad}</td>
                    <td align="left">{row.color}</td>
                    <td align="left">
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
      </Stack>
    </form>
  );
};
