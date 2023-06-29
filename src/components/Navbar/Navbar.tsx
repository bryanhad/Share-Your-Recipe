import SearchBar from "../SearchBar"
import { useContext, useState } from "react"
import { ThemeContext } from "../../context/ThemeContext"
import { RxHamburgerMenu } from "react-icons/rx"
import ChangeColorsButtons from "./ChangeColorsButtons"
import ChangeThemeIcon from "./ChangeThemeIcon"
import Title from "../Title"
import BurgerMenu from "./BurgerMenu"
import Button from "../Button"

export default function Navbar() {
    const { state, dispatch } = useContext(ThemeContext)
    const [nav, setNav] = useState(false)

    return (
        <>
            <nav
                className={`w-full duration-300 ${state.color} text-white py-2 md:py-4 px-6 max-md:overflow-hidden sticky top-0`}
            >
                <div className="max-w-[1200px] mx-auto flex justify-between items-center">
                    <Title
                        type="link"
                        text="ShareNCook"
                        href="/"
                        className="font-semibold text-3xl md:text-[40px] leading-none"
                    />
                    <button
                        onClick={() => setNav((prev) => !prev)}
                        className="w-[50px] h-[50px] grid place-content-center md:hidden text-3xl"
                    >
                        <RxHamburgerMenu />
                    </button>
                    
                    <div className="hidden md:flex gap-8">
                        <SearchBar direction="left" />
                        <Button
                            type="link"
                            style='outline'
                            href="/create"
                            className="rounded-md p-2"
                        >
                            Create Recipe
                        </Button>
                    </div>
                </div>
                <BurgerMenu navState={nav} />
            </nav>

            <div className="hidden md:flex w-full py-4 justify-between max-w-[1200px] mx-auto px-6">
                <ChangeThemeIcon
                    themeState={state.theme}
                    onClick={() => dispatch({ type: "CHANGE_THEME" })}
                />
                <ChangeColorsButtons className="flex items-center gap-4" />
            </div>
        </>
    )
}
