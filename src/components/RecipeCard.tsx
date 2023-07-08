import { useContext } from "react"
import { RecipeType, UserDataType } from "../types/Types"
import ArrayToCommasString from "./ArrayToCommasString"
import Button from "./Button"
import ThemedContainer from "./ThemedContainer"
import Title from "./Title"
import { ThemeContext } from "../context/ThemeContext"
import { getDocumentFirebase } from "../lib/getDocumentFromFirebase"


export default function RecipeCard({ recipe }: { recipe: RecipeType }) {
    const {state:{theme}} = useContext(ThemeContext)
    const {data:recipeOwnerData} = getDocumentFirebase<UserDataType>('users', recipe.createdBy.id)

    return (
        <ThemedContainer className="relative flex h-[250px] w-[365px] flex-col items-center gap-2 text-center duration-300 hover:scale-[1.05]">
            <div className="tool-tip absolute right-4 top-6" data-tooltip={recipe.createdBy.displayName}>
                <img
                    className="h-[30px] w-[30px] object-cover rounded-full border-slate-300"
                    src={recipeOwnerData?.profilePic}
                    alt=""
                />
            </div>
            <span className="w-full">
                <Title
                    type="colorfulRecipeTitle"
                    text={recipe.title.length > 17 ? recipe.title.substring(0, 17)+'...' : recipe.title}
                    className="text-3xl w-[76%] mx-auto"
                />
                <p className="py-1 font-[300]">{recipe.cookingTime} minutes</p>
            </span>
            <div className="">
                <ArrayToCommasString
                    arrayOfStrings={recipe.methods}
                    maxCharacters={100}
                    className={`text-sm font-[400] ${
                        theme === "dark" ? "text-slate-300" : "text-slate-500"
                    }`}
                />
            </div>
            <Button
                type="link"
                style="fill"
                href={`/recipes/${recipe.id}`}
                className="mt-auto px-6 py-2 font-semibold"
            >
                Cook This
            </Button>
        </ThemedContainer>
    )
}
