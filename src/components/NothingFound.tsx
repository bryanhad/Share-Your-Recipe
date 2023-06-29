import { TfiFaceSad } from "react-icons/tfi"
import ThemedContainer from "./ThemedContainer"
import useTextColor from "../hooks/useTextColor"
import { useContext } from "react"
import { ThemeContext } from "../context/ThemeContext"
import Button from "./Button"

export default function NothingFound({item}:{item:string | null}) {
    const { textColor } = useTextColor()
    const { state } = useContext(ThemeContext)

    return (
        <div className="text-center mt-8">
            <ThemedContainer className="max-w-[75%] flex flex-col gap-3 mt-4">
                <span
                    className={`flex justify-center text-8xl items-center ${
                        state.theme === "dark" ? "text-gray-400" : textColor
                    }`}
                >
                    <TfiFaceSad />
                </span>
                {item ? (
                    <h2 className="font-semibold text-xl mb-1">There is no "{item}" recipe</h2>
                ) : (
                    <h2 className="font-semibold text-xl mb-1">There are no such recipes</h2>
                )}
                <p>
                    Seems like the recipe you are looking for doesn't exist. Welp, you can always create one!
                </p>
                <Button style="fill" type="link" href="/create" className="px-8 py-3 mt-4 max-w-max mx-auto">
                    CREATE
                </Button>
            </ThemedContainer>
        </div>
    )
}
