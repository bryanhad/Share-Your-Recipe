import { RecipeType } from "../../types/Types"

export default function CreatorInfo({ recipe, className }: { recipe: RecipeType, className?:string }) {
    return (
        <div className={`absolute left-0 top-0 flex items-center gap-2 ${className}`}>
            <img
                className="h-[30px] w-[30px] md:h-[40px] md:w-[40px] rounded-full"
                src={recipe.createdBy.photoUrl}
                alt={recipe.createdBy.displayName}
            />
            <p className="hidden sm:block text-sm lg:text-lg">{recipe.createdBy.displayName}</p>
        </div>
    )
}
