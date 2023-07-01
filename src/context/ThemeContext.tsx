import { createContext, useEffect, useReducer, useState } from "react"

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

// I am not so sure about this function below bois.. but it gets the job done lol
const GET_INITIAL_THEME_STATE = () => {
    const INITIAL_THEME_STATE = { theme: "light", color: "bg-amber-400" }
    const localStorageValue = localStorage.getItem("theme")
    if (localStorageValue) {
        const themeObj: StateType = JSON.parse(localStorageValue)
        if (themeObj.theme === "light" && themeObj.color === "bg-amber-400") {
            return INITIAL_THEME_STATE
        }
        return themeObj
    } else {
        return INITIAL_THEME_STATE
    }
}

const INITIAL_THEMESTATE = GET_INITIAL_THEME_STATE()

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

export const ThemeContextProvider = ({
    children,
}: {
    children: React.ReactNode
}) => {
    const [state, dispatch] = useReducer(themeReducer, INITIAL_THEMESTATE)

    useEffect(() => {
        localStorage.setItem("theme", JSON.stringify(state))
    }, [state])

    return (
        <ThemeContext.Provider value={{ state, dispatch }}>
            {children}
        </ThemeContext.Provider>
    )
}
