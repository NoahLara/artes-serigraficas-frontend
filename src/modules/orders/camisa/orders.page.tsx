// import { ReactElement, useState } from "react";
// import {
//   TextInput,
//   NumberInput,
//   Button,
//   Select,
//   // Alert,
//   // Flex,
//   Text,
//   Stack,
//   Textarea,
//   Radio,
//   Group,
//   Grid,
//   Divider,
//   Flex,
//   Checkbox,
// } from "@mantine/core";
// import { useForm } from "@mantine/form";
// import { DateTimePicker } from "@mantine/dates";
// import dayjs from "dayjs";
// import { BsGeo, BsShop } from "react-icons/bs";
// import { FaTruckFast } from "react-icons/fa6";
// import { DetailOrder } from "./components/detail-order/detail-order.component";
// import { Product } from "../../shared/core/interfaces";
// import { ProductByPerson } from "../../shared/core/interfaces/product-by-person.interface";
// import { DetailOrderData } from "../../shared/data";
// import { PDFDownloadLink } from "@react-pdf/renderer";
// import { OrderInterface } from "./orders.interface";
// import OrderPDF from "../shared/components/pdf-formats/order/order.pdf";

// export const OrdersPage = () => {
//   const form = useForm<OrderInterface>({
//     initialValues: {
//       neckType: "",
//       sizeAndFit: "",
//       color: "",
//       fabric: "",
//       fabricThickness: 0,
//       specialProperties: [],
//       sleeveType: "",
//       customizationTechniques: "",
//       customizationLocations: [],
//       createdBy: "",
//       deliveryDate: "", // Default to null
//       madeDate: new Date(), // Default to current date
//       orderSource: "",
//       customerName: "",
//       phoneNumber: "",
//       email: "",
//       advancePayment: 0,
//       advancePaymentMethod: "",
//       restPayment: 0,
//       restPaymentMethod: "",
//       deliveryMethod: "",
//       meetingPoint: "",
//       finalNote: "",
//     },
//     validate: {
//       neckType: (value) =>
//         value.trim().length === 0
//           ? "El campo 'Tipo de Cuello' es obligatorio"
//           : null,
//       sizeAndFit: (value) =>
//         value.trim().length === 0
//           ? "El campo 'Proporcion' es obligatorio"
//           : null,
//       fabric: (value) =>
//         value.trim().length === 0
//           ? "El campo 'Tipo de Tela' es obligatorio"
//           : null,
//       fabricThickness: (value) =>
//         value === 0 ? "El campo 'Gramage' es obligatorio" : null,
//       sleeveType: (value) =>
//         value.trim().length === 0
//           ? "El campo 'Tipo de Manga' es obligatorio"
//           : null,
//       customizationTechniques: (value) =>
//         value.trim().length === 0 ? "El campo 'Tecnica' es obligatorio" : null,
//       customizationLocations: (value) =>
//         value.length === 0
//           ? "El campo 'Lados a estampar' es obligatorio"
//           : null,
//       createdBy: (value) =>
//         value.trim().length === 0
//           ? "El campo 'Creado por' es obligatorio"
//           : null,
//       deliveryDate: (value) =>
//         !value ? "La fecha de entrega es obligatoria" : null,
//       madeDate: (value) =>
//         !value ? "La fecha de creación es obligatoria" : null,
//       orderSource: (value) =>
//         value.trim().length === 0
//           ? "El origen del pedido es obligatorio"
//           : null,
//       customerName: (value) =>
//         value.trim().length === 0
//           ? "El nombre del cliente es obligatorio"
//           : null,
//       phoneNumber: (value) =>
//         value.trim().length === 0
//           ? "El número de teléfono es obligatorio"
//           : null,
//       advancePayment: (value) =>
//         value < 0 ? "El pago adelantado no puede ser negativo" : null,
//       restPayment: (value) =>
//         value < 0 ? "El pago restante no puede ser negativo" : null,
//       deliveryMethod: (value) =>
//         value.trim().length === 0
//           ? "El método de entrega es obligatorio"
//           : null,
//     },
//   });

//   const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
//   const [detailOrder, setDetailOrder] = useState<ProductByPerson>({
//     ...DetailOrderData,
//   });
//   const [pdfData, setPdfData] = useState<ReactElement | null>(null);

