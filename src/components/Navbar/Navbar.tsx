import SearchBar from "./SearchBar"
import { useContext } from "react"
import { ThemeContext } from "../../context/ThemeContext"
import { RxHamburgerMenu } from "react-icons/rx"
import ChangeColorsButtons from "./ChangeColorsButtons"
import ChangeThemeIcon from "./ChangeThemeIcon"
import Title from "../Title"
import BurgerMenu from "./BurgerMenu"
import Profile_Login_SignUp from "./Profile-Login-SignUp"
import { NavbarContext } from "../../context/NavBarContext"
import CreateRecipeButton from "./ImportantButtons/CreateRecipeButton"

export default function Navbar({ className }: { className?: string }) {
    const { state, dispatch } = useContext(ThemeContext)
    const {setNav} = useContext(NavbarContext)

    return (
        <>
            <nav
                className={`w-full duration-300 ${state.theme === 'dark' ? `bg-gray-700` : state.color} text-white lg:h-[70px] flex max-lg:flex-col lg:items-center  px-6 max-md:overflow-hidden ${className}`}
            >
                <div className="w-full max-w-[1200px] mx-auto flex justify-between items-center h-full max-lg:min-h-[70px]">
                    <Title
                        type="link"
                        text="ShareNCook"
                        href="/"
                        className="font-semibold text-3xl lg:text-[40px] leading-none"
                    />
                    <button
                        onClick={() => setNav((prev) => !prev)}
                        className="w-[50px] h-[50px] grid place-content-center lg:hidden text-3xl"
                    >
                        <RxHamburgerMenu />
                    </button>

                    {/* SEARCHBAR & CREATE BUTTON */}
                    <div className="hidden lg:flex gap-8 h-full">
                        <SearchBar direction="right" iconClassName="text-2xl" />
                        <span className="flex items-center">
                            <CreateRecipeButton isInBurgerMenu={false}/>
                        </span>
                        <Profile_Login_SignUp className="flex items-center gap-6" />
                    </div>
                </div>

                {/* BURGER MENU */}
                <BurgerMenu />
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
