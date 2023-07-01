import { AiOutlineCaretDown } from "react-icons/ai"
import { useContext } from "react"
import { CurrentUserContext } from "../../../context/CurrentUserContext"
import Title from "../../Title"
import Button from "../../Button"
import { NavbarContext } from "../../../context/NavBarContext"
import { useNavigate } from "react-router-dom"
import Loading from "../../Loading"

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
    const {state: { currentUser },} = useContext(CurrentUserContext)
    const {setNav} = useContext(NavbarContext)

    const handleLoginButton = () => {
        setNav(false)
        navigate('/login')
    }

    const handleSignUpButton = () => {
        setNav(false)
        navigate('/sign-up')
    }

    return (
        <>
            {currentUser ? (
                <div className="flex gap-2">
                    {direction === "left" && (
                        <>
                            {currentUser?.photoURL ? (
                                <img
                                    className="w-[40px] rounded-full border-white/50 border-2"
                                    src={currentUser.photoURL}
                                    alt=""
                                />
                            ) : (
                                <div className="h-[40px] w-[40px] bg-slate-400 rounded-full border-white/50 border-2 grid place-content-center">
                                    <Loading iconClassName="text-xl text-white" basicLarge={false}/>
                                </div>
                            )}
                        </>
                    )}
                    <button
                        onClick={onClick}
                        type="button"
                        className="flex items-center gap-1"
                    >
                        <p className="text-[17px]">
                            {currentUser?.displayName}
                        </p>
                        <span
                            className={`${
                                !useDropDown && "hidden"
                            } text-[14px] grid place-content-center pt-1`}
                        >
                            <AiOutlineCaretDown />
                        </span>
                    </button>
                    {direction === "right" && (
                        <>
                            {currentUser?.photoURL && (
                                <img
                                    className="w-[40px] rounded-full border-white/50 border-2"
                                    src={currentUser.photoURL}
                                    alt=""
                                />
                            )}
                        </>
                    )}
                </div>
            ) : (
                <div className="flex flex-col items-end gap-4">
                    <Title type='canBeClicked' text="LOGIN" className="text-xl p-1" onClick={handleLoginButton}/>
                    <Button
                        type="button"
                        onclick={handleSignUpButton}
                        href="/signup"
                        style='outline'
                        className="px-3 py-2 font-semibold"
                    >
                        SIGN UP
                    </Button>
                </div>
            )}
        </>
    )
}
