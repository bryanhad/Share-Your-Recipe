export type RecipeType = {
    id: string
    title: string
    ingredients: string[]
    methods: string[]
    cookingTime: number
    createdBy: { id: string; displayName: string; photoUrl: string }
}

export type OptionsType = {
    method: string
    headers: {
        "Content-Type": string
    }
    body: string
}

export type CreateUserFormInputProps = {
    name: "username" | "email" | "password" | "confirmPassword"
    type: "text" | "password" | "email" | "number"
    placeholder?: string
    inputClassName: string
    labelClassName?: string
    label?: string
}
export type LoginUserFormInputProps = {
    name: "email" | "password"
    type: "text" | "password" | "email" | "number"
    placeholder?: string
    inputClassName: string
    labelClassName?: string
    label?: string
}

export type ToastTypes = "info" | "success" | "warning" | "error" | "default"

export interface UserDataType {
    displayName: string
    email: string
    id: string
    profilePic: string
    coverPic: string | null
    quote: string | null
}

export interface CurrentUserDataWithRecipesType extends UserDataType {
    recipes: RecipeType[] | []
}
