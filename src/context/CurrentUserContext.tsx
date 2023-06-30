import { createContext, useReducer, useEffect } from "react"
import { User } from "firebase/auth"

type LoginActionType = {
    type: "LOGIN"
    paylaod: User
}
type LogoutActionType = {
    type: "LOGOUT"
}
type ActionType = LoginActionType | LogoutActionType

type UserStateType = {
    currentUser: User | null
}

const localStorageValue = localStorage.getItem("user")

const INITIAL_USER_STATE: UserStateType = {
    // have to check whether the localStorage.getItem('user') returns a string or not or else Typescript will be mad lol
    currentUser:
        typeof localStorageValue === "string"
            ? JSON.parse(localStorageValue)
            : null,
}

export const CurrentUserContext = createContext<{
    state: UserStateType
    dispatch: React.Dispatch<ActionType>
}>({ state: INITIAL_USER_STATE, dispatch: () => {} })

const currentUserReducer = (state: UserStateType, action: ActionType) => {
    switch (action.type) {
        case "LOGIN":
            return {
                currentUser: action.paylaod,
            }
        case "LOGOUT":
            return {
                currentUser: null,
            }
        default:
            return state
    }
}

export const CurrentUserProvider = ({
    children,
}: {
    children: React.ReactNode
}) => {
    const [state, dispatch] = useReducer(currentUserReducer, INITIAL_USER_STATE)

    useEffect(() => {
        localStorage.setItem("user", JSON.stringify(state.currentUser))
    }, [state.currentUser])

    return (
        <CurrentUserContext.Provider value={{ state, dispatch }}>
            {children}
        </CurrentUserContext.Provider>
    )
}
