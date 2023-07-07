import { useContext } from "react"
import { ThemeContext } from "../context/ThemeContext"
import { signInWithRedirect } from "firebase/auth"
import { auth, googleProvider } from "../firebase/config"
import { AiFillGoogleCircle } from "react-icons/ai"

export default function GoogleLoginButton() {
  const {
    state: { theme },
} = useContext(ThemeContext)

  return (
    <button type="button" className={`${theme === 'dark' ? 'text-slate-300' : 'text-slate-400'} duration-300 text-5xl`} onClick={() => signInWithRedirect(auth, googleProvider)}>
    <AiFillGoogleCircle/>
  </button>
  )
}
