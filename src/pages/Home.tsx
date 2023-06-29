import { collection, getDocs } from "firebase/firestore"
import { RecipeType } from "../types/Types"
import { db } from "../firebase/config"
import { useState, useEffect } from "react"
import { getErrorMessage } from "../lib/getErrorMessage"
import ErrorMessage from "../components/ErrorMessage"
import Loading from "../components/Loading"
import RecipeCard from "../components/RecipeCard"
import Title from "../components/Title"
import Button from "../components/Button"

export default function Home() {
    const [recipes, setRecipes] = useState<RecipeType[] | []>([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const getRecipes = async () => {
            setLoading(true)
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
                setRecipes(recipesArr)
                setError(null)
                setLoading(false)
            } catch (err) {
                const errorMessage = getErrorMessage(err)
                setError(
                    `Something went wrong while fetching data! Error: ${errorMessage}`
                )
                setLoading(false)
            }
        }
        getRecipes()
    }, [])

    return (
        <div className="">
            {error && <ErrorMessage errorMessage={error} />}
            {loading && <Loading />}
            {recipes.length === 0 && (
                <div className="flex flex-col items-center mt-12">
                    <Title type='normal' text="Be the first one to post!" className="mb-8 text-3xl" />
                    <Button href="/create">Create Recipe</Button>
                </div>
            )}
            {recipes && (
                <div className="flex flex-wrap justify-center gap-8">
                    {recipes.map((recipe) => (
                        <RecipeCard key={recipe.id} recipe={recipe} />
                    ))}
                </div>
            )}
        </div>
    )
}
