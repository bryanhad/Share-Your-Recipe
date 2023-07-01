import { ReactNode, useContext } from "react"
import { ThemeContext } from "../context/ThemeContext"
import { Link } from "react-router-dom"
import useThemeColor from "../hooks/useThemeColor"

type ButtonProps = {
    type: "button" | "submit" | "link"
    onclick?: any
    children: ReactNode
    className?: string
    href?: string
    style: "fill" | "outline" | "inverted" | "colorfulInverted"
}

export default function Button({
    type,
    onclick,
    children,
    className,
    href,
    style,
}: ButtonProps) {
    const { state } = useContext(ThemeContext)
    const { themeColor } = useThemeColor()

    let coolStyles

    switch (style) {
        case "fill":
            coolStyles =
                state.theme === "dark"
                    ? "bg-gray-500 text-gray-300"
                    : `${state.color} text-white`
            break
        case "outline":
            coolStyles = "outline outline-[1px] outline-white text-white"
            break
        case "inverted":
            coolStyles = `${themeColor.text} bg-white`
            break
        case 'colorfulInverted':
            coolStyles = `${state.theme === 'dark' ? 'text-slate-500' : themeColor.text +" "+ themeColor.outline} outline outline-[1px]`
            break
        default:
            coolStyles = "bg-red-600"
    }

    switch (type) {
        case "button":
        case "submit":
            return (
                <button
                    type={type}
                    onClick={onclick}
                    className={` duration-300 text-base sm:text-xl rounded-md ${coolStyles} ${className}`}
                >
                    {children}
                </button>
            )
        case "link": {
            if (href) {
                return (
                    <Link
                        to={href}
                        className={` duration-300 text-base sm:text-xl rounded-md ${coolStyles} ${className}`}
                    >
                        {children}
                    </Link>
                )
            } else {
                return (
                    <button className="bg-rose-500 text-white font-bold">
                        ENTER HREF!
                    </button>
                )
            }
        }
        default:
            return (
                <button className="bg-rose-500 text-white font-bold">
                    ENTER BUTTON TYPE!
                </button>
            )
    }
}
