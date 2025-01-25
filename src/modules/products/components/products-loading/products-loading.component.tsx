import { Skeleton, Grid } from "@mantine/core";

export const ProductsLoading = () => {
  return (
    <Grid gutter="md" justify="flex-start">
      {Array.from({ length: 12 }).map((_, index) => (
        <Grid.Col key={index} span={3}>
          <Skeleton height={350} radius="xs" />
        </Grid.Col>
      ))}
    </Grid>
  );
};
