import { TfiFaceSad } from "react-icons/tfi"
import ThemedContainer from "./ThemedContainer"
import useThemeColor from "../hooks/useThemeColor"
import { useContext } from "react"
import { ThemeContext } from "../context/ThemeContext"
import Button from "./Button"

export default function NothingFound({ item }: { item: string | null }) {
    const { themeColor } = useThemeColor()
    const { state } = useContext(ThemeContext)

    return (
        <div className="mt-8 text-center">
            <ThemedContainer className="mt-4 flex max-w-[75%] flex-col gap-3">
                <span
                    className={`flex items-center justify-center text-8xl ${
                        state.theme === "dark"
                            ? "text-gray-400"
                            : themeColor.text
                    }`}
                >
                    <TfiFaceSad />
                </span>
                {item ? (
                    <h2 className="mb-1 text-xl font-semibold">
                        There is no "{item}" recipe
                    </h2>
                ) : (
                    <h2 className="mb-1 text-xl font-semibold">
                        There are no such recipes
                    </h2>
                )}
                <p>
                    Seems like the recipe you are looking for doesn't exist.
                    Welp, you can always create one!
                </p>
                <Button
                    style="fill"
                    type="link"
                    href="/create"
                    className="mx-auto mt-4 max-w-max px-8 py-3"
                >
                    CREATE
                </Button>
            </ThemedContainer>
        </div>
    )
}
