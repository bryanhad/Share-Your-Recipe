import { signInWithEmailAndPassword } from "firebase/auth"
import { useState, useContext, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { auth } from "../firebase/config"
import ThemedContainer from "../components/ThemedContainer"
import Button from "../components/Button"
import { CurrentUserContext } from "../context/CurrentUserContext"
import Title from "../components/Title"

export default function Login() {
    const { dispatch } = useContext(CurrentUserContext)

    const navigate = useNavigate()

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState(false)
    const [errorShake, setErrorShake] = useState(false)

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setErrorShake(false)
        try {
            const userCredential = await signInWithEmailAndPassword(
                auth,
                email,
                password
            )
            const user = userCredential.user
            setError(false)
            dispatch({type:'LOGIN', paylaod:user})
            navigate("/profile")
        } catch (err) {
            setError(true)
            setErrorShake(true)
        }
    }

    useEffect(() => {
        if(error === true) {
            console.log('yeah')
        }
    }, [error])

    return (
        <div className="mt-8">
            <ThemedContainer className="max-w-[500px]">
            <Title type="colorful" text="LOGIN" className="text-4xl mb-5"/>
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
                        <p className={`text-rose-400 mx-auto max-w-max mt-1 ${errorShake ? 'error-shake' : ''}`}>
                            Wrong email or password!
                        </p>
                    )}
                    <Button type="submit" style="fill" className="mt-2 mx-auto px-8 py-3">
                        Login
                    </Button>
                </form>
            </ThemedContainer>
        </div>
    )
}
