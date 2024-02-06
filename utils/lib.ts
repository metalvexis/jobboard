import { zWorkzag } from "./zods";
export const validateWorkzag = (data: unknown) => {
  return zWorkzag.safeParse(data);
};
