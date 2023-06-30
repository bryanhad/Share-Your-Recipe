import { AiOutlineCaretDown, AiOutlineUser } from "react-icons/ai"
import { RiDraftLine} from "react-icons/ri"
import Title from "../Title"
import Button from "../Button"
import { useContext } from "react"
import { CurrentUserContext } from "../../context/CurrentUserContext"
import { auth } from "../../firebase/config"
import {useState} from 'react'
import { Link, useNavigate } from "react-router-dom"
import { signOut } from "firebase/auth"
import { getErrorMessage } from "../../lib/getErrorMessage"
import useThemeColor from "../../hooks/useThemeColor"

export default function Profile_Login_SignUp({
    className,
}: {
    className?: string
}) {
    const navigate = useNavigate()
    const {state: { currentUser }, dispatch} = useContext(CurrentUserContext)
    const {themeColor} = useThemeColor()
    const [dropDown, setDropDown] = useState(false)

    const closeDropDown = () => {
        setDropDown(false)
    }

    const handleSignOut = () => {
        try {
            signOut(auth)
            dispatch({type:'LOGOUT'})
            navigate('/')
        } catch (err) {
            const errorMessage = getErrorMessage(err)
            alert(errorMessage)
        }
    }

    const user = auth.currentUser

    return (
        <div className={className}>
            {currentUser ? (
                <>
                    <div className="flex gap-2 justify-center items-center relative h-full py-[5px] min-w-[150px]">
                        {user?.photoURL && 
                        <img className="w-[40px] rounded-full" src={user.photoURL} alt="" />
                        }
                        <button onClick={() => setDropDown(prev => !prev)} type="button" className="flex items-center gap-1">
                            <p className="text-[17px]">
                            {user?.displayName}
                            </p>
                            <span className="text-[14px] grid place-content-center pt-1">
                                <AiOutlineCaretDown/>
                            </span>
                        </button>
                        <div className={`duration-300 overflow-hidden absolute bottom-0 translate-y-[100%] w-full shadow-md bg-white text-black rounded-b-xl  flex flex-col ${dropDown ? 'max-h-[145px] pt-2 pb-4' : 'max-h-[0px]'}`}>
                            <span className="px-4">
                            <Link onClick={closeDropDown} to='/profile' className="flex gap-2 items-center text-base py-1">
                                <span>
                                <AiOutlineUser/>

                                </span>
                                Profile</Link>
                                
                            <Link onClick={closeDropDown} to='/myRecipes' className="flex gap-2 items-center text-base py-1">
                                <span>
                                <RiDraftLine/>

                                </span>
                                My Recipes</Link>
                            </span>
                            <hr className={`mt-2 pb-4  border-t ${themeColor.border}`}/>
                            <span className="px-4">
                                <Button onclick={handleSignOut} type='button' style='colorfulInverted' className="px-2 py-[2px] rounded-md sm:text-[12px]text-slate-500">Logout</Button>
                            </span>
                        </div>
                    </div>
                </>
            ) : (
                <>
                    <Title type="link" href="/login" text="LOGIN" className="text-xl"/>
                    <Button type="link" href="/signup" style='inverted' className="px-2 font-semibold">
                        SIGN UP
                    </Button>
                </>
            )}
        </div>
    )
}
