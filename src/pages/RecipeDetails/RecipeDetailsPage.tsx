import { useParams } from "react-router-dom"
import { useContext, useEffect, useState } from "react"
import { RecipeType } from "../../types/Types"
import Title from "../../components/Title"
import { doc, getDoc } from "firebase/firestore"
import { db } from "../../firebase/config"
import { getErrorMessage } from "../../lib/getErrorMessage"
import Loading from "../../components/Loading"
import ErrorMessage from "../../components/ErrorMessage"
import ThemedContainer from "../../components/ThemedContainer"
import ArrayToCommasString from "../../components/ArrayToCommasString"
import CreatorInfo from "./CreatorInfo"
import useThemeColor from "../../hooks/useThemeColor"
import { ThemeContext } from "../../context/ThemeContext"
import PaddingWrapper from "../../components/PaddingWrapper"

export default function RecipeDetailsPage() {
    const { id } = useParams()
    const [recipe, setRecipe] = useState<RecipeType | null>(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const {themeColor} = useThemeColor()
    const {state:{theme}} = useContext(ThemeContext)

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
        <>
            {error && <ErrorMessage errorMessage={error} />}
            {loading && <Loading basicLarge />}
            {recipe && (
                <PaddingWrapper>
                        <ThemedContainer className="relative flex flex-col gap-4 p-8 max-w-[600px]">

                            <CreatorInfo className="absolute left-8 top-8" recipe={recipe} />

                                <Title
                                    type="colorfulRecipeTitle"
                                    text={recipe.title}
                                    className="mx-auto max-w-[75%] text-3xl"
                                />
                            <span className="flex flex-col items-center text-lg">
                                <h4 className={`font-[350]`}>
                                    Takes {recipe.cookingTime} minutes to cook.
                                </h4>
                                <ArrayToCommasString
                                    arrayOfStrings={recipe.ingredients}
                                    className="font-[300] text-slate-400 text-center text-sm"
                                />
                            </span>
                            <section className="flex flex-col gap-2 w-full max-w-[300px] mx-auto">
                                {recipe.methods.map((method, i) => (
                                    <span className="flex gap-2">
                                        <p className={`flex-[1] text-white max-w-[25px] max-h-[25px] grid place-content-center rounded-full mb-auto ${theme === 'dark' ? 'bg-gray-700/60' : themeColor.background}`}>{i+1}</p>
                                        <p className="flex-[12]">{method}</p>
                                    </span>
                                ))}
                            </section>
                        </ThemedContainer>
                </PaddingWrapper>
            )}
        </>
    )
}
