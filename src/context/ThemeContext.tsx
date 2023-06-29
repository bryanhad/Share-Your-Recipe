import { createContext, useReducer } from "react"

type StateType = {
    theme: string
    color: string
}

type ThemeActionType = {
    type: "CHANGE_THEME"
}
type ColorActionType = {
    type: "CHANGE_COLOR"
    payload: string
}
type ActionType = ThemeActionType | ColorActionType

const INITIAL_THEMESTATE = {
    theme: "light",
    color: "bg-amber-400",
}

export const ThemeContext = createContext<{
    state: StateType
    dispatch: React.Dispatch<ActionType>
}>({ state: INITIAL_THEMESTATE, dispatch: () => {} })

const themeReducer = (state: StateType, action: ActionType) => {
    switch (action.type) {
        case "CHANGE_THEME":
            return {
                ...state,
                theme: state.theme === "dark" ? "light" : "dark",
            }
        case "CHANGE_COLOR":
            return {
                ...state,
                color: action.payload,
            }
    }
}

export const ThemeContextProvider = ({ children }: { children: React.ReactNode }) => {
    const [state, dispatch] = useReducer(themeReducer, INITIAL_THEMESTATE)


    return <ThemeContext.Provider value={{state, dispatch}}>{children}</ThemeContext.Provider>
}
