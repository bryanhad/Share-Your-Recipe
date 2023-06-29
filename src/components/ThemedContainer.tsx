import { useContext } from "react"
import { ThemeContext } from "../context/ThemeContext"

export default function ThemedContainer({
    children, className
}: {
    children: React.ReactNode, className?:string
}) {
    const { state } = useContext(ThemeContext)

    return (
        <div
            className={`${
                state.theme === "dark"
                    ? "bg-gray-500/50 text-gray-300"
                    : "bg-white"
            } p-4 rounded-md shadow-md mx-auto ${className}`}
        >
            {children}
        </div>
    )
}
