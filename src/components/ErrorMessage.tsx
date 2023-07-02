import Button from "./Button"
import Title from "./Title"

export default function ErrorMessage({
    errorMessage,
    noGoHomeButton,
}: {
    errorMessage: string
    noGoHomeButton?: boolean
}) {
    if (noGoHomeButton) {
        return (
            <div className="mt-6 flex flex-col items-center gap-4 rounded-xl bg-white p-8 text-center">
                <Title
                    type="colorful"
                    text="ERROR"
                    className="mb-4 text-3xl font-[600] sm:text-5xl"
                />
                <p className="text-slate-400">{errorMessage}</p>
            </div>
        )
    }

    return (
        <div className="mt-6 flex flex-col items-center gap-4 rounded-xl bg-white p-8 text-center">
            <Title
                type="colorful"
                text="ERROR"
                className="text-3xl font-[600] sm:text-5xl"
            />
            <p className="text-slate-400">{errorMessage}</p>
            <Button
                type="link"
                style="fill"
                href="/"
                className="mt-4 px-4 py-2"
            >
                Go Back To Home
            </Button>
        </div>
    )
}
