import { RecipeType } from "../types/Types"
import ArrayToCommasString from "./ArrayToCommasString"
import Button from "./Button"
import ThemedContainer from "./ThemedContainer"
import Title from "./Title"

export default function RecipeCard({ recipe }: { recipe: RecipeType }) {
    return (
        <ThemedContainer className="w-[450px] flex flex-col items-center text-center duration-300 hover:rotate-[2.5deg]">
            <span>
                <Title
                    type="colorfulRecipeTitle"
                    text={recipe.title}
                    className="text-3xl my-3"
                />
                <p className="font-[300] py-1">{recipe.cookingTime} minutes</p>
                <div className="">
                    <ArrayToCommasString
                        arrayOfStrings={recipe.methods}
                        maxCharacters={100}
                        className="font-[400] text-lg"
                    />
                </div>
            </span>
            <Button
                type="link"
                style="fill"
                href={`/recipes/${recipe.id}`}
                className="mt-5 px-6 py-2 font-semibold"
            >
                Cook This
            </Button>
        </ThemedContainer>
    )
}
