import { useContext } from "react"
import { AiOutlineUser } from "react-icons/ai"
import { RiDraftLine } from "react-icons/ri"
import { useNavigate } from "react-router-dom"
import { CurrentUserContext } from "../../../context/CurrentUserContext"
import ButtonCanBeClickedWithIcon from "../../ButtonCanBeClickedWithIcon"
import { NavbarContext } from "../../../context/NavBarContext"

type Props = {
    className: string
    direction: "left" | "right"
    iconClassName: string
}

export default function ProfileButtons({
    className,
    direction,
    iconClassName,
}: Props) {
    const {state: { currentUser }} = useContext(CurrentUserContext)
    const {setNav, setDropDown} = useContext(NavbarContext)
    const navigate = useNavigate()

    const ButtonList = [
        {
            text: "Profile",
            icon: <AiOutlineUser />,
            onClick: () => {
                setNav(false)
                setDropDown(false)
                navigate('/my-profile')
            }
        },
        {
            text: "My Recipes",
            icon: <RiDraftLine />,
            onClick: () => {
                setNav(false)
                setDropDown(false)
                navigate('/my-recipes')
            }
        },
    ]

    return (
        <>
            {currentUser && (
                <div className={className}>
                    {ButtonList.map((button) => (
                        <ButtonCanBeClickedWithIcon
                            key={button.text}
                            direction={direction}
                            icon={button.icon}
                            text={button.text}
                            iconClassName={iconClassName}
                            onClick={button.onClick}
                            className="lg:mx-auto lg:my-1 lg:text-sm py-1"
                        />
                    ))}
                </div>
            )}
        </>
    )
}
