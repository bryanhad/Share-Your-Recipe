export default function EditButton({
    htmlFor,
    className,
    onClick,
    icon,
    disabled,
}: {
    htmlFor?: string
    className?: string
    onClick?: () => void
    icon: React.ReactNode
    disabled?:boolean
}) {
    if (htmlFor) {
        return (
            <label
                htmlFor={htmlFor}
                className={`cursor-pointer rounded-full bg-white/80 text-slate-400 ${
                    className ? className : ""
                }`}
            >
                {icon}
            </label>
        )
    }

    return (
        <button
            disabled={disabled}
            onClick={onClick}
            className={`cursor-pointer rounded-full text-slate-400 ${
                className ? className : ""
            }`}
        >
            {icon}
        </button>
    )
}
