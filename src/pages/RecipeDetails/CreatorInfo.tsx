import { getDocumentFirebase } from "../../lib/getDocumentFromFirebase"
import { RecipeType, UserDataType } from "../../types/Types"

export default function CreatorInfo({
    recipe,
    className,
}: {
    recipe: RecipeType
    className?: string
}) {
    const {data:recipeOwnerData} = getDocumentFirebase<UserDataType>('users', recipe.createdBy.id)

    return (
        <div
            className={`tool-tip ${className}`}
            data-tooltip={recipe.createdBy.displayName.split(' ')[0]}
        >
                <img
                    className="h-[30px] w-[30px] object-cover rounded-full border-slate-300"
                    src={recipeOwnerData?.profilePic}
                    alt={recipe.createdBy.displayName}
                />
        </div>
    )
}
