import { Product } from "../../shared/core/interfaces";

type ImageModule = { default: string };

// Fetching products and returning the data after it's ready
export const getProduct = async (): Promise<Product[]> => {
  const urls = await getData();
  const productsData = generateDataArray(urls);
  return productsData;
};

// Fetching image URLs dynamically using Vite's glob import
export const getData = async (): Promise<string[]> => {
  const images = import.meta.glob("/public/base_de_datos_productos/*");

  // Get all image paths
  const urls = await Promise.all(
    Object.keys(images).map(async (key) => {
      const module = (await images[key]()) as ImageModule;
      return module.default;
    })
  );
  return urls; // Return the URLs array
};

// Generate the array of product objects
export const generateDataArray = (urls: string[]): Product[] => {
  return urls.map((url) => ({
    id: generateId(url),
    name: getName(url),
    image: url,
  }));
};

// Generate a unique ID based on the image path (shuffled string of the filename)
const generateId = (path: string): string => {
  if (!path) {
    throw new Error("Path cannot be empty");
  }

  const index = path.lastIndexOf("/");
  const name = index !== -1 ? path.substring(index + 1) : path;

  // Generate a random ID by shuffling the characters of the name
  const id = name
    .split("") // Split name into characters
    .sort(() => Math.random() - 0.5) // Shuffle characters randomly
    .join("") // Join shuffled characters
    .toUpperCase(); // Convert to uppercase

  return id;
};

// Extract the name from the path (without extension and in uppercase)
const getName = (path: string): string => {
  if (!path) {
    throw new Error("Path cannot be empty");
  }

  const slashIndex = path.lastIndexOf("/");
  const pointIndex = path.lastIndexOf(".");

  // Get the name without extension
  const name =
    slashIndex !== -1 ? path.substring(slashIndex + 1, pointIndex) : path;

  return name.toUpperCase();
};
