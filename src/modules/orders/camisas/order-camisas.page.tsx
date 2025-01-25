// import { ReactElement, useState, useEffect } from "react";
// import { TextInput, NumberInput, Button, Select, Stack, Group, Divider, Text, Flex, Modal, Switch, Grid, Radio, Checkbox } from "@mantine/core";
// import { useForm } from "@mantine/form";
// import { MdAssignmentAdd } from "react-icons/md";
// import { FaFileInvoiceDollar } from "react-icons/fa";
// import dayjs from "dayjs";
// import { OrderCamisasInterface } from "./order-camisas.interface";
// import { DateTimePicker } from "@mantine/dates";
// import { DocumentProps, pdf } from "@react-pdf/renderer";
// // import { OrderConjuntoPDF } from "../../shared/components/pdf-formats/order-conjunto/order-conjunto.pdf";
// // import { InvoicePDF } from "../../shared/components/pdf-formats/invoice/invoice.pdf";
// import { useDisclosure } from "@mantine/hooks";
// import * as S from "./order-camisas.styles";
// import { DetailCamisasOrderInterface } from "./components/detail-order.interface";
// import { DetailOrderCamisas } from "./components/detail-order.component";
// import { FaTruckFast } from "react-icons/fa6";
// import { BsGeo, BsShop } from "react-icons/bs";

// export const OrderCamisas = () => {
//   // Form setup with validation rules
//   const form = useForm<OrderCamisasInterface>({
//     initialValues: {
//       date: new Date(),
//       madeDate: new Date(),
//       customer: {
//         customerName: "",
//         customerPhone: "",
//         applyIVA: undefined,
//       },
//       payment: {
//         advancePayment: 0.0,
//         advancePaymentMethod: "",
//         restPayment: 0.0,
//         restPaymentMethod: "",
//       },
//       neckType: "",
//       sizeAndFit: "",
//       color: "",
//       fabric: "",
//       fabricThickness: 0,
//       specialProperties: [],
//       sleeveType: "",
//       customizationTechniques: "",
//       customizationLocations: [],
//     },

//     validate: {
//       date: (value) => (!value ? "La fecha de entrega es obligatoria" : null),
//       madeDate: (value) => (!value ? "La fecha de creación es obligatoria" : null),
//       customer: {
//         customerName: (value) => (value.trim().length === 0 ? "El nombre del cliente es obligatorio" : null),
//         customerPhone: (value) => (value.trim().length === 0 ? "El número de teléfono es obligatorio" : null),
//         applyIVA: (value) => (value === null ? "El IVA es obligatorio" : null),
//       },
//       payment: {
//         advancePayment: (value) => (value < 0 ? "El pago adelantado no puede ser negativo" : null),
//         advancePaymentMethod: (value) => (value.trim().length === 0 ? "El método de pago es obligatorio" : null),
//         restPayment: (value) => (value < 0 ? "El pago restante no puede ser negativo" : null),
//         restPaymentMethod: (value) => (value.trim().length === 0 ? "El método de pago es obligatorio" : null),
//       },
//       neckType: (value) => (value.trim().length === 0 ? "El tipo de cuello es obligatorio" : null),
//       sizeAndFit: (value) => (value.trim().length === 0 ? "La talla y ajuste son obligatorios" : null),
//       color: (value) => (value.trim().length === 0 ? "El color es obligatorio" : null),
//       fabric: (value) => (value.trim().length === 0 ? "El tipo de tela es obligatorio" : null),
//       fabricThickness: (value) => (value <= 0 ? "El grosor de la tela debe ser mayor que cero" : null),
//       specialProperties: (value) => (value.length === 0 ? "Debe seleccionar al menos una propiedad especial" : null),
//       sleeveType: (value) => (value.trim().length === 0 ? "El tipo de manga es obligatorio" : null),
//       customizationTechniques: (value) => (value.trim().length === 0 ? "Almenos una tecnica de personalización es obligatoria" : null),
//       customizationLocations: (value) => (value.length === 0 ? "Debe seleccionar al menos una ubicación para estampar" : null),
//     },
//   });

