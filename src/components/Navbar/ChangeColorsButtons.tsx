import { useContext } from "react"
import { ThemeContext } from "../../context/ThemeContext"

export default function ChangeColorsButtons({className}:{className?:string}) {
    return (
        <div className={className}>
            <ColorButton color="bg-amber-400" />
            <ColorButton color="bg-emerald-400" />
            <ColorButton color="bg-rose-400" />
            <ColorButton color="bg-gray-700" />
        </div>
    )
}

export function ColorButton({ color }: { color: string }) {
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