//   const handleSubmit = (values: typeof form.values) => {
//     // Format `madeDate` correctly
//     const formattedValues: OrderInterface = {
//       ...values,
//       madeDate: dayjs(values.madeDate, "dddd DD MMMM YYYY hh:mm A").format(
//         "dddd DD MMMM YYYY hh:mm A"
//       ),
//       deliveryDate: dayjs(
//         values.deliveryDate,
//         "dddd DD MMMM YYYY hh:mm A"
//       ).format("dddd DD MMMM YYYY hh:mm A"),
//     };

//     // Log the formatted values
//     console.log("Order Form Submitted:", formattedValues);

//     console.log("Detail Order:", detailOrder);

//     console.log("Product:", selectedProduct);

//     const pdfDocument = selectedProduct && (
//       <OrderPDF
//         orderInformation={formattedValues}
//         detailOrder={detailOrder}
//         product={selectedProduct}
//       />
//     );

//     // Save the PDF document in the state for rendering
//     setPdfData(pdfDocument);
//   };

//   return (
//     <form onSubmit={form.onSubmit(handleSubmit)}>
//       <Stack gap="md">
//         {/* ORDER DETAIL*/}
//         <Text size="lg" fw={700}>
//           Detalle del Pedido
//         </Text>
//         <DetailOrder
//           detailOrder={detailOrder}
//           setDetailOrder={setDetailOrder}
//           selectedProduct={selectedProduct}
//           setSelectedProduct={setSelectedProduct}
//         />
//         {/* END ORDER DETAIL */}
//         {/* MIENTRAS NOS SE ESCOGA UN PRODUCTO, NO SE MOSTRARA EL RESTO DEL
//         FORMULARIO */}
//         {selectedProduct && (
//           <>
//             {/* ORDER OPTIONS */}
//             <Divider my="md" />
//             <Grid>
//               <Grid.Col span={6}>
//                 <Stack>
//                   {/* TIPO DE CUELLO */}
//                   <Radio.Group
//                     label="Tipo de Cuello:"
//                     withAsterisk
//                     {...form.getInputProps("neckType")}
//                   >
//                     <Group mt="xs">
//                       <Radio value="Redondo" label="Redondo" />
//                       <Radio value="V" label="V" />
//                       <Radio value="Polo" label="Polo" />
//                     </Group>
//                   </Radio.Group>
//                   {/* Gramaje */}
//                   <Radio.Group
//                     label="Gramage:"
//                     withAsterisk
//                     {...form.getInputProps("fabricThickness")}
//                   >
//                     <Group mt="xs">
//                       <Radio value="170" label="170" />
//                       <Radio value="180" label="180" />
//                       <Radio value="190" label="190" />
//                     </Group>
//                   </Radio.Group>
//                   {/* TAMANO Y MEDIDA */}
//                   <Radio.Group
//                     label="Proporcion:"
//                     withAsterisk
//                     {...form.getInputProps("sizeAndFit")}
//                   >
//                     <Group mt="xs">
//                       <Radio
//                         value="Ovisize/Agrandado"
//                         label="Ovisize/Agrandado"
//                       />
//                       <Radio value="Normal" label="Normal" />
//                       <Radio value="Stretch" label="Stretch" />
//                     </Group>
//                   </Radio.Group>
//                   {/* Tipo de Tela */}
//                   <Radio.Group
//                     label="Tipo de Tela:"
//                     withAsterisk
//                     {...form.getInputProps("fabric")}
//                   >
//                     <Group mt="xs">
//                       <Radio value="Algodón" label="Algodón" />
//                       <Radio value="P. Durazno" label="P. Durazno" />
//                       <Radio value="Poliester" label="Poliester" />
//                     </Group>
//                   </Radio.Group>
//                   {/* Propiedades Especiales */}
//                   <Checkbox.Group
//                     defaultValue={["react"]}
//                     label="Propiedades especiales"
//                     {...form.getInputProps("specialProperties")}
//                   >
//                     <Group mt="xs">
//                       <Checkbox value="Reflectiva" label="Reflectiva" />
//                       <Checkbox value="Impermeable" label="Impermeable" />
//                       <Checkbox value="Elástica" label="Elástica" />
//                       <Checkbox value="Antimicrobiana" label="Antimicrobiana" />
//                       <Checkbox value="Ignífuga" label="Ignífuga" />
//                       <Checkbox value="Corta viento" label="Corta viento" />
//                       <Checkbox value="Respirable" label="Respirable" />
//                       <Checkbox value="Anti-Rayos UV" label="Anti-Rayos UV" />
//                       <Checkbox value="Antiestática" label="Antiestática" />
//                     </Group>
//                   </Checkbox.Group>
//                 </Stack>
//               </Grid.Col>
//               <Grid.Col span={6}>
//                 <Stack>
//                   {/* Tipo de Mangas */}
//                   <Radio.Group
//                     label="Tipo de Mangas:"
//                     withAsterisk
//                     {...form.getInputProps("sleeveType")}
//                   >
//                     <Group mt="xs">
//                       <Radio value="Manga Corta" label="Manga Corta" />
//                       <Radio value="Manga Larga" label="Manga Larga" />
//                       <Radio value="Manga 3/4" label="Manga 3/4" />
//                       <Radio
//                         value="Manga hasta el codo"
//                         label="Manga hasta el codo"
//                       />
//                     </Group>
//                   </Radio.Group>
//                   {/* Tecnicas*/}
//                   <Radio.Group
//                     label="Tecnica:"
//                     withAsterisk
//                     {...form.getInputProps("customizationTechniques")}
//                   >
//                     <Group mt="xs">
//                       <Radio value="Sublimacion" label="Sublimacion" />
//                       <Radio value="Serigrafia" label="Serigrafia" />
//                       <Radio value="Vinil" label="Vinil" />
//                       <Radio value="Bordado" label="Bordado" />
//                     </Group>
//                   </Radio.Group>
//                   {/* Lados de estapado*/}
//                   <Checkbox.Group
//                     defaultValue={["react"]}
//                     label="Lados a estampar:"
//                     {...form.getInputProps("customizationLocations")}
//                   >
//                     <Group mt="xs">
//                       <Checkbox value="Pecho" label="Pecho" />
//                       <Checkbox value="Espalda" label="Espalda" />
//                       <Checkbox value="Manga" label="Manga" />
//                     </Group>
//                   </Checkbox.Group>
//                   {/* Color */}
//                   <TextInput
//                     label="Color: "
//                     placeholder="Color de Camisas"
//                     {...form.getInputProps("color")}
//                   />
//                 </Stack>
//               </Grid.Col>
//             </Grid>
//             <Divider my="md" />
//             {/* Order Information and Client Information in one row */}
//             <Grid>
//               <Grid.Col span={6}>
//                 <Text size="lg" fw={700}>
//                   Información del Pedido
//                 </Text>
//                 <TextInput
//                   label="Creado por"
//                   placeholder="Nombre del creador del pedido"
//                   withAsterisk
//                   {...form.getInputProps("createdBy")}
//                 />
//                 <DateTimePicker
//                   label="Fecha de entrega"
//                   placeholder="DD MMM YYYY hh:mm A"
//                   valueFormat="dddd DD MMMM YYYY hh:mm A"
//                   withAsterisk
//                   {...form.getInputProps("deliveryDate")}
//                 />

