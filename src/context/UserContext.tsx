import { createContext, useEffect, useReducer } from "react"
import { UserDataType } from "../types/Types"

type LoginActionType = {
    type: 'LOGIN'
    payload: UserDataType
}
type LogoutActionType = {
    type: 'LOGOUT'
}

type ActionType = LoginActionType | LogoutActionType

const localStorageUser = localStorage.getItem('user')
const INITIAL_USER_STATE:UserDataType | null = typeof localStorageUser === 'string' ? JSON.parse(localStorageUser) : null

export const UserContext = createContext<{userState:UserDataType|null, dispatch: React.Dispatch<ActionType>}>({userState:INITIAL_USER_STATE, dispatch:() => {}})

const userReducer = (userState: UserDataType|null, action:ActionType) => {
    switch(action.type) {
        case 'LOGIN':
            return action.payload
        case 'LOGOUT':
            return null
        default:
            return userState
    }
}

export const UserContextProvider = ({children}:{children:React.ReactNode}) => {
    const [userState, dispatch] = useReducer(userReducer, INITIAL_USER_STATE)

    useEffect(() => {
        localStorage.setItem('user', JSON.stringify(userState))
    }, [userState])


    return <UserContext.Provider value={{userState, dispatch}}>
        {children}
    </UserContext.Provider>
}