//   const [detailOrder, setDetailOrder] = useState<DetailCamisasOrderInterface | null>(null);

//   const [total, setTotal] = useState<number>(0);
//   const [pdfOrderData, setPdfOrderData] = useState<ReactElement<DocumentProps> | null>(null);
//   const [pdfInvoiceData, setPdfInvoiceData] = useState<ReactElement<DocumentProps> | null>(null);
//   const [openedPDFModal, { open: openPDFModal, close: closePDFModal }] = useDisclosure(false);

//   // Handle form submission
//   const handleSubmit = (values: typeof form.values) => {
//     // FOR FACTURA
//     const formattedValues: OrderCamisasInterface = {
//       ...values,
//       madeDate: dayjs(values.madeDate).format("dddd DD MMMM YYYY hh:mm A"),
//       date: dayjs(values.date).format("dddd DD MMMM YYYY hh:mm A"),
//     };

//     console.log("Order Form Submitted:", formattedValues);
//     console.log("Detail Order:", detailOrder);

//     // const pdfDocument = (
//     //   <OrderConjuntoPDF
//     //     detailOrder={detailOrder}
//     //     customer={form.getValues().customer}
//     //     deliveryDate={dayjs(form.getValues().date).format("dddd DD MMMM YYYY hh:mm A")}
//     //   />
//     // );

//     // const pdfInvoice = <InvoicePDF detailOrder={detailOrder} paymentInAdvance={form.getValues().payment.advancePayment} customer={form.getValues().customer} />;

//     // Save the PDF document in the state for rendering
//     // setPdfOrderData(pdfDocument);
//     // Save the PDF Invoice document in the state for rendering
//     // setPdfInvoiceData(pdfInvoice);
//     // openPDFModal();
//   };

//   const getTotal = (details: DetailCamisasOrderInterface | null, applyIVA: boolean | null) => {
//     if (!details) return 0;
//     // Calculate the total by multiplying price by quantity
//     const totalAmount = details.detail.reduce((sizeSum, sizeDetail) => sizeSum + sizeDetail.quantity * (details.price / 100), 0);

//     // If IVA is applied, calculate IVA and add to total
//     const totalWithIVA = applyIVA ? totalAmount * 1.13 : totalAmount;

//     return totalWithIVA;
//   };

//   const handleDetailChange = (updatedDetails: DetailCamisasOrderInterface) => {
//     setDetailOrder(updatedDetails);
//     setTotal(getTotal(updatedDetails, form.getValues().customer.applyIVA ?? false)); // Recalculate total with IVA
//   };

//   // Recalculate total whenever applyIVA changes
//   useEffect(() => {
//     setTotal(getTotal(detailOrder, form.getValues().customer.applyIVA ?? false));
//   }, [form.values.customer.applyIVA, detailOrder, getTotal, setTotal, setDetailOrder, form]);

//   return (
//     <form onSubmit={form.onSubmit(handleSubmit)}>
//       <Stack gap="md">
//         {/* CUSTOMER DETAILS */}
//         <Text size="lg" fw={700}>
//           Detalles del Cliente
//         </Text>

//         <Flex gap={5} align="center">
//           <TextInput
//             flex={3}
//             label="Nombre del Cliente"
//             placeholder="Ingrese el nombre del cliente"
//             withAsterisk
//             {...form.getInputProps("customer.customerName")}
//           />
//           <TextInput flex={1} label="Teléfono del Cliente" placeholder="9999-9999" withAsterisk {...form.getInputProps("customer.customerPhone")} />
//         </Flex>
//         <Switch
//           label="¿Cliente aplica a IVA?"
//           checked={form.values.customer.applyIVA}
//           onChange={(e) => form.setFieldValue("customer.applyIVA", e.currentTarget.checked)}
//         />

//         {/* ORDER DETAIL */}
//         <Divider my="sm" />
//         <Text size="lg" fw={700}>
//           Detalle del Pedido
//         </Text>

//         <DetailOrderCamisas onDetailChange={handleDetailChange}></DetailOrderCamisas>

