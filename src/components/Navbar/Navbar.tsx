import SearchBar from "./SearchBar"
import { useContext } from "react"
import { ThemeContext } from "../../context/ThemeContext"
import { RxHamburgerMenu } from "react-icons/rx"
import ChangeColorsButtons from "./ChangeColorsButtons"
import ChangeThemeIcon from "./ChangeThemeIcon"
import BurgerMenu from "./BurgerMenu"
import Profile_Login_SignUp from "./Profile-Login-SignUp"
import { NavbarContext } from "../../context/NavBarContext"
import CreateRecipeButton from "./ImportantButtons/CreateRecipeButton"
import { useNavigate } from "react-router-dom"

export default function Navbar({ className }: { className?: string }) {
    const { state, dispatch } = useContext(ThemeContext)
    const navigate = useNavigate()
    const { setNav, setDropDown } = useContext(NavbarContext)

    const handleLogoClick = () => {
        console.log('object')
        setNav(false)
        setDropDown(false)
        navigate('/')
    }

    return (
        <>
            <nav
                className={`w-full duration-300 ${
                    state.theme === "dark" ? `bg-gray-700` : state.color
                } flex px-6 text-white max-lg:flex-col max-md:overflow-hidden  lg:h-[70px] lg:items-center ${className}`}
            >
                <div className="mx-auto flex h-full w-full max-w-[1200px] items-center justify-between max-lg:min-h-[70px]">
                    <button
                        type="button"
                        className="text-3xl font-semibold leading-none lg:text-[40px]"
                        onClick={handleLogoClick}
                    >ShareNCook</button>

                    <button
                        onClick={() => setNav((prev) => !prev)}
                        className="grid h-[50px] w-[50px] place-content-center text-3xl lg:hidden"
                    >
                        <RxHamburgerMenu />
                    </button>

                    {/* SEARCHBAR & CREATE BUTTON */}
                    <div className="hidden h-full gap-8 lg:flex">
                        <SearchBar direction="right" iconClassName="text-2xl" />
                        <span className="flex items-center">
                            <CreateRecipeButton isInBurgerMenu={false} />
                        </span>
                        <Profile_Login_SignUp className="flex items-center gap-6" />
                    </div>
                </div>

                {/* BURGER MENU */}
                <BurgerMenu />
            </nav>

            {/* CHANGE THEME & COOLOR NOTE:LOCATED BELOW THE NAVBAR */}
            <div className="mx-auto hidden w-full max-w-[1200px] justify-between px-6 py-4 lg:flex">
                <ChangeThemeIcon
                    themeState={state.theme}
                    onClick={() => dispatch({ type: "CHANGE_THEME" })}
                />
                <ChangeColorsButtons className="flex items-center gap-4" />
            </div>
        </>
    )
}
