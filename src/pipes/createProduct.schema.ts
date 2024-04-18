import { z } from 'zod';

export const createProductSchema = z
  .object({
    name: z.string(),
    description: z.string(),
    price: z.number(),
    stock: z.number(),
    imgUrl: z.string(),
    category: z.string(),
  })
  .required();

export type ProductsDto = z.infer<typeof createProductSchema>;