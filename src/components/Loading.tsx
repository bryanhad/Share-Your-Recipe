import { AiOutlineLoading3Quarters } from "react-icons/ai"

export default function Loading({iconClassName, basicLarge}: {iconClassName?:string, basicLarge:boolean}) {
    return (
        <div className={`mx-auto max-w-max grid place-content-center animate-spin rounded-full ${basicLarge ? 'text-8xl text-slate-300' : ''} ${iconClassName}`}>
            <AiOutlineLoading3Quarters />
        </div>
    )
}
