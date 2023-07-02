import Title from "../Title"
import { useContext } from "react"
import { CurrentUserContext } from "../../context/CurrentUserContext"
import ProfileInfo from "./ImportantButtons/ProfileInfo"
import DropDown from "./ImportantButtons/DropDown"
import { NavbarContext } from "../../context/NavBarContext"

export default function Profile_Login_SignUp({
    className,
}: {
    className?: string
}) {
    const {
        state: { currentUser },
    } = useContext(CurrentUserContext)
    const {setDropDown} = useContext(NavbarContext)

    return (
        <div className={className}>
            {currentUser ? (
                <div className="flex gap-2 justify-center items-center relative h-full py-[5px] min-w-[150px]">
                    <ProfileInfo
                        useDropDown
                        onClick={() => setDropDown((prev) => !prev)}
                        direction="left"
                    />
                    <DropDown/>
                </div>
            ) : (
                <>
                    <Title
                        type="link"
                        href="/login"
                        text="LOGIN"
                        className="text-xl"
                    />
                </>
            )}
        </div>
    )
}
