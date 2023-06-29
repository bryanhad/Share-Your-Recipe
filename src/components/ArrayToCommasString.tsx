export default function ArrayToCommasString({
    arrayOfStrings,
    className,
    maxCharacters,
}: {
    arrayOfStrings: string[]
    className?: string
    maxCharacters?: number
}) {
    if (maxCharacters) {
        return (
            <p className={`max-w-max ${className}`}>
                {arrayOfStrings
                    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                    .join(", ")
                    .substring(0, maxCharacters)}
                ...
            </p>
        )
    }

    return (
        <p className={`max-w-max ${className}`}>
            {arrayOfStrings
                .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                .join(", ")}
        </p>
    )
}
