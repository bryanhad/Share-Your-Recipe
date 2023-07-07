import { z } from "zod";

export const RecipeSchema = z.object({
    title: z.string(),
    ingredients: z.array(z.string()),
    methods: z.array(z.string()),
    cookingTime: z.number(),
    createdBy: z.object({
        displayName: z.string(),
        id: z.string(),
        photoUrl: z.string(),
    })
})