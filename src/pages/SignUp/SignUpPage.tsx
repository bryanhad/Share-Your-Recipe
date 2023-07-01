import { useContext, useState } from "react"
import FormInputComponent from "../../components/FormInputComponent"
import { signUpFormInputs } from "./Inputs"
import Button from "../../components/Button"
import Title from "../../components/Title"
import {
    createUserWithEmailAndPassword,
    updateProfile,
} from "firebase/auth"
import { auth } from "../../firebase/config"
import { getErrorMessage } from "../../lib/getErrorMessage"
import { useNavigate } from "react-router-dom"
import { CurrentUserContext } from "../../context/CurrentUserContext"
import { ToastContext } from "../../context/ToastContext"

export default function SignUpPage() {
    const navigate = useNavigate()
    const {setToastNotify} = useContext(ToastContext)
    const { dispatch } = useContext(CurrentUserContext)
    const [formValues, setFormValues] = useState({
        username: "",
        email: "",
        password: "",
    })

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        try {
            const userCredential = await createUserWithEmailAndPassword(
                auth,
                formValues.email,
                formValues.password
            )
            const user = userCredential.user
            await updateProfile(user, {
                displayName: formValues.username,
                photoURL: `https://source.boringavatars.com/beam/140/${formValues.username}?colors=264653,2a9d8f,e9c46a,f4a261,e76f51`,
            })
            const updatedCurrentUser = auth.currentUser
            if (!updatedCurrentUser)
                throw new Error("failed to write to the database!")
            dispatch({ type: "LOGIN", paylaod: updatedCurrentUser })
            setToastNotify({toastType:'default', toastMessage:`🙌 Welcome abroad ${updatedCurrentUser.displayName}!`})
            navigate("/")
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
                <Title type="normal" text="SIGN UP" className="text-4xl mb-4" />
                <div className="w-full max-w-[300px] flex flex-col gap-5">
                    {signUpFormInputs.map((input) => (
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
