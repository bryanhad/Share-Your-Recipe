import { signInWithEmailAndPassword } from "firebase/auth"
import { useState, useContext } from "react"
import { useNavigate } from "react-router-dom"
import { auth } from "../firebase/config"
import ThemedContainer from "../components/ThemedContainer"
import Button from "../components/Button"
import { CurrentUserContext } from "../context/CurrentUserContext"

export default function Login() {
    const { dispatch } = useContext(CurrentUserContext)

    const navigate = useNavigate()

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState(false)

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        try {
            const userCredential = await signInWithEmailAndPassword(
                auth,
                email,
                password
            )
            const user = userCredential.user
            dispatch({type:'LOGIN', paylaod:user})
            navigate("/profile")
        } catch (err) {
            setError(true)
        }
    }
    return (
        <div>
            <ThemedContainer>
                <form
                    onSubmit={handleSubmit}
                    className="flex flex-col gap-4 px-6 py-4"
                >
                    <input
                        placeholder="username"
                        className="outline outline-[1px] bg-transparent outline-slate-300 p-2 border-slate-300 rounded-md w-full"
                        type="email"
                        id="username"
                        name="username"
                        required
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                        placeholder="password"
                        className="outline outline-[1px] bg-transparent outline-slate-300 p-2  border-slate-300 rounded-md w-full"
                        type="password"
                        id="password"
                        name="password"
                        required
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    {error && (
                        <p className="text-rose-400 mx-auto max-w-max mt-1">
                            Wrong email or password!
                        </p>
                    )}
                    <Button type="submit" className="mt-2 mx-auto px-8">
                        Login
                    </Button>
                </form>
            </ThemedContainer>
        </div>
    )
}
