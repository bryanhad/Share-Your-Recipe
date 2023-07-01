import SearchBar from "./SearchBar"
import { RiPencilLine } from "react-icons/ri"
import ChangeThemeIcon from "./ChangeThemeIcon"
import ChangeColorsButtons from "./ChangeColorsButtons"
import { useContext } from "react"
import { ThemeContext } from "../../context/ThemeContext"
import ProfileInfo from "./ImportantButtons/ProfileInfo"
import ProfileButtons from "./ImportantButtons/ProfileButtons"
import LoguoutButton from "./ImportantButtons/LoguoutButton"
import { NavbarContext } from "../../context/NavBarContext"
import ButtonCanBeClickedWithIcon from "../ButtonCanBeClickedWithIcon"
import { useNavigate } from "react-router-dom"
import { CurrentUserContext } from "../../context/CurrentUserContext"

export default function BurgerMenu() {
    const navigate = useNavigate()
    const {state:{currentUser}} = useContext(CurrentUserContext)
    const { state, dispatch } = useContext(ThemeContext)
    const { nav, setNav } = useContext(NavbarContext)

    return (
        <div
            className={`block lg:hidden duration-300 w-full overflow-hidden pr-3  ${
                nav ? `${currentUser ? `max-h-[425px]` : 'max-h-[278px]'}` : "max-h-[0px]"
            }`}
        >
            <div className="flex flex-col items-end gap-4 pb-4 ">
                <ProfileInfo useDropDown={false} direction="right" />
                <ProfileButtons
                    iconClassName="text-2xl rounded-full border-2 border-white/60 p-1.5"
                    className="flex flex-col gap-4 items-end text-lg"
                    direction="right"
                />
                <ButtonCanBeClickedWithIcon
                    onClick={() => {
                        setNav(false)
                        navigate('/create')
                    }}
                    direction="right"
                    icon={<RiPencilLine />}
                    iconClassName="text-2xl rounded-full border-2 border-white/60 p-1.5"
                    text="Create Recipe"
                />
                <SearchBar
                    iconClassName="text-2xl rounded-full border-2 border-white/60 p-1.5"
                    direction="right"
                />
                <div className="flex items-center gap-4">
                    <ChangeColorsButtons className="flex gap-4" />
                    <ChangeThemeIcon
                        themeState={state.theme}
                        onClick={() => dispatch({ type: "CHANGE_THEME" })}
                    />
                </div>
                <LoguoutButton
                    inBurgerMenu
                    className="text-lg"
                    buttonStyle="fill"
                />
            </div>
        </div>
    )
}
