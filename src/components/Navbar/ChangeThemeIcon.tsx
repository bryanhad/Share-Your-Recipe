import { MdDarkMode, MdOutlineLightMode } from "react-icons/md"

export default function ChangeThemeIcon({
    themeState,
    onClick,
}: {
    themeState: string
    onClick: () => void
}) {
    return (
        <button
            onClick={onClick}
            className={`w-[30px] h-[30px] grid place-content-center duration-150 text-3xl ${
                themeState === "dark" ? "text-white" : "text-black/70"
            }`}
        >
            {themeState === "dark" ? <MdOutlineLightMode /> : <MdDarkMode />}
        </button>
    )
}
