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
            <div className="bg-white rounded-xl p-8 flex flex-col items-center text-center gap-4 mt-6">
                <Title
                    type="colorful"
                    text="ERROR"
                    className="font-[600] text-3xl sm:text-5xl mb-4"
                />
                <p className="text-slate-400">{errorMessage}</p>
            </div>
        )
    }

    return (
        <div className="bg-white rounded-xl p-8 flex flex-col items-center text-center gap-4 mt-6">
            <Title
                type="colorful"
                text="ERROR"
                className="font-[600] text-3xl sm:text-5xl"
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
