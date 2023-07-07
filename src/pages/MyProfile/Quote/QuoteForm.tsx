import { useContext, useState } from "react"
import { ToastContext } from "../../../context/ToastContext"
import { useForm, SubmitHandler } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { getErrorMessage } from "../../../lib/getErrorMessage"
import Button from "../../../components/Button"
import updateField from "../../../lib/updateField"
import EditButton from "../../../components/EditButton"
import { UserContext } from "../../../context/UserContext"

const quoteFormSchema = z.object({
    quote: z
        .string()
        .min(3, { message: "Minimum length of quote is 3 characters!" })
        .max(30, { message: "Maximum length of quote is 30 characters!" }),
})

type QuoteFormType = z.infer<typeof quoteFormSchema>

export default function QuoteForm({currentUserQuote}: {currentUserQuote: string | null}) {
    const [active, setActive] = useState(false)
    const {userState} = useContext(UserContext)
    const { setToastNotify } = useContext(ToastContext)
    const {
        handleSubmit,
        register,
        formState: { errors },
    } = useForm<QuoteFormType>({
        defaultValues: {
            quote: currentUserQuote ? currentUserQuote : "",
        },
        resolver: zodResolver(quoteFormSchema),
    })

    const onSubmit: SubmitHandler<QuoteFormType> = async (data) => {
        if (userState) {
            try {
                await updateField(
                    "users",
                    { field: "id", operator: "==", value: userState.id },
                    { quote: data.quote }
                )
                setToastNotify({
                    toastType: "success",
                    toastMessage: "Successfuly updated quote!",
                })
                setActive(false)
            } catch (err) {
                const errMessage = getErrorMessage(err)
                setToastNotify({ toastType: "error", toastMessage: errMessage })
            }
        }
    }

    if (active) {
        return (
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col gap-2"
                noValidate
            >
                <input
                    className="rounded-md p-2 outline outline-1 outline-slate-400"
                    placeholder="I like turtles"
                    type="text"
                    {...register("quote")}
                />
                {errors.quote && (
                    <p className="text-sm italic text-rose-400">
                        {errors.quote.message}
                    </p>
                )}
                <span className="flex justify-center gap-2">
                    <Button type="submit" className="px-4 py-2" style="fill">
                        Submit
                    </Button>
                    <button
                        onClick={() => setActive(false)}
                        type="button"
                        className="rounded-md bg-red-500 px-4 py-2 font-semibold text-white"
                    >
                        Cancel
                    </button>
                </span>
            </form>
        )
    }

    return (
        <>
            {currentUserQuote ? (
                <div className="flex gap-2">
                    <p>{currentUserQuote}</p>
                    <EditButton
                        className="border-2 border-slate-300 p-1"
                        onClick={() => setActive(true)}
                    />
                </div>
            ) : (
                <>
                    <p className="py-2 text-slate-400">
                        Write a short quote about yourself!
                    </p>
                    <Button
                        onclick={() => setActive(true)}
                        type="button"
                        className="px-4 py-2"
                        style="fill"
                    >
                        Click Me
                    </Button>
                </>
            )}
        </>
    )
}
