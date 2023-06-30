import { FormInputProps } from "../types/Types"

type Props = {
    className?: string
    onChange: (e:React.ChangeEvent<HTMLInputElement>) => void
    useLabel: boolean
    inputProps: FormInputProps
}

export default function FormInputComponent({
    className,
    onChange,
    useLabel,
    inputProps,
}: Props) {
    const {inputClassName, labelClassName, label, ...mainInputProps} = inputProps

    return (
        <div className={className}>
            {useLabel && (
                <label className={labelClassName} htmlFor={inputProps.id}>
                    {label ? label : "insert label prop!!"}
                </label>
            )}
            <input className={inputProps.inputClassName} {...mainInputProps} onChange={onChange} />
        </div>
    )
}
