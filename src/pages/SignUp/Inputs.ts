import { FormInputProps } from "../../types/Types"

const inputClassName = "outline outline-[1px] bg-transparent outline-slate-300 p-2 border-slate-300 rounded-md w-full"
const labelClassName = "font-semibold text-lg w-[110px] cursor-pointer"

export const signUpFormInputs: FormInputProps[] = [
    {
        id: "username",
        name: "username",
        type: "text",
        placeholder: "Enter Username",
        required: true,
        inputClassName: inputClassName,
        labelClassName: labelClassName,
        label: 'Username'
    },
    {
        id: "email",
        name: "email",
        type: "email",
        placeholder: "Enter Email",
        required: true,
        inputClassName: inputClassName,
        labelClassName: labelClassName,
        label: 'Email'
    },
    {
        id: "password",
        name: "password",
        type: "password",
        placeholder: "Enter password",
        required: true,
        inputClassName: inputClassName,
        labelClassName: labelClassName,
        label: 'Password'
    },
]
