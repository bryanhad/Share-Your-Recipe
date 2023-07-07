import { AiOutlineCaretDown } from "react-icons/ai"
import { useContext } from "react"
import Title from "../../Title"
import { NavbarContext } from "../../../context/NavBarContext"
import { useNavigate } from "react-router-dom"
import { UserContext } from "../../../context/UserContext"

type Props = {
    useDropDown: boolean
    onClick?: () => void
    direction: "left" | "right"
}

export default function ProfileInfo({
    onClick,
    useDropDown,
    direction,
}: Props) {
    const navigate = useNavigate()
    const { userState } = useContext(UserContext)
    const { setNav } = useContext(NavbarContext)

    console.log(userState?.profilePic)

    const handleLoginButton = () => {
        setNav(false)
        navigate("/login")
    }

    return (
        <>
            {userState ? (
                <div className="flex gap-2">
                    {direction === "left" && (
                        <img className="h-[40px] w-[40px] rounded-full" src={userState.profilePic} alt={userState.displayName} />
                    )}
                    <button
                        onClick={onClick}
                        type="button"
                        className="flex items-center gap-1"
                    >
                        <p className="text-[17px]">{userState.displayName}</p>
                        <span
                            className={`${
                                !useDropDown && "hidden"
                            } grid place-content-center pt-1 text-[14px]`}
                        >
                            <AiOutlineCaretDown />
                        </span>
                    </button>

                    {direction === "right" && (
                        <img className="h-[40px] w-[40px] rounded-full" src={userState.profilePic} alt={userState.displayName} />
                    )}
                </div>
            ) : (
                <div className="flex flex-col items-end gap-4">
                    <Title
                        type="canBeClicked"
                        text="LOGIN"
                        className="p-1 text-xl"
                        onClick={handleLoginButton}
                    />
                </div>
            )}
        </>
    )
}
