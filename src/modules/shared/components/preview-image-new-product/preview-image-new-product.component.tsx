import React, { useRef, useState } from "react";
import { Box, Button, Group, Image } from "@mantine/core";
import { FaImage } from "react-icons/fa";
import * as S from "./preview-image-new-product.styles";
import { toBase64 } from "../../util";

interface CustomImageInputProps {
  value: string | ArrayBuffer | null;
  onChange: (base64: string | ArrayBuffer | null) => void;
}

export const PreviewImageNewProduct: React.FC<CustomImageInputProps> = ({
  // value,
  onChange,
}) => {
  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    if (file) {
      setPreview(URL.createObjectURL(file));
      const base64: string | ArrayBuffer | null = await toBase64(file);
      onChange(base64);
    }
  };

  const handleRemove = () => {
    setPreview(null);
    onChange(null);
  };

  return (
    <Box>
      {preview ? (
        <Box>
          <Image
            src={preview}
            alt="Preview"
            // withPlaceholder
            width={250}
            height={250}
            style={{ objectFit: "contain" }}
          />
          <Group ps="center" mt="sm">
            <Button size="xs" onClick={handleRemove} variant="outline" color="red">
              Remove
            </Button>
            <Button size="xs" component="label" variant="outline">
              Replace
              <input type="file" accept="image/*" style={{ display: "none" }} onChange={handleFileChange} />
            </Button>
          </Group>
        </Box>
      ) : (
        <div onClick={() => fileInputRef.current?.click()}>
          <S.PlaceholderImage>
            <FaImage size={128} color="gray" />
            <input type="file" id="input-image" accept="image/*" ref={fileInputRef} style={{ display: "none" }} onChange={handleFileChange} />
          </S.PlaceholderImage>
        </div>
      )}
    </Box>
  );
};
