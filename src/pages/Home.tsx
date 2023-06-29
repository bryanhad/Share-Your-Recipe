import { collection, getDocs } from "firebase/firestore"
import { RecipeType } from "../types/Types"
import { db } from "../firebase/config"
import { getErrorMessage } from "../lib/getErrorMessage"
import ErrorMessage from "../components/ErrorMessage"
import RecipeCard from "../components/RecipeCard"
import Title from "../components/Title"
import Button from "../components/Button"
import { useLoaderData } from "react-router-dom"

export default function Home() {
    const recipes = useLoaderData() as RecipeType[] | string

    return (
        <div className="">
            {typeof recipes === "object" ? (
                <>
                    {recipes.length > 0 ? (
                        <div className="flex flex-wrap justify-center gap-8">
                            {recipes.map((recipe) => (
                                <RecipeCard key={recipe.id} recipe={recipe} />
                            ))}
                        </div>
                    ) : (
                        <div className="flex flex-col items-center mt-12">
                            <Title
                                type="normal"
                                text="Be the first one to post!"
                                className="mb-8 text-3xl"
                            />
                            <Button
                                type="link"
                                style="fill"
                                href="/create"
                                className="px-3 py-2 text-xl sm:text-2xl"
                            >
                                Create Recipe
                            </Button>
                        </div>
                    )}
                </>
            ) : (
                <ErrorMessage errorMessage={recipes} noGoHomeButton />
            )}
        </div>
    )
}

export const recipesLoader = async () => {
    try {
        const recipesArr: RecipeType[] = []
        const snapshot = await getDocs(collection(db, "recipes"))
        snapshot.forEach((doc) => {
            const recipesObj = {
                id: doc.id,
                ...doc.data(),
            } as RecipeType
            recipesArr.push(recipesObj)
        })
        return recipesArr
    } catch (err) {
        const errorMessage = getErrorMessage(err)
        return errorMessage
    }
}
