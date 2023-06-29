import { useContext } from "react"
import { ThemeContext } from "../context/ThemeContext"
import { Link } from "react-router-dom"

type ButtonProps = {
    type?: "button" | "submit" | "reset"
    onclick?: any
    children: string
    className?: string
    href?: string
}

export default function Button({
    type,
    onclick,
    children,
    className,
    href,
}: ButtonProps) {
    const { state } = useContext(ThemeContext)

    if (href)
        return (
            <Link
                to={href}
                className={`duration-300 py-3 px-6 rounded-md font-semibold text-base sm:text-2xl ${
                    state.theme === "dark"
                        ? "bg-gray-500 text-gray-300"
                        : `${state.color} text-white`
                } ${className}`}
            >
                {children}
            </Link>
        )

    return (
        <button
            type={type}
            onClick={onclick}
            className={`duration-300 py-3 px-6 rounded-md font-semibold text-base sm:text-2xl ${
                state.theme === "dark"
                    ? "bg-gray-500 text-gray-300"
                    : `${state.color} text-white`
            } ${className}`}
        >
            {children}
        </button>
    )
}
