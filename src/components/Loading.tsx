import { AiOutlineLoading3Quarters } from "react-icons/ai"

export default function Loading({className}: {className?:string}) {
    return (
        <div className={`w-[100px] h-[100px] mx-auto text-8xl grid place-content-center animate-spin rounded-full text-slate-300 ${className}`}>
            <AiOutlineLoading3Quarters />
        </div>
    )
}
