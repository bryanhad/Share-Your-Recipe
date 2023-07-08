import PaddingWrapper from "../../../components/PaddingWrapper"
import { useForm, SubmitHandler } from "react-hook-form"
import { useContext, useEffect } from "react"
import { ToastContext } from "../../../context/ToastContext"
import { zodResolver } from "@hookform/resolvers/zod"
import { getErrorMessage } from "../../../lib/getErrorMessage"
import { loginFormInputs } from "./Inputs"
import Button from "../../../components/Button"
import Title from "../../../components/Title"
import { Link } from "react-router-dom"
import { z } from "zod"
import { LoginUserFormSchema } from "../../../models/LoginUserFormSchema"
import { getRedirectResult, signInWithEmailAndPassword } from "firebase/auth"
import { auth, db } from "../../../firebase/config"
import GoogleLoginButton from "../../../components/GoogleLoginButton"
import { UserContext } from "../../../context/UserContext"
import { getDocumentFirebase } from "../../../lib/getDocumentFromFirebase"
import { UserDataType } from "../../../types/Types"
import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore"

type LoginUserFormType = z.infer<typeof LoginUserFormSchema>

export default function ZodLoginPage() {
    const { setToastNotify } = useContext(ToastContext)
    const { dispatch } = useContext(UserContext)

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginUserFormType>({
        resolver: zodResolver(LoginUserFormSchema),
    })

    useEffect(() => {
        const getResultFromRedirect = async () => {
            const res = await getRedirectResult(auth)
            if (res) {
                const userDocRef = doc(db, 'users', res.user.uid)
                const userDocSnap = await getDoc(userDocRef)
                
                if (!userDocSnap.exists()) {
                    await setDoc(doc(db, 'users', res.user.uid), {
                        id: res.user.uid,
                        displayName: res.user.displayName as string,
                        email: res.user.email as string,
                        profilePic: res.user.photoURL as string,
                        createdAt: serverTimestamp(),
                        coverPic: null,
                        quote: null
                    })
                }
                const docSnap = await getDoc(doc(db, 'users', res.user.uid))
                const userData = docSnap.data() as UserDataType
                if (userData) {
                    dispatch({type:'LOGIN', payload: userData})
                }
                setToastNotify({
                    toastType: "default",
                    toastMessage: `👋 Welcome ${res.user.displayName}!`,
                })
            }
        }
        getResultFromRedirect()
    }, [])

    const onSubmit: SubmitHandler<LoginUserFormType> = async (data) => {
        try {
            const userCredentialRes = await signInWithEmailAndPassword(
                auth,
                data.email,
                data.password
            )
            const userId = userCredentialRes.user.uid
            const {data:userData} = getDocumentFirebase<UserDataType>('users', userId)
            if (userData) {
                dispatch({type:'LOGIN', payload:userData})
                setToastNotify({
                    toastType: "default",
                    toastMessage: `👋 Welcome ${userData.displayName}!`,
                })
            }
        } catch (err) {
            const errMessage = getErrorMessage(err)
            setToastNotify({ toastType: "error", toastMessage: errMessage})
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
                        text="Login"
                        className="mb-4 text-4xl"
                    />
                    {loginFormInputs.map((input) => {
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
                    <p className="text-slate-400">Don't have an account?</p>
                    <Link
                        className="font-semibold text-blue-400"
                        to={"/sign-up"}
                    >
                        Sign up
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
