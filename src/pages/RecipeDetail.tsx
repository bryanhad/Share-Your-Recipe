import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { RecipeType } from "../types/Types"
import Title from "../components/Title"
import { doc, getDoc } from "firebase/firestore"
import { db } from "../firebase/config"
import { getErrorMessage } from "../lib/getErrorMessage"
import Loading from "../components/Loading"
import ErrorMessage from "../components/ErrorMessage"
import ThemedContainer from "../components/ThemedContainer"
import ArrayToCommasString from "../components/ArrayToCommasString"

export default function RecipeDetail() {
    const { id } = useParams()
    const [recipe, setRecipe] = useState<RecipeType | null>(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const getRecipe = async () => {
            setLoading(true)
            if (!id) {
                setError(
                    `Please use a complete URL! There should be an id after the "/recipes/"!`
                )
                setLoading(false)
            } else {
                try {
                    const docSnap = await getDoc(doc(db, "recipes", id))
                    if (docSnap.exists()) {
                        const recipeObj = {
                            ...docSnap.data(),
                            id: docSnap.id,
                        } as RecipeType
                        setRecipe(recipeObj)
                        setError(null)
                        setLoading(false)
                    } else {
                        throw new Error(
                            `There is no recipe with id: "${id}" in the database!`
                        )
                    }
                } catch (err) {
                    const errorMessage = getErrorMessage(err)
                    setError(
                        `Something went wrong while fetching data! Error: ${errorMessage}`
                    )
                    setLoading(false)
                }
            }
        }
        getRecipe()
    }, [])

    return (
        <div>
            {error && <ErrorMessage errorMessage={error} />}
            {loading && <Loading />}
            {recipe && (
                <ThemedContainer className="p-8 flex flex-col gap-4">
                    <div className="relative w-full lfex justify-center">
                        <p className="absolute right-0 top-0 ">
                            Created by: {recipe.createdBy}
                        </p>
                        <Title
                            type="colorfulRecipeTitle"
                            text={recipe.title}
                            className="text-3xl"
                        />
                    </div>
                    <span className="flex flex-col items-center text-lg">
                        <h4 className={`font-[350]`}>
                            Takes {recipe.cookingTime} minutes to cook.
                        </h4>
                        <ArrayToCommasString
                            arrayOfStrings={recipe.ingredients}
                            className="text-slate-400 font-[300]"
                        />
                    </span>
                    <p>{recipe.methods}</p>
                </ThemedContainer>
            )}
        </div>
    )
}
