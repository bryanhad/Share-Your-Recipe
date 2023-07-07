import { useContext, useEffect, useState } from "react"
import { RecipeType } from "../../types/Types"
import { collection, getDocs } from "firebase/firestore"
import { db } from "../../firebase/config"
import { getErrorMessage } from "../../lib/getErrorMessage"
import { ToastContext } from "../../context/ToastContext"
import Loading from "../../components/Loading"
import ErrorMessage from "../../components/ErrorMessage"
import BeTheFirstOneToCreate from "./BeTheFirstOneToCreate"
import RecipeCard from "../../components/RecipeCard"
import PaddingWrapper from "../../components/PaddingWrapper"

export default function HomePage() {
    const [recipes, setRecipes] = useState<RecipeType[] | []>([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<null | string>(null)
    const { setToastNotify } = useContext(ToastContext)

    useEffect(() => {
        setLoading(true)
        const getRecipes = async () => {
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
                setLoading(false)
                setError(null)
            } catch (err) {
                const errMessage = getErrorMessage(err)
                setToastNotify({ toastType: "error", toastMessage: errMessage })
                setError(errMessage)
                setLoading(false)
            }
        }
        getRecipes()
    }, [])
    return (
        <PaddingWrapper>
            {loading && <Loading basicLarge />}
            {error && <ErrorMessage errorMessage={error} noGoHomeButton />}
            {recipes.length === 0 ? (
                <BeTheFirstOneToCreate />
            ) : (
                    <div className="flex flex-wrap justify-center gap-5 pt-4 max-sm:px-2">
                        {recipes.map((recipe) => (
                            <RecipeCard key={recipe.id} recipe={recipe} />
                        ))}
                    </div>
            )}
        </PaddingWrapper>
    )
}
