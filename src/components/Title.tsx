import { useContext } from "react"
import { ThemeContext } from "../context/ThemeContext"
import useTextColor from "../hooks/useTextColor"

export default function Title({
    text,
    className,
    type,
}: {
    text: string
    className?: string
    type: "normal" | "colorful" | "recipeTitle" | "colorfulRecipeTitle"
}) {
    const { state } = useContext(ThemeContext)
    const { textColor } = useTextColor()

    switch (type) {
        case "colorful":
            return (
                <h1
                    className={`font-bold text-center ${
                        state.theme === "dark" ? "text-slate-300" : textColor
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
                            ? "text-slate-300"
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
                            ? "text-slate-300"
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
                        state.theme === "dark" ? "text-slate-300" : textColor
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
            return <h1>please specify the type</h1>
    }
}
