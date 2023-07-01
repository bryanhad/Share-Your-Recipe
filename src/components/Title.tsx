import { useContext } from "react"
import { ThemeContext } from "../context/ThemeContext"
import useThemeColor from "../hooks/useThemeColor"
import { Link } from "react-router-dom"

export default function Title({
    text,
    className,
    type,
    href,
    onClick
}: {
    text: string
    className?: string
    type: "normal" | "colorful" | "recipeTitle" | "colorfulRecipeTitle" | "link" | "canBeClicked"
    href?: string
    onClick?:() => void
}) {
    const { state } = useContext(ThemeContext)
    const { themeColor } = useThemeColor()

    switch (type) {
        case "canBeClicked": {
            if (onClick) {
                return (
                    <h1 onClick={onClick} className={`${className}`}>
                        {text}
                    </h1>
                )
            } else {
                return (
                    <h1 className="text-rose-500 font-bold">
                    Please specify the onClick function!!
                </h1>
                )
            }
        }
        case "link": {
            if (href) {
                return (
                    <Link to={href}>
                        <h1 className={` ${className}`}>{text}</h1>
                    </Link>
                )
            } else {
                return (
                    <h1 className="text-rose-500 font-bold">
                        Please specify the href!
                    </h1>
                )
            }
        }

        case "colorful":
            return (
                <h1
                    className={`font-bold text-center ${
                        state.theme === "dark"
                            ? "text-slate-300"
                            : themeColor.text
                    } ${className}`}
                >
                    {text}
                </h1>
            )
        case "normal":
            return (
                <h1
                    className={`font-bold text-center ${
                        state.theme === "dark"
                            ? "text-gray-400"
                            : "text-slate-600"
                    } ${className}`}
                >
                    {text}
                </h1>
            )
        case "recipeTitle":
            return (
                <h1
                    className={`font-bold text-center  ${
                        state.theme === "dark"
                            ? "text-slate-600"
                            : "text-slate-600"
                    } ${className}`}
                >
                    {text
                        .split(" ")
                        .map(
                            (word) =>
                                word.charAt(0).toUpperCase() +
                                word.slice(1) +
                                " "
                        )}
                </h1>
            )
        case "colorfulRecipeTitle":
            return (
                <h1
                    className={`font-bold text-center ${
                        state.theme === "dark"
                            ? "text-slate-300"
                            : themeColor.text
                    } ${className}`}
                >
                    {text
                        .split(" ")
                        .map(
                            (word) =>
                                word.charAt(0).toUpperCase() +
                                word.slice(1) +
                                " "
                        )}
                </h1>
            )
        default:
            return (
                <h1 className="text-rose-500 font-bold">
                    please specify the type
                </h1>
            )
    }
}
