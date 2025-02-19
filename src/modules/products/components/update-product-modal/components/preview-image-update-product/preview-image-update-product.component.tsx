import React, { useRef, useState, useEffect } from "react";
import { Box, Button, Group, Image } from "@mantine/core";
import { FaImage } from "react-icons/fa";
import * as S from "./preview-image-update-product.styles";
import { toBase64 } from "../../../../../shared/util";

interface CustomImageInputProps {
  loading: boolean;
  value: string | ArrayBuffer | null;
  onChange: (base64: string | ArrayBuffer | null) => void;
}

export const PreviewImageUpdateProduct: React.FC<CustomImageInputProps> = ({ loading, value, onChange }) => {
  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Initialize the preview state with the value prop
  useEffect(() => {
    if (typeof value === "string") {
      setPreview(value);
    } else {
      setPreview(null);
    }
  }, [value]);

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
    onChange(null); // Notify the parent component that the image was removed
  };

  return (
    <Box>
      {preview ? (
        <Box>
          <Image src={preview} alt="Preview" width={250} height={250} style={{ objectFit: "contain" }} />
          {!loading && (
            <Group ps="center" mt="sm">
              <Button size="xs" onClick={handleRemove} variant="outline" color="red">
                Remover
              </Button>
              <Button size="xs" component="label" variant="outline">
                Reemplazar
                <input type="file" accept="image/*" style={{ display: "none" }} onChange={handleFileChange} />
              </Button>
            </Group>
          )}
        </Box>
      ) : (
        <div onClick={() => (!loading ? fileInputRef.current?.click() : null)}>
          <S.PlaceholderImage>
            <FaImage size={128} color="gray" />
            <input type="file" id="input-image" accept="image/*" ref={fileInputRef} style={{ display: "none" }} onChange={handleFileChange} />
          </S.PlaceholderImage>
        </div>
      )}
    </Box>
  );
};
