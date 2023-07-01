import { signOut } from "firebase/auth"
import Button from "../../Button"
import { auth } from "../../../firebase/config"
import { useContext } from "react"
import { CurrentUserContext } from "../../../context/CurrentUserContext"
import { useNavigate } from "react-router-dom"
import { getErrorMessage } from "../../../lib/getErrorMessage"
import { MdOutlineExitToApp } from "react-icons/md"
import { ToastContext } from "../../../context/ToastContext"
import { NavbarContext } from "../../../context/NavBarContext"

type Props = {
    className: string
    buttonStyle: "fill" | "outline" | "inverted" | "colorfulInverted"
    inBurgerMenu: boolean
}

export default function LoguoutButton({
    className,
    buttonStyle,
    inBurgerMenu,
}: Props) {
    const navigate = useNavigate()
    const {
        state: { currentUser },
        dispatch,
    } = useContext(CurrentUserContext)
    const {setToastNotify} = useContext(ToastContext)
    const {setNav} = useContext(NavbarContext)

    const handleSignOut = () => {
        try {
            signOut(auth)
            dispatch({ type: "LOGOUT" })
            setNav(false)
            setToastNotify({toastType:'success', toastMessage:'Logout Successful!'})
            navigate("/")
        } catch (err) {
            const errorMessage = getErrorMessage(err)
            setToastNotify({toastType:'error', toastMessage:errorMessage})
        }
    }

    return (
        <>
            {currentUser && (
                <>
                    {inBurgerMenu ? (
                        <>
                            <button
                                onClick={handleSignOut}
                                className="flex gap-2 items-center text-lg"
                            >
                                Logout
                                <span className="text-2xl rounded-full border-2 border-white/60 p-1.5">
                                    <MdOutlineExitToApp />
                                </span>
                            </button>
                        </>
                    ) : (
                        <div className={className}>
                            <Button
                                onclick={handleSignOut}
                                type="button"
                                style={buttonStyle}
                                className="px-2 py-[2px] rounded-md sm:text-[12px]"
                            >
                                Logout
                            </Button>
                        </div>
                    )}
                </>
            )}
        </>
    )
}