//                 <DateTimePicker
//                   label="Fecha de creación"
//                   placeholder="DD MMM YYYY hh:mm A"
//                   valueFormat="dddd DD MMMM YYYY hh:mm A"
//                   withAsterisk
//                   {...form.getInputProps("madeDate", {
//                     type: "input",
//                   })}
//                 />
//                 <Select
//                   label="Origen del pedido"
//                   placeholder="Selecciona una opción"
//                   withAsterisk
//                   data={[
//                     { value: "WhatsApp", label: "WhatsApp" },
//                     { value: "En el local", label: "En el local" },
//                     { value: "De Empleado", label: "De Empleado" },
//                   ]}
//                   {...form.getInputProps("orderSource")}
//                 />
//               </Grid.Col>
//               <Grid.Col span={6}>
//                 <Text size="lg" fw={700}>
//                   Información del Cliente
//                 </Text>
//                 <TextInput
//                   label="Nombre del cliente"
//                   placeholder="Nombre del cliente"
//                   withAsterisk
//                   {...form.getInputProps("customerName")}
//                 />
//                 <TextInput
//                   label="Número de teléfono"
//                   placeholder="Teléfono"
//                   withAsterisk
//                   {...form.getInputProps("phoneNumber")}
//                 />
//                 <TextInput
//                   label="Correo electrónico"
//                   placeholder="Correo (opcional)"
//                   {...form.getInputProps("email")}
//                 />
//               </Grid.Col>
//             </Grid>
//             <Divider my="md" />
//             {/* Payment Method and Delivery Method in one row */}
//             <Grid>
//               <Grid.Col span={6}>
//                 <Text size="lg" fw={700}>
//                   Método de Pago
//                 </Text>
//                 <NumberInput
//                   label="Pago adelantado"
//                   placeholder="Monto adelantado"
//                   withAsterisk
//                   {...form.getInputProps("advancePayment")}
//                 />
//                 <Select
//                   label="Método de pago adelantado"
//                   placeholder="Selecciona una opción"
//                   data={[
//                     { value: "Efectivo", label: "Efectivo" },
//                     { value: "Transferencia", label: "Transferencia" },
//                     { value: "Cheque", label: "Cheque" },
//                     { value: "Tarjeta", label: "Tarjeta" },
//                   ]}
//                   {...form.getInputProps("advancePaymentMethod")}
//                 />
//                 <NumberInput
//                   label="Pago restante"
//                   placeholder="Monto restante"
//                   withAsterisk
//                   {...form.getInputProps("restPayment")}
//                 />
//                 <Select
//                   label="Método de pago restante"
//                   placeholder="Selecciona una opción"
//                   data={[
//                     { value: "Efectivo", label: "Efectivo" },
//                     { value: "Transferencia", label: "Transferencia" },
//                     { value: "Cheque", label: "Cheque" },
//                     { value: "Tarjeta", label: "Tarjeta" },
//                   ]}
//                   {...form.getInputProps("restPaymentMethod")}
//                 />
//               </Grid.Col>
//               <Grid.Col span={6}>
//                 <Text size="lg" fw={700}>
//                   Método de Entrega
//                 </Text>
//                 <Radio.Group
//                   label="Método de entrega"
//                   withAsterisk
//                   {...form.getInputProps("deliveryMethod")}
//                 >
//                   <Flex justify="space-between" align="center" gap={20}>
//                     <Radio.Card radius="md" value="A Domicilio">
//                       <Group
//                         wrap="nowrap"
//                         justify="center"
//                         align="center"
//                         p={20}
//                       >
//                         <Stack gap={10} align="center">
//                           <FaTruckFast size={36} />
//                           <Flex align="center" gap={10}>
//                             <Radio.Indicator size="xs" />
//                             <Text size="xs">A Domicilio</Text>
//                           </Flex>
//                         </Stack>
//                       </Group>
//                     </Radio.Card>

