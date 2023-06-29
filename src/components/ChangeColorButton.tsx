import { useContext } from "react"
import { ThemeContext } from "../context/ThemeContext"

export default function ChangeColorButton({ color }: { color: string }) {
    const { state, dispatch } = useContext(ThemeContext)

    return (
        <button
            onClick={() => dispatch({ type: "CHANGE_COLOR", payload: color })}
            className={`w-[25px] h-[25px] grid place-content-center text-3xl rounded-full ${color} ${
                state.color === color
                    ? "outline outline-[2px] outline-white/70"
                    : ""
            }`}
        />
    )
}
