import { CreateUserFormInputProps } from "../../../types/Types"

const inputClassName =
    "outline outline-[1px] bg-transparent outline-slate-300 p-2 rounded-md w-full"
const labelClassName = "font-semibold text-lg cursor-pointer text-slate-500 "

export const signUpFormInputs: CreateUserFormInputProps[] = [
    {
        name: "username",
        type: "text",
        placeholder: "Enter Username",
        inputClassName: inputClassName,
        labelClassName: labelClassName,
        label: "Username",
    },
    {
        name: "email",
        type: "email",
        placeholder: "Enter Email",
        inputClassName: inputClassName,
        labelClassName: labelClassName,
        label: "Email",
    },
    {
        name: "password",
        type: "password",
        placeholder: "Enter password",
        inputClassName: inputClassName,
        labelClassName: labelClassName,
        label: "Password",
    },
    {
        name: "confirmPassword",
        type: "password",
        placeholder: "Confirm password",
        inputClassName: inputClassName,
        labelClassName: labelClassName,
        label: "Confirm Password",
    },
]
