import React from "react";
import { NotFoundProps } from "./not-found.interfaces";
import { Text } from "@mantine/core";

export const NotFound: React.FC<NotFoundProps> = ({ text }) => {
  return (
    <Text c="dimmed" mt="lg" ta="center" p={40}>
      {text}
    </Text>
  );
};
