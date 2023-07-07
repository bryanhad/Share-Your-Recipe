import { z } from "zod"

export const CreateUserFormSchema = z
    .object({
        username: z
            .string()
            .trim()
            .min(3, { message: "Username must be atleast 3 characters long!" })
            .max(20, { message: "Username cannot be 20 characters long" }),
        email: z
            .string()
            .email({ message: "Please use valid email" })
            .trim()
            .toLowerCase(),
        password: z
            .string()
            .min(6, { message: "Minimum password length is 6 characters" })
            .max(20, { message: "Maxiumum password length is 20 characters" }),
        confirmPassword: z.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
        path: ["confirmPassword"],
        message: "Password do not match",
    })