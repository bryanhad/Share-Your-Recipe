import { RiEmotionSadLine } from "react-icons/ri"
import Title from "../components/Title"
import useTextColor from "../hooks/useTextColor"
import Button from "../components/Button"
import { useContext } from "react"
import { ThemeContext } from "../context/ThemeContext"
import ThemedContainer from "../components/ThemedContainer"

export default function PageNotFound() {
    const { textColor } = useTextColor()
    const { state } = useContext(ThemeContext)

    return (
        <div className="text-center mt-8">
            <span
                className={`flex justify-center text-8xl items-center ${
                    state.theme === "dark" ? "text-gray-400" : textColor
                }`}
            >
                <RiEmotionSadLine />
                <Title
                    type="colorful"
                    text="404"
                    className='text-8xl'
                />
            </span>
            <ThemedContainer className="max-w-[75%] flex flex-col gap-3 mt-4">
                <h2 className="font-semibold text-xl mb-1">Page not found</h2>
                <p>
                    Seems like the page you are looking for doesn't exist. Or...
                    there is an error somewhere. Welp, either way you can always
                    go back to home!
                </p>
                <Button href="/" className="mt-4">
                    HOME
                </Button>
            </ThemedContainer>
        </div>
    )
}
