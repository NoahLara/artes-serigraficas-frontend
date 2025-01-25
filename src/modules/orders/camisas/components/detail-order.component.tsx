// import React, { useState } from "react";
// import { Button, Select, NumberInput, Flex, Textarea, Text } from "@mantine/core";
// import { FaRegTrashAlt } from "react-icons/fa";
// import { TbRulerMeasure } from "react-icons/tb";
// import { DetailCamisasOrderInterface } from "./detail-order.interface";

// interface DetailOrderCamisasProps {
//   onDetailChange: (detail: DetailCamisasOrderInterface) => void;
// }

// export const DetailOrderCamisas: React.FC<DetailOrderCamisasProps> = ({ onDetailChange }) => {
//   const [productNote, setProductNote] = useState<string>("");
//   const [productPrice, setProductPrice] = useState<number>(0);
//   const [productDetails, setProductDetails] = useState<DetailCamisasOrderInterface["detail"]>([]);

//   const [priceError, setPriceError] = useState<string | null>(null);

//   const validatePrice = (value: number) => {
//     if (value <= 0) {
//       setPriceError("El precio debe ser mayor a 0.");
//     } else {
//       setPriceError(null);
//     }
//   };

//   const handlePriceChange = (value: number) => {
//     const newPrice = value || 0;
//     validatePrice(newPrice);
//     setProductPrice(newPrice);
//     onDetailChange({ detail: productDetails, note: productNote, price: newPrice });
//   };

//   const addSizeDetail = () => {
//     setProductDetails([...productDetails, { name: "XS", quantity: 0 }]);
//   };

//   const handleSizeChange = (index: number, field: keyof DetailCamisasOrderInterface["detail"][number], value: string | number) => {
//     const updatedDetails = productDetails.map((detail, i) => {
//       if (i === index) {
//         return { ...detail, [field]: value };
//       }
//       return detail;
//     });
//     setProductDetails(updatedDetails);
//     onDetailChange({ detail: updatedDetails, note: productNote, price: productPrice });
//   };

//   const removeSizeDetail = (index: number) => {
//     const updatedDetails = productDetails.filter((_, i) => i !== index);
//     setProductDetails(updatedDetails);
//     onDetailChange({ detail: updatedDetails, note: productNote, price: productPrice });
//   };

//   const handleNoteChange = (value: string) => {
//     setProductNote(value);
//     onDetailChange({ detail: productDetails, note: value, price: productPrice });
//   };

//   return (
//     <div>
//       <NumberInput
//         label="Precio"
//         placeholder="Agrega el precio"
//         value={productPrice}
//         onChange={(value) => handlePriceChange((value as number) || 0)}
//         min={0}
//         step={0.01}
//         decimalScale={2}
//         error={priceError}
//       />
//       {priceError && (
//         <Text color="red" size="sm" mt={4}>
//           {priceError}
//         </Text>
//       )}

//       <Textarea label="Nota" placeholder="Agrega una nota" value={productNote} onChange={(event) => handleNoteChange(event.currentTarget.value)} />

//       {productDetails.map((detail, index) => (
//         <Flex key={index} gap="md" mt="md" align="flex-end">
//           <Select
//             label="Tamaño"
//             data={["2", "4", "6", "8", "10", "12", "14", "16", "XS", "S", "M", "L", "XL", "2XL", "3XL", "4XL"]}
//             value={detail.name as string}
//             onChange={(value) => handleSizeChange(index, "name", value as string)}
//           />
//           <NumberInput label="Cantidad" min={1} value={detail.quantity} onChange={(value) => handleSizeChange(index, "quantity", value)} />
//           <Button variant="outline" color="red" leftSection={<FaRegTrashAlt size={14} />} onClick={() => removeSizeDetail(index)}>
//             Eliminar Talla
//           </Button>
//         </Flex>
//       ))}

//       <Flex gap="md" align="center">
//         <Button variant="outline" mt="sm" leftSection={<TbRulerMeasure size={14} />} onClick={addSizeDetail} disabled={!!priceError}>
//           Agregar Talla
//         </Button>
//       </Flex>
//     </div>
//   );
// };
