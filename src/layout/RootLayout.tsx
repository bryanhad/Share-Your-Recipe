import { Outlet } from "react-router-dom"
import Navbar from "../components/Navbar/Navbar"
import { useContext } from "react"
import { ThemeContext } from "../context/ThemeContext"
import { ToastContext } from "../context/ToastContext"

export default function RootLayout() {
    const { state } = useContext(ThemeContext)
    const { ToastContainer } = useContext(ToastContext)

    return (
        <div
            className={`min-h-screen flex flex-col duration-300 ${
                state.theme === "dark" ? "bg-gray-600" : "bg-slate-100"
            }`}
        >
            <Navbar className="sticky top-0 z-[10]" />
            <main className="max-w-[1200px] w-full mx-auto p-6 flex-[1] h-full">
                <Outlet />
                <ToastContainer />
            </main>
        </div>
    )
}
