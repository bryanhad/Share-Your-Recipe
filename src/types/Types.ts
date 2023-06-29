export type RecipeType = {
    id: string
    title: string
    ingredients: string[]
    methods: string[]
    cookingTime: number
    createdBy: string
}

export type OptionsType = {
    method: string
    headers: {
        "Content-Type": string
    }
    body: string
}