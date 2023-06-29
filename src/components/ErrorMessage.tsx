import Button from "./Button"
import Title from "./Title"

export default function ErrorMessage({
    errorMessage,
}: {
    errorMessage: string
}) {
    return (
        <div className="bg-white rounded-xl p-4 flex flex-col items-center text-center gap-4 mt-6">
            <Title type="colorful" text="ERROR" className="font-[600]"/>
            <p className="text-slate-400">{errorMessage}</p>
            <Button href="/" extraStyling="mt-4">Go Back To Home</Button>
        </div>
    )
}
