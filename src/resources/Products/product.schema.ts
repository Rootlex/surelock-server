import { object, TypeOf, z } from "zod";

export const filterProductSchema = object({
    query: object({
        id: z.string().optional(),
        name: z.string().optional(),
        price: z.string().optional(),
        quantity: z.string().optional(),
        created_at: z.string().optional(),
        updated_at: z.string().optional(),
        is_active: z.string().optional(),
    }),
});

export const insertProductSchema = object({
    body: object({
        name: z.string(),
        price: z.string(),
        quantity: z.number(),
        image_urls: z.array(z.string()),
    }),
});

export const updateProductSchema = object({
    body: object({
        name: z.string().optional(),
        price: z.string().optional(),
        quantity: z.number().optional(),
        image_urls: z.array(z.string()).optional(),
        is_active: z.boolean().optional(),
    }),
});

export type InsertProductInput = TypeOf<typeof insertProductSchema>;
export type UpdateProductInput = TypeOf<typeof updateProductSchema>;
export type FilterProductsInput = TypeOf<typeof filterProductSchema>;
