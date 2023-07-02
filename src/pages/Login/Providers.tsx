import { signInWithRedirect } from "firebase/auth"
import { auth, googleProvider } from "../../firebase/config"
import {AiFillGoogleCircle} from 'react-icons/ai'
import {useContext} from 'react'
import { ThemeContext } from "../../context/ThemeContext"

const loginProviders = [
    {
        providerName:'google',
        onClick: () => {signInWithRedirect(auth, googleProvider)},
        icon: <AiFillGoogleCircle/>
    }
]

export default function LoginProviders() {
    const {state:{theme}} = useContext(ThemeContext)
    return (
        <>
            {loginProviders.map(provider => (
                <button type="button" className={`${theme === 'dark' ? 'text-slate-300' : 'text-slate-400'} duration-300 text-5xl`} key={provider.providerName} onClick={provider.onClick}>
                    {provider.icon}
                </button>
            ))}
        </>
    )
}