//         <>
//           {/* ORDER OPTIONS */}
//           <Divider my="md" />
//           <Grid>
//             <Grid.Col span={6}>
//               <Stack>
//                 {/* TIPO DE CUELLO */}
//                 <Radio.Group label="Tipo de Cuello:" withAsterisk {...form.getInputProps("neckType")}>
//                   <Group mt="xs">
//                     <Radio value="Redondo" label="Redondo" />
//                     <Radio value="V" label="V" />
//                     <Radio value="Polo" label="Polo" />
//                   </Group>
//                 </Radio.Group>
//                 {/* Gramaje */}
//                 <Radio.Group label="Gramage:" withAsterisk {...form.getInputProps("fabricThickness")}>
//                   <Group mt="xs">
//                     <Radio value="170" label="170" />
//                     <Radio value="180" label="180" />
//                     <Radio value="190" label="190" />
//                   </Group>
//                 </Radio.Group>
//                 {/* TAMANO Y MEDIDA */}
//                 <Radio.Group label="Proporcion:" withAsterisk {...form.getInputProps("sizeAndFit")}>
//                   <Group mt="xs">
//                     <Radio value="Ovisize/Agrandado" label="Ovisize/Agrandado" />
//                     <Radio value="Normal" label="Normal" />
//                     <Radio value="Stretch" label="Stretch" />
//                   </Group>
//                 </Radio.Group>
//                 {/* Tipo de Tela */}
//                 <Radio.Group label="Tipo de Tela:" withAsterisk {...form.getInputProps("fabric")}>
//                   <Group mt="xs">
//                     <Radio value="Algodón" label="Algodón" />
//                     <Radio value="P. Durazno" label="P. Durazno" />
//                     <Radio value="Poliester" label="Poliester" />
//                   </Group>
//                 </Radio.Group>
//                 {/* Propiedades Especiales */}
//                 <Checkbox.Group defaultValue={["react"]} label="Propiedades especiales" {...form.getInputProps("specialProperties")}>
//                   <Group mt="xs">
//                     <Checkbox value="Reflectiva" label="Reflectiva" />
//                     <Checkbox value="Impermeable" label="Impermeable" />
//                     <Checkbox value="Elástica" label="Elástica" />
//                     <Checkbox value="Antimicrobiana" label="Antimicrobiana" />
//                     <Checkbox value="Ignífuga" label="Ignífuga" />
//                     <Checkbox value="Corta viento" label="Corta viento" />
//                     <Checkbox value="Respirable" label="Respirable" />
//                     <Checkbox value="Anti-Rayos UV" label="Anti-Rayos UV" />
//                     <Checkbox value="Antiestática" label="Antiestática" />
//                   </Group>
//                 </Checkbox.Group>
//               </Stack>
//             </Grid.Col>
//             <Grid.Col span={6}>
//               <Stack>
//                 {/* Tipo de Mangas */}
//                 <Radio.Group label="Tipo de Mangas:" withAsterisk {...form.getInputProps("sleeveType")}>
//                   <Group mt="xs">
//                     <Radio value="Manga Corta" label="Manga Corta" />
//                     <Radio value="Manga Larga" label="Manga Larga" />
//                     <Radio value="Manga 3/4" label="Manga 3/4" />
//                     <Radio value="Manga hasta el codo" label="Manga hasta el codo" />
//                   </Group>
//                 </Radio.Group>
//                 {/* Tecnicas*/}
//                 <Radio.Group label="Tecnica:" withAsterisk {...form.getInputProps("customizationTechniques")}>
//                   <Group mt="xs">
//                     <Radio value="Sublimacion" label="Sublimacion" />
//                     <Radio value="Serigrafia" label="Serigrafia" />
//                     <Radio value="Vinil" label="Vinil" />
//                     <Radio value="Bordado" label="Bordado" />
//                   </Group>
//                 </Radio.Group>
//                 {/* Lados de estapado*/}
//                 <Checkbox.Group defaultValue={["react"]} label="Lados a estampar:" {...form.getInputProps("customizationLocations")}>
//                   <Group mt="xs">
//                     <Checkbox value="Pecho" label="Pecho" />
//                     <Checkbox value="Espalda" label="Espalda" />
//                     <Checkbox value="Manga" label="Manga" />
//                   </Group>
//                 </Checkbox.Group>
//                 {/* Color */}
//                 <TextInput label="Color: " placeholder="Color de Camisas" {...form.getInputProps("color")} />
//               </Stack>
//             </Grid.Col>
//           </Grid>
//         </>

