import {z} from 'zod'

export const LoginUserFormSchema = z.object({
    email: z
    .string()
    .email({ message: "Please use valid email" })
    .trim()
    .toLowerCase(),
    password: z
    .string()
    .min(6, { message: "Minimum password length is 6 characters" })
    .max(20, { message: "Maxiumum password length is 20 characters" }),
})