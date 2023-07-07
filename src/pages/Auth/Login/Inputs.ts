import { LoginUserFormInputProps } from "../../../types/Types"

const inputClassName =
    "outline outline-[1px] bg-transparent outline-slate-300 p-2 border-slate-300 rounded-md w-full"
const labelClassName = "font-semibold text-lg w-[110px] cursor-pointer"

export const loginFormInputs: LoginUserFormInputProps[] = [
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
]
