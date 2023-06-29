import { createContext, useReducer } from "react"

type StateType = {
    title: string
    methods: string[]
    cookingTime: number
    ingredients: string[]
}
type ClearActionType = {
    type: "CLEAR_FORM_STATE"
}

type InputActionType = {
    type: "CHANGE_INPUT"
    payload: { name: string; value: string | number }
}

type AddIngredientActionType = {
    type: "ADD_INGREDIENT" | "REMOVE_INGREDIENT"
    payload: string
}
type AddMethodActionType = {
    type: "ADD_METHOD" | "REMOVE_METHOD"
    payload: string
}

type ActionType =
    | InputActionType
    | AddIngredientActionType
    | AddMethodActionType
    | ClearActionType

const INITIAL_FORMSTATE = {
    title: "",
    methods: [],
    cookingTime: 0,
    ingredients: [],
}

export const FormContext = createContext<{
    state: StateType
    dispatch: React.Dispatch<ActionType>
}>({ state: INITIAL_FORMSTATE, dispatch: () => {} })

const formReducer = (state: StateType, action: ActionType) => {
    switch (action.type) {
        case "CHANGE_INPUT":
            return {
                ...state,
                [action.payload.name]: action.payload.value,
            }
        case "ADD_INGREDIENT":
            return {
                ...state,
                ingredients: [...new Set(action.payload.split(","))]
                    .map((ingredient) => ingredient.trim())
                    .filter((word) => word !== ""),
            }
        case "REMOVE_INGREDIENT":
            return {
                ...state,
                ingredients: state.ingredients.filter(
                    (ingredient) => ingredient !== action.payload
                ),
            }
        case "ADD_METHOD":
            return {
                ...state,
                methods: [...state.methods, action.payload.trim()],
            }
        case "REMOVE_METHOD":
            return {
                ...state,
                methods: state.methods.filter(
                    (method) => method !== action.payload
                ),
            }
        case "CLEAR_FORM_STATE":
            return INITIAL_FORMSTATE
        default:
            return state
    }
}

export const FormContextProvider = ({
    children,
}: {
    children: React.ReactNode
}) => {
    const [state, dispatch] = useReducer(formReducer, INITIAL_FORMSTATE)
    return (
        <FormContext.Provider value={{ state, dispatch }}>
            {children}
        </FormContext.Provider>
    )
}
