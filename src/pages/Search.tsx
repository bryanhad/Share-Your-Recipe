import { useSearchParams } from "react-router-dom"
import { collection, query, where, getDocs } from "firebase/firestore"

import { RecipeType } from "../types/Types"
import Title from "../components/Title"
import { db } from "../firebase/config"
import { useEffect, useState } from "react"
import ErrorMessage from "../components/ErrorMessage"
import { getErrorMessage } from "../lib/getErrorMessage"
import Loading from "../components/Loading"
import RecipeCard from "../components/RecipeCard"
import NothingFound from "../components/NothingFound"

export default function Search() {
    const [searchParams] = useSearchParams()
    const queryTerm = searchParams.get("q")

    const [recipes, setRecipes] = useState<RecipeType[] | []>([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const getQueriedDocumentsSnapshot = async () => {
            setLoading(true)
            if (!queryTerm) {
                setError("Please enter some query in the URL!")
                setLoading(false)
            } else {
                try {
                    const recipesArr: RecipeType[] = []
                    const q = query(
                        collection(db, "recipes"),
                        where("title", "==", queryTerm)
                    )
                    const snapshot = await getDocs(q)
                    console.log(snapshot)
                    snapshot.forEach((doc) => {
                        const recipeObj = {
                            id: doc.id,
                            ...doc.data(),
                        } as RecipeType
                        recipesArr.push(recipeObj)
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
        }
        getQueriedDocumentsSnapshot()
    }, [queryTerm])



    return (
        <div>
            <Title
                type="normal"
                className="text-center mb-3 text-3xl"
                text={`Recipes including "${queryTerm}"`}
            />
            {error && <ErrorMessage errorMessage={error} />}
            {loading ? (
                <Loading className="mt-12" />
            ) : (
                <>{recipes.length === 0 && <NothingFound item={queryTerm} />}</>
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
