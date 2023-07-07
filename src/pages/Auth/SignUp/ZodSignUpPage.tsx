import PaddingWrapper from "../../../components/PaddingWrapper"
import { useForm, SubmitHandler } from "react-hook-form"
import {
    CreateUserFormType,
    createUserToFirebase,
} from "../../../lib/createUser"
import { CreateUserFormSchema } from "../../../models/CreateUserFormSchema"
import { useContext } from "react"
import { ToastContext } from "../../../context/ToastContext"
import { zodResolver } from "@hookform/resolvers/zod"
import { getErrorMessage } from "../../../lib/getErrorMessage"
import { signUpFormInputs } from "./Inputs"
import Button from "../../../components/Button"
import Title from "../../../components/Title"
import { Link } from "react-router-dom"
import GoogleLoginButton from "../../../components/GoogleLoginButton"
import { UserContext } from "../../../context/UserContext"
import { getDocumentFirebase } from "../../../lib/getDocumentFromFirebase"
import { UserDataType } from "../../../types/Types"

export default function ZodSignUpPage() {
    const { setToastNotify } = useContext(ToastContext)
    const { dispatch } = useContext(UserContext)

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<CreateUserFormType>({
        resolver: zodResolver(CreateUserFormSchema),
    })

    const onSubmit: SubmitHandler<CreateUserFormType> = async (data) => {
        try {
            const user = await createUserToFirebase(data)
            const userData = await getDocumentFirebase<UserDataType>('users', user.uid)
            dispatch({type:'LOGIN', payload:userData})
            setToastNotify({
                toastType: "success",
                toastMessage: `🙌 Welcome abroad ${user.displayName}!`,
            })
        } catch (err) {
            const errMessage = getErrorMessage(err)
            setToastNotify({ toastType: "error", toastMessage: errMessage })
        }
    }

    return (
        <PaddingWrapper>
            <div className="mx-auto flex max-w-[500px] flex-col items-center gap-5 rounded-xl bg-white p-8">
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="flex  w-full flex-col gap-4 sm:px-8"
                    noValidate
                >
                    <Title
                        type="normal"
                        text="Sign Up"
                        className="mb-4 text-4xl"
                    />
                    {signUpFormInputs.map((input) => {
                        return (
                            <span key={input.name}>
                                <input
                                    className={`${input.inputClassName} ${
                                        errors[input.name]
                                            ? "border-2 border-rose-400"
                                            : ""
                                    }`}
                                    id={input.name}
                                    type={input.type}
                                    placeholder={input.placeholder}
                                    {...register(input.name)}
                                />
                                {errors[input.name] && (
                                    <p className="italic text-rose-400">
                                        {errors[input.name]?.message}
                                    </p>
                                )}
                            </span>
                        )
                    })}
                    <Button
                        type="submit"
                        style="fill"
                        className="mx-auto mt-2 px-6 py-2"
                    >
                        SUBMIT
                    </Button>
                </form>
                <span className="flex gap-1">
                    <p className="text-slate-400">Already have an account?</p>
                    <Link className="font-semibold text-blue-400" to={"/login"}>
                        Login
                    </Link>
                </span>
                <span className="flex w-full items-center gap-2">
                    <hr className="border-1 w-full border-t-slate-300" />
                    <p className=" font-bold leading-none text-slate-300">Or</p>
                    <hr className="border-1 w-full border-t-slate-300" />
                </span>
                <GoogleLoginButton/>
            </div>
        </PaddingWrapper>
    )
}
