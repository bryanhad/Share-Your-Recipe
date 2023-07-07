import { useContext } from "react"
import Button from "../../Button"
import { useNavigate } from "react-router-dom"
import { ToastContext } from "../../../context/ToastContext"
import ButtonCanBeClickedWithIcon from "../../ButtonCanBeClickedWithIcon"
import { NavbarContext } from "../../../context/NavBarContext"
import { RiPencilLine } from "react-icons/ri"
import { UserContext } from "../../../context/UserContext"

export default function CreateRecipeButton({
    isInBurgerMenu,
    forBeTheFirstOneToCreate,
}: {
    isInBurgerMenu: boolean
    forBeTheFirstOneToCreate?:boolean
}) {
    const navigate = useNavigate()
    const {userState} = useContext(UserContext)
    const { setToastNotify } = useContext(ToastContext)
    const { setNav } = useContext(NavbarContext)

    const handleGoToCreatePage = () => {
        navigate("/create")
        if (!userState) {
            setToastNotify({
                toastType: "info",
                toastMessage: "You have to log in to create a Recipe!",
            })
        }
    }

    if (isInBurgerMenu) {
        return (
            <ButtonCanBeClickedWithIcon
                onClick={() => {
                    setNav(false)
                    navigate("/create")
                }}
                className="lg:hidden"
                direction="right"
                icon={<RiPencilLine />}
                iconClassName="text-2xl rounded-full border-2 border-white/60 p-1.5"
                text="Create Recipe"
            />
        )
    }

    return (
        <Button
            type="button"
            onclick={handleGoToCreatePage}
            style= {forBeTheFirstOneToCreate ? 'fill' : 'outline'}
            href="/create"
            className={`p-2 ${forBeTheFirstOneToCreate ? '' : 'hidden lg:block'}`}
        >
            Create Recipe
        </Button>
    )
}
