import { zWorkzag } from "./zods";
export const validateWorkzag = (data: unknown) => {
  return zWorkzag.safeParse(data);
};

export const snakeCase = (str: string) => {
  return str.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`);
};

export const camelCase = (str: string) => {
  return str.replace(/_([a-z])/g, (g) => g[1].toUpperCase());
};

export const toSnakeCase = (json: Record<string, unknown>) => {
  const snakeCased: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(json)) {
    snakeCased[snakeCase(key)] = value;
  }
  return snakeCased;
};

// create a function that converts a camelCased object to snake_cased
