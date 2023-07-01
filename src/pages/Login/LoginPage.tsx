import { useContext, useState } from "react"
import FormInputComponent from "../../components/FormInputComponent"
import { loginFormInputs } from "./inputs"
import Button from "../../components/Button"
import Title from "../../components/Title"
import { signInWithEmailAndPassword } from "firebase/auth"
import { auth } from "../../firebase/config"
import { getErrorMessage } from "../../lib/getErrorMessage"
import { useNavigate } from "react-router-dom"
import { CurrentUserContext } from "../../context/CurrentUserContext"
import { ToastContext } from "../../context/ToastContext"

export default function LoginPage() {
    const navigate = useNavigate()
    const {setToastNotify} = useContext(ToastContext)
    const {dispatch} = useContext(CurrentUserContext)
    const [formValues, setFormValues] = useState({
        email: "",
        password: "",
    })

    const handleSubmit = async (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        try {
            const userCredentialRes = await signInWithEmailAndPassword(auth, formValues.email, formValues.password)
            const user = userCredentialRes.user
            dispatch({type:'LOGIN', paylaod:user})
            navigate('/')
        } catch (err) {
            const errMessage = getErrorMessage(err)
            setToastNotify({toastType:'error', toastMessage:errMessage})
            // notify({type:'error', message:errMessage})
        }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormValues({ ...formValues, [e.target.name]: e.target.value })
    }

    return (
        <div>
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
            </form>
        </div>
    )
}
