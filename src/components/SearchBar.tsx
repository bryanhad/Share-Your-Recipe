import { useState } from "react"
import { BiSearch } from "react-icons/bi"
import { useNavigate } from "react-router-dom"

export default function SearchBar({
    direction,
}: {
    direction: "left" | "right"
}) {
    const [term, setTerm] = useState<string | null>(null)
    const navigate = useNavigate()

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault()
        if (term) {
            navigate(`/search?q=${term.toLocaleLowerCase()}`)
        }
    }

    return (
        <form onSubmit={handleSubmit} className="flex gap-2 items-center">
            {direction === "left" && (
                <label htmlFor="search" className="text-2xl cursor-pointer">
                    <BiSearch />
                </label>
            )}
            <input
                onChange={(e) => setTerm(e.target.value)}
                placeholder="Crispy Eggplant"
                id="search"
                className="p-2 text-sm sm:text-base rounded-md text-black outline-white"
                type="text"
                required
            />
            {direction === "right" && (
                <label htmlFor="search" className="text-xl cursor-pointer">
                    <BiSearch />
                </label>
            )}
        </form>
    )
}
