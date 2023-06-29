import { Link } from "react-router-dom"
import SearchBar from "./SearchBar"
import { MdDarkMode, MdOutlineLightMode } from "react-icons/md"
import { useContext, useState } from "react"
import { ThemeContext } from "../context/ThemeContext"
import { RxHamburgerMenu } from "react-icons/rx"
import ChangeColorButton from "./ChangeColorButton"

export default function Navbar() {
    const { state, dispatch } = useContext(ThemeContext)
    const [nav, setNav] = useState(false)

    return (
        <>
            <nav
                className={`w-full duration-300 ${state.color} text-white py-2 md:py-4 px-6 max-md:overflow-hidden sticky top-0`}
            >
                <div className="max-w-[1200px] mx-auto flex justify-between items-center">
                    <Link to="/">
                        <h1 className="font-semibold text-3xl md:text-[40px] leading-none">
                            ShareNCook!
                        </h1>
                    </Link>

                    <button
                        onClick={() => setNav((prev) => !prev)}
                        className="w-[50px] h-[50px] grid place-content-center md:hidden text-3xl"
                    >
                        <RxHamburgerMenu />
                    </button>

                    <div className="hidden md:flex gap-8">
                        <SearchBar direction="left" />

                        <Link to="create">
                            <button
                                type="button"
                                className="p-2 rounded-md outline outline-[1px] outline-white"
                            >
                                Create Recipe
                            </button>
                        </Link>
                    </div>
                </div>

                <div
                    className={`block md:hidden duration-300 w-full ${
                        nav ? "max-h-[220px]" : "max-h-[0px]"
                    }`}
                >
                    <div className="flex flex-col items-end gap-4 py-4">
                        <SearchBar direction="left" />

                        <Link to="create">
                            <button
                                type="button"
                                className="p-2 text-sm rounded-md outline outline-[1px] outline-white"
                            >
                                Create Recipe
                            </button>
                        </Link>

                        <div className="flex items-center gap-4">
                            <button
                                onClick={() =>
                                    dispatch({ type: "CHANGE_THEME" })
                                }
                                className={`w-[30px] h-[30px] grid place-content-center duration-150 text-3xl ${
                                    state.theme === "dark"
                                        ? "text-white"
                                        : "text-black/80"
                                }`}
                            >
                                {state.theme === "dark" ? (
                                    <MdOutlineLightMode />
                                ) : (
                                    <MdDarkMode />
                                )}
                            </button>
                            <ChangeColorButton color="bg-amber-400" />
                            <ChangeColorButton color="bg-emerald-400" />
                            <ChangeColorButton color="bg-rose-400" />
                            <ChangeColorButton color="bg-gray-700" />
                        </div>
                    </div>
                </div>
            </nav>
            <div className="hidden md:flex w-full py-4 justify-between max-w-[1200px] mx-auto px-6">
                <button
                    onClick={() => dispatch({ type: "CHANGE_THEME" })}
                    className={`w-[30px] h-[30px] grid place-content-center duration-150 text-3xl ${
                        state.theme === "dark" ? "text-white" : "text-black/50"
                    }`}
                >
                    {state.theme === "dark" ? (
                        <MdOutlineLightMode />
                    ) : (
                        <MdDarkMode />
                    )}
                </button>
                <div className="flex items-center gap-4">
                    <ChangeColorButton color="bg-amber-400" />
                    <ChangeColorButton color="bg-emerald-400" />
                    <ChangeColorButton color="bg-rose-400" />
                    <ChangeColorButton color="bg-gray-700" />
                </div>
            </div>
        </>
    )
}
