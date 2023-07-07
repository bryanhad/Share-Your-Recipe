import { RiEmotionSadLine } from "react-icons/ri"
import Title from "../components/Title"
import useThemeColor from "../hooks/useThemeColor"
import Button from "../components/Button"
import { useContext } from "react"
import { ThemeContext } from "../context/ThemeContext"
import ThemedContainer from "../components/ThemedContainer"
import PaddingWrapper from "../components/PaddingWrapper"

export default function PageNotFound() {
    const { themeColor } = useThemeColor()
    const { state } = useContext(ThemeContext)

    return (
        <PaddingWrapper>
            <div className="mt-8 text-center">
                <span
                    className={`flex items-center justify-center text-8xl ${
                        state.theme === "dark"
                            ? "text-gray-400"
                            : themeColor.text
                    }`}
                >
                    <RiEmotionSadLine />
                    <Title type="colorful" text="404" className="text-8xl" />
                </span>
                <ThemedContainer className="mt-4 flex max-w-[75%] flex-col gap-3">
                    <h2 className="mb-1 text-xl font-semibold">
                        Page not found
                    </h2>
                    <p>
                        Seems like the page you are looking for doesn't exist.
                        Or... there is an error somewhere. Welp, either way you
                        can always go back to home!
                    </p>
                    <Button
                        type="link"
                        href="/"
                        style="fill"
                        className="mx-auto mt-4 px-8 py-2"
                    >
                        HOME
                    </Button>
                </ThemedContainer>
            </div>
        </PaddingWrapper>
    )
}
