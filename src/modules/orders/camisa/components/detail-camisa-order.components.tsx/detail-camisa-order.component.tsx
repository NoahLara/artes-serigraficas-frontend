import React from "react";
import { useForm } from "@mantine/form";
import { Grid, RadioGroup, Radio, Checkbox, Textarea, Flex, Alert, Text } from "@mantine/core";
import {
  DetailCamisaOrderInterface,
  FabricType,
  FabricWeight,
  NeckType,
  ShirtFit,
  SleeveType,
  StampingOptions,
  TechniqueType,
} from "./detail-camisa-order.interface";
import { PreviewImageNewProduct } from "../../../../shared/components/preview-image-new-product/preview-image-new-product.component";

const DetailCamisaOrderComponent: React.FC = () => {
  const form = useForm<DetailCamisaOrderInterface>({
    initialValues: {
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
    },
    validate: {
      /* Validation remains unchanged */
    },
  });

  return (
    <form>
      <Text size="md" fw={400}>
        Seleccione una imagen
      </Text>
      <Flex justify="center" align="center" p={25}>
        <PreviewImageNewProduct
          value={form.values.image as string}
          onChange={(base64: string | ArrayBuffer | null) => form.setFieldValue("image", base64 as string)}
        />
        {form.errors.image && <Alert color="red">{form.errors.image}</Alert>}
      </Flex>

      {/* Radio Groups inside a 3-column Grid */}
      <Grid>
        <Grid.Col mt={5} span={{ base: 12 }}>
          <RadioGroup label="Tipo de cuello" value={form.values.neck} onChange={(value) => form.setFieldValue("neck", value as NeckType)}>
            <Flex gap="xs">
              <Radio value="Redondo" label="Redondo" />
              <Radio value="V" label="V" />
              <Radio value="Otro" label="Otro" />
            </Flex>
          </RadioGroup>
        </Grid.Col>

        <Grid.Col mt={5} span={{ base: 12 }}>
          <RadioGroup label="Tipo de manga" value={form.values.sleeve} onChange={(value) => form.setFieldValue("sleeve", value as SleeveType)}>
            <Flex gap="xs">
              <Radio value="Corta" label="Corta" />
              <Radio value="Larga" label="Larga" />
              <Radio value="3/4" label="3/4" />
              <Radio value="Sin manga" label="Sin manga" />
              <Radio value="Otro" label="Otro" />
            </Flex>
          </RadioGroup>
        </Grid.Col>

        <Grid.Col mt={5} span={{ base: 12 }}>
          <RadioGroup label="Tipo de tela" value={form.values.fabric} onChange={(value) => form.setFieldValue("fabric", value as FabricType)}>
            <Flex gap="xs">
              <Radio value="Algodón" label="Algodón" />
              <Radio value="Poliéster" label="Poliéster" />
              <Radio value="Licra" label="Licra" />
              <Radio value="P. Durazno" label="P. Durazno" />
              <Radio value="Otro" label="Otro" />
            </Flex>
          </RadioGroup>
        </Grid.Col>
      </Grid>

      <Grid>
        <Grid.Col mt={5} span={{ base: 12 }}>
          <RadioGroup label="Ajuste de la camisa" value={form.values.fit} onChange={(value) => form.setFieldValue("fit", value as ShirtFit)}>
            <Flex gap="xs">
              <Radio value="Regular" label="Regular" />
              <Radio value="Agrandada" label="Agrandada" />
              <Radio value="Oversized" label="Oversized" />
              <Radio value="Otro" label="Otro" />
            </Flex>
          </RadioGroup>
        </Grid.Col>

        <Grid.Col mt={5} span={{ base: 12 }}>
          <RadioGroup
            label="Gramaje de la tela"
            value={form.values.fabricWeight.toString()}
            onChange={(value) => form.setFieldValue("fabricWeight", parseInt(value, 10) as FabricWeight)}
          >
            <Flex gap="xs">
              <Radio value="170" label="170" />
              <Radio value="180" label="180" />
              <Radio value="190" label="190" />
              <Radio value="200" label="200" />
            </Flex>
          </RadioGroup>
        </Grid.Col>

        <Grid.Col mt={5} span={{ base: 12 }}>
          <RadioGroup label="Técnica de impresión" value={form.values.technique} onChange={(value) => form.setFieldValue("technique", value as TechniqueType)}>
            <Flex gap="xs">
              <Radio value="Serigrafía" label="Serigrafía" />
              <Radio value="Vinil" label="Vinil" />
              <Radio value="Sublimación" label="Sublimación" />
              <Radio value="Bordado" label="Bordado" />
              <Radio value="Otro" label="Otro" />
            </Flex>
          </RadioGroup>
        </Grid.Col>

        <Grid.Col mt={5} span={{ base: 12 }}>
          <Checkbox.Group
            label="Estampado"
            value={form.values.stamping}
            onChange={(value) => form.setFieldValue("stamping", value as StampingOptions[])}
            error={form.errors.stamping}
          >
            <Flex gap="xs">
              <Checkbox value="Manga Derecha" label="Manga Derecha" />
              <Checkbox value="Manga Izquierda" label="Manga Izquierda" />
              <Checkbox value="Pecho" label="Pecho" />
              <Checkbox value="Espalda" label="Espalda" />
            </Flex>
          </Checkbox.Group>
        </Grid.Col>
      </Grid>

      <Textarea mt={5} label="Nota" value={form.values.note} onChange={(event) => form.setFieldValue("note", event.currentTarget.value)} />
    </form>
  );
};

export default DetailCamisaOrderComponent;
