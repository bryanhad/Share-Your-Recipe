import SearchBar from "../SearchBar"
import { useContext, useState } from "react"
import { ThemeContext } from "../../context/ThemeContext"
import { RxHamburgerMenu } from "react-icons/rx"
import ChangeColorsButtons from "./ChangeColorsButtons"
import ChangeThemeIcon from "./ChangeThemeIcon"
import Title from "../Title"
import BurgerMenu from "./BurgerMenu"
import Button from "../Button"
import Profile_Login_SignUp from "./Profile-Login-SignUp"

export default function Navbar({className}:{className?:string}) {
    const { state, dispatch } = useContext(ThemeContext)
    const [nav, setNav] = useState(false)

    return (
        <>
            <nav
                className={`w-full duration-300 ${state.color} text-white lg:h-[70px] flex max-lg:flex-col lg:items-center  px-6 max-md:overflow-hidden ${className}`}
            >
                <div className="w-full max-w-[1200px] mx-auto flex justify-between items-center h-full max-lg:min-h-[70px]">
                    <Title
                        type="link"
                        text="ShareNCook"
                        href="/"
                        className="font-semibold text-3xl md:text-[40px] leading-none"
                    />
                    <button
                        onClick={() => setNav((prev) => !prev)}
                        className="w-[50px] h-[50px] grid place-content-center lg:hidden text-3xl"
                    >
                        <RxHamburgerMenu />
                    </button>

                    {/* SEARCHBAR & CREATE BUTTON */}
                    <div className="hidden lg:flex gap-8 h-full">
                        <SearchBar direction="left" />
                        <span className="flex items-center">
                            <Button
                                type="link"
                                style='outline'
                                href="/create"
                                className="rounded-md p-2"
                            >
                                Create Recipe
                            </Button>
                        </span>
                        <Profile_Login_SignUp className="flex items-center gap-6"/>
                    </div>
                </div>

                {/* BURGER MENU */}
                <BurgerMenu navState={nav} />
            </nav>

            {/* CHANGE THEME & COOLOR NOTE:LOCATED BELOW THE NAVBAR */}
            <div className="hidden lg:flex w-full py-4 justify-between max-w-[1200px] mx-auto px-6">
                <ChangeThemeIcon
                    themeState={state.theme}
                    onClick={() => dispatch({ type: "CHANGE_THEME" })}
                />
                <ChangeColorsButtons className="flex items-center gap-4" />
            </div>
        </>
    )
}
