import { useContext, useEffect, useState } from 'react'
import { ThemeContext } from '../context/ThemeContext'

export default function useTextColor() {
    const { state } = useContext(ThemeContext)
    const [textColor, setTextColor] = useState('')

    useEffect(() => {
        switch(state.color) {
            case 'bg-amber-400': {
                setTextColor('text-amber-400')
                break
            }
            case 'bg-emerald-400': {
                setTextColor('text-emerald-400')
                break
            }
            case 'bg-rose-400': {
                setTextColor('text-rose-400/90')
                break
            }
            case 'bg-gray-700': {
                setTextColor('text-gray-700')
                break
            }
        }
    }, [state.color])

    return {textColor}
}