//                     <Radio.Card radius="md" value="En Local">
//                       <Group
//                         wrap="nowrap"
//                         justify="center"
//                         align="center"
//                         p={20}
//                       >
//                         <Stack gap={10} align="center">
//                           <BsShop size={36} />
//                           <Flex align="center" gap={10}>
//                             <Radio.Indicator size="xs" />
//                             <Text size="xs">En Local</Text>
//                           </Flex>
//                         </Stack>
//                       </Group>
//                     </Radio.Card>

//                     <Radio.Card radius="md" value="Punto">
//                       <Group
//                         wrap="nowrap"
//                         justify="center"
//                         align="center"
//                         p={20}
//                       >
//                         <Stack gap={10} align="center">
//                           <BsGeo size={36} />
//                           <Flex align="center" gap={10}>
//                             <Radio.Indicator size="xs" />
//                             <Text size="xs">Punto</Text>
//                           </Flex>
//                         </Stack>
//                       </Group>
//                     </Radio.Card>
//                   </Flex>
//                 </Radio.Group>
//                 {form.values.deliveryMethod === "Meeting Point" && (
//                   <TextInput
//                     label="Punto de encuentro"
//                     placeholder="Ubicación del punto de encuentro"
//                     {...form.getInputProps("meetingPoint")}
//                   />
//                 )}
//               </Grid.Col>
//             </Grid>
//             <Divider my="md" />
//             {/* Final Note */}
//             <Text size="lg" fw={700}>
//               Nota Final19
//             </Text>
//             <Textarea
//               placeholder="Escribe alguna nota adicional"
//               {...form.getInputProps("finalNote")}
//             />
//             {/* Submit Button */}
//             <Button type="submit" fullWidth>
//               Crear Pedido
//             </Button>
//           </>
//         )}

//         {/* PDF Download Link (only visible after submission) */}
//         {pdfData && (
//           <PDFDownloadLink
//             document={pdfData}
//             fileName={`order-invoice-${Date.now()}.pdf`}
//           >
//             Descargar PDF
//           </PDFDownloadLink>
//         )}
//       </Stack>
//     </form>
//   );
// };
