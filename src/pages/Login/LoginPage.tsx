import { useContext, useState } from "react"
import FormInputComponent from "../../components/FormInputComponent"
import { loginFormInputs } from "./inputs"
import Button from "../../components/Button"
import Title from "../../components/Title"
import { signInWithEmailAndPassword } from "firebase/auth"
import { auth } from "../../firebase/config"
import { getErrorMessage } from "../../lib/getErrorMessage"
import Toast from "../../components/Toast"
import { useNavigate } from "react-router-dom"
import { CurrentUserContext } from "../../context/CurrentUserContext"

export default function LoginPage() {
    const navigate = useNavigate()
    const {notify, ToastContainer} = Toast()
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
            notify({type:'error', message:errMessage})
        }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormValues({ ...formValues, [e.target.name]: e.target.value })
    }

    return (
        <div>
            <ToastContainer/>
            <form
                onSubmit={handleSubmit}
                className="max-w-[500px] mx-auto p-8 rounded-md shadow-md bg-white flex flex-col gap-4 items-center"
            >
                <Title type='normal' text="LOGIN" className="text-4xl mb-4"/>
                {loginFormInputs.map((input) => (
                    <FormInputComponent
                        key={input.id}
                        className="flex gap-2 items-center"
                        onChange={handleChange}
                        useLabel
                        inputProps={input}
                    />
                ))}
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
