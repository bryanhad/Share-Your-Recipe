import { useContext } from "react"
import { ThemeContext } from "../context/ThemeContext"
import { Link } from "react-router-dom"

type ButtonProps = {
    type: "button" | "submit" | "link"
    onclick?: () => void
    children: string
    className?: string
    href?: string
    style: "fill" | "outline"
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

    switch (type) {
        case "button":
        case "submit":
            return (
                <button
                    type={type}
                    onClick={onclick}
                    className={` duration-300 text-base sm:text-xl rounded-md
                    ${
                        style === "fill"
                            ? `${
                                  state.theme === "dark"
                                      ? "bg-gray-500 text-gray-300"
                                      : `${state.color} text-white`
                              }`
                            : "outline outline-[1px] outline-white text-white"
                    } ${className}`}
                >
                    {children}
                </button>
            )
        case "link": {
            if (href) {
                return (
                    <Link
                        to={href}
                        className={` duration-300 text-base sm:text-xl rounded-md
                    ${
                        style === "fill"
                            ? `${
                                  state.theme === "dark"
                                      ? "bg-gray-500 text-gray-300"
                                      : `${state.color} text-white`
                              }`
                            : "outline outline-[1px] outline-white text-white"
                    } ${className}`}
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
