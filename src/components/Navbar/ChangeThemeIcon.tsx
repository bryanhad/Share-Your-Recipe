import { MdDarkMode, MdLightMode } from "react-icons/md"
import useThemeColor from "../../hooks/useThemeColor"

export default function ChangeThemeIcon({
    themeState,
    onClick,
}: {
    themeState: string
    onClick: () => void
}) {
    const {themeColor} = useThemeColor()

    return (
        <button
            onClick={onClick}
            className={`w-[30px] h-[30px] grid place-content-center duration-150 rounded-full p-[20px] text-3xl ${
                themeState === "dark" ? `text-slate-700 max-lg:bg-white lg:text-white` : `${themeColor.text} max-lg:bg-white lg:text-black/70`
            }`}
        >
            {themeState === "dark" ? <MdLightMode /> : <MdDarkMode />}
        </button>
    )
}
