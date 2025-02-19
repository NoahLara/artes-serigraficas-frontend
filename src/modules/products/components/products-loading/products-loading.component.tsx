import { Skeleton, Grid, Text } from "@mantine/core";

export const ProductsLoading = () => {
  return (
    <>
      <Text size="xl">Los Productos se estan cargando porfavor espere.</Text>
      <Grid gutter="md" justify="flex-start">
        {Array.from({ length: 12 }).map((_, index) => (
          <Grid.Col key={index} span={3}>
            <Skeleton height={350} radius="xs" />
          </Grid.Col>
        ))}
      </Grid>
    </>
  );
};