//         {/* PAYMENT DETAILS */}
//         <Divider my="sm" />
//         <Text size="lg" fw={700}>
//           Detalles de Pago
//         </Text>

//         <Text size="lg" fw={700}>
//           Total del Pedido: ${total.toFixed(2)}
//         </Text>

//         <NumberInput
//           label="Pago Adelantado"
//           placeholder="Ingrese el pago adelantado"
//           withAsterisk
//           {...form.getInputProps("payment.advancePayment")}
//           max={total}
//           min={0}
//         />

//         <Select
//           label="Método de Pago Adelantado"
//           placeholder="Seleccione un método"
//           data={["Efectivo", "Transferencia", "Tarjeta"]}
//           withAsterisk
//           {...form.getInputProps("payment.advancePaymentMethod")}
//         />

//         <Text size="lg" fw={700}>
//           Restate total: ${(total - form.getValues().payment.advancePayment).toFixed(2)}
//         </Text>

//         <Select
//           label="Método de Pago Restante"
//           placeholder="Seleccione un método"
//           data={["Efectivo", "Transferencia", "Tarjeta"]}
//           withAsterisk
//           {...form.getInputProps("payment.restPaymentMethod")}
//         />

//         {/* GENERAL DETAILS SECTION */}
//         <Text size="lg" fw={700}>
//           Detalles Generales
//         </Text>

//         <DateTimePicker
//           label="Fecha de Creación"
//           placeholder="Seleccione la fecha de creación"
//           withAsterisk
//           lang="es"
//           clearable
//           valueFormat="DD MMM YYYY hh:mm A"
//           value={form.values.madeDate as Date}
//           onChange={(date) => form.setFieldValue("madeDate", date || new Date())}
//         />

//         <DateTimePicker
//           label="Fecha de Entrega"
//           placeholder="Seleccione la fecha de entrega"
//           withAsterisk
//           lang="es"
//           clearable
//           valueFormat="DD MMM YYYY hh:mm A"
//           value={form.values.date as Date}
//           onChange={(date) => form.setFieldValue("date", date || new Date())}
//         />

//         {/* SUBMIT BUTTON */}
//         <Group mt="md">
//           <Button type="submit">Generar Pedido</Button>
//         </Group>
//       </Stack>

//       <Modal opened={openedPDFModal} onClose={closePDFModal} title="Hojas de Pedido">
//         {/* HOJA PEDIDO */}
//         {pdfOrderData && (
//           <S.ModalContainer>
//             {/* HOJA DE PEDIDO */}
//             <S.CardPDF
//               onClick={async () => {
//                 // Ensure pdfOrderData is not null
//                 if (pdfOrderData) {
//                   // Generate the PDF as a Blob
//                   const blob = await pdf(pdfOrderData).toBlob();

//                   // Create a URL for the Blob and open it in a new tab
//                   const url = URL.createObjectURL(blob);
//                   window.open(url, "_blank");
//                 }
//               }}
//             >
//               <MdAssignmentAdd className="iconPdf" />
//               <span>Hoja de Pedido</span>
//             </S.CardPDF>

//             <S.CardPDF
//               onClick={async () => {
//                 // Ensure pdfOrderData is not null
//                 if (pdfInvoiceData) {
//                   // Generate the PDF as a Blob
//                   const blob = await pdf(pdfInvoiceData).toBlob();

//                   // Create a URL for the Blob and open it in a new tab
//                   const url = URL.createObjectURL(blob);
//                   window.open(url, "_blank");
//                 }
//               }}
//             >
//               <FaFileInvoiceDollar className="iconPdf" />
//               <span>Factura</span>
//             </S.CardPDF>
//           </S.ModalContainer>
//         )}
//       </Modal>
//     </form>
//   );
// };
