import { useContext, useEffect, useState } from "react"
import { ThemeContext } from "../context/ThemeContext"

type ThemeType = {
    text: string
    background: string
    outline: string
    border:string
}

export default function useThemeColor() {
    const { state } = useContext(ThemeContext)
    const [themeColor, setThemeColor] = useState<ThemeType>({
        text: "",
        background: "",
        outline: "",
        border: ''
    })

    useEffect(() => {
        switch (state.color) {
            case "bg-amber-400": {
                setThemeColor({
                    text: "text-amber-400",
                    background: "bg-amber-400",
                    outline: "outline-amber-400",
                    border: 'border-amber-400',
                })
                break
            }
            case "bg-emerald-400": {
                setThemeColor({
                    text: "text-emerald-400",
                    background: "bg-emerald-400",
                    outline: "outline-emerald-400",
                    border: 'border-emerald-400',
                })
                break
            }
            case "bg-rose-400": {
                setThemeColor({
                    text: "text-rose-400",
                    background: "bg-rose-400",
                    outline: "outline-rose-400",
                    border: 'border-rose-400',
                })
                break
            }
            case "bg-gray-700": {
                setThemeColor({
                    text: "text-gray-700",
                    background: "bg-gray-700",
                    outline: "outline-gray-700",
                    border: 'border-gray-700',
                })
                break
            }
        }
    }, [state.color])

    return { themeColor }
}
