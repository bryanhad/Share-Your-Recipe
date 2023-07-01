import { useContext } from "react"
import useThemeColor from "../../../hooks/useThemeColor"
import LoguoutButton from "./LoguoutButton"
import ProfileButtons from "./ProfileButtons"
import { NavbarContext } from "../../../context/NavBarContext"
import { ThemeContext } from "../../../context/ThemeContext"

export default function DropDown() {
    const {state} = useContext(ThemeContext)
    const { themeColor } = useThemeColor()
    const {dropDown} = useContext(NavbarContext)

    return (
        <div
            className={`duration-300 overflow-hidden absolute bottom-0 translate-y-[100%] w-full shadow-md bg-white text-black rounded-b-xl flex flex-col ${
                dropDown ? "max-h-[155px]" : "max-h-[0px]"
            }`}
        >
            <ProfileButtons
                iconClassName="text-xl"
                className="px-4 text-slate-500"
                direction="right"
            />
            <hr className={` pb-4  border-t ${state.theme === 'dark' ? 'border-slate-300' :  themeColor.border}`} />
            <LoguoutButton
                inBurgerMenu={false}
                className="px-4 pb-4 mx-auto"
                buttonStyle="colorfulInverted"
            />
        </div>
    )
}
