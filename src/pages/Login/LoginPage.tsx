import { useContext, useEffect, useState } from "react"
import FormInputComponent from "../../components/FormInputComponent"
import { loginFormInputs } from "./inputs"
import Button from "../../components/Button"
import Title from "../../components/Title"
import { getRedirectResult, signInWithEmailAndPassword } from "firebase/auth"
import { auth } from "../../firebase/config"
import { getErrorMessage } from "../../lib/getErrorMessage"
import { Link, useNavigate } from "react-router-dom"
import { CurrentUserContext } from "../../context/CurrentUserContext"
import { ToastContext } from "../../context/ToastContext"
import LoginProviders from "./Providers"

export default function LoginPage() {
    const navigate = useNavigate()
    const {setToastNotify} = useContext(ToastContext)
    const {dispatch} = useContext(CurrentUserContext)
    const [formValues, setFormValues] = useState({
        email: "",
        password: "",
    })

    useEffect(() => {
        const getResultFromRedirect = async () => {
            const res = await getRedirectResult(auth)
            if (res) {
                dispatch({type:'LOGIN', paylaod:res.user})
                setToastNotify({toastType:'default', toastMessage:`👋 Welcome ${res.user.displayName}!`})
                navigate('/')
            }
        }
        getResultFromRedirect()
    }, [])

    const handleSubmit = async (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        try {
            console.log('object')
            const userCredentialRes = await signInWithEmailAndPassword(auth, formValues.email, formValues.password)
            const user = userCredentialRes.user
            dispatch({type:'LOGIN', paylaod:user})
            setToastNotify({toastType:'default', toastMessage:`👋 Welcome ${user.displayName}!`})
            navigate('/')
        } catch (err) {
            const errMessage = getErrorMessage(err)
            setToastNotify({toastType:'error', toastMessage:errMessage})
        }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormValues({ ...formValues, [e.target.name]: e.target.value })
    }

    return (
        <div className="mt-8">
            <form
                onSubmit={handleSubmit}
                className="max-w-[500px] mx-auto p-8 rounded-md shadow-md bg-white flex flex-col gap-5 items-center"
            >
                <Title type='normal' text="LOGIN" className="text-4xl mb-1"/>
                <div className="w-full max-w-[300px] flex flex-col gap-5">
                    {loginFormInputs.map((input) => (
                        <FormInputComponent
                            key={input.id}
                            className="flex gap-2 items-center"
                            onChange={handleChange}
                            useLabel={false}
                            inputProps={input}
                        />
                    ))}
                </div>
                <Button
                    type="submit"
                    style="fill"
                    className="max-w-max px-8 py-2"
                >
                    SUBMIT
                </Button>
                <div className="flex gap-2 items-center w-full my-4 relative">
                    <Link className="absolute top-0 right-0 translate-y-[-100%] text-sm text-slate-400" to='/sign-up'>Don't have an account?</Link>
                    <hr className="border-1 border-t-slate-300 w-full"/>
                    <p className=" leading-none font-bold text-slate-300">OR</p>
                    <hr className="border-1 border-t-slate-300 w-full"/>
                </div>
                <div className="flex gap-4">
                    <LoginProviders/>
                </div>
            </form>
        </div>
    )
}
