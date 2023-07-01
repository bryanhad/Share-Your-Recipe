import { createContext, useState } from "react"

type NavbarContextType = {
    nav:boolean
    setNav: React.Dispatch<React.SetStateAction<boolean>>
    dropDown: boolean
    setDropDown: React.Dispatch<React.SetStateAction<boolean>>
} 

export const NavbarContext = createContext<NavbarContextType>({nav:false, setNav:() => {}, dropDown:false, setDropDown:() => {}})

export const NavbarContextProvider = ({
    children,
}: {
    children: React.ReactNode
}) => {
    const [nav, setNav] = useState(false)
    const [dropDown, setDropDown] = useState(false)

    return (
        <NavbarContext.Provider value={{ nav, setNav, dropDown, setDropDown }}>
            {children}
        </NavbarContext.Provider>
    )
}
