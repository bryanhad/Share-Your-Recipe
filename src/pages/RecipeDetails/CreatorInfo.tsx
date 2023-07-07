import { RecipeType } from "../../types/Types"

export default function CreatorInfo({
    recipe,
    className,
}: {
    recipe: RecipeType
    className?: string
}) {

    return (
        <div
            className={`tool-tip ${className}`}
            data-tooltip={recipe.createdBy.displayName.split(' ')[0]}
        >
                <img
                    className="h-[30px] w-[30px] rounded-full border-slate-300"
                    src={recipe.createdBy.photoUrl}
                    alt={recipe.createdBy.displayName}
                />
        </div>
    )
}
