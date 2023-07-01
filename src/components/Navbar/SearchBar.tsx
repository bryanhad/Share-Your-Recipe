import { useContext, useRef, useState } from "react"
import { BiSearch } from "react-icons/bi"
import { useNavigate } from "react-router-dom"
import { NavbarContext } from "../../context/NavBarContext"

type Props = {
    direction: "left" | "right"
    iconClassName:string
}

export default function SearchBar({
    direction, iconClassName
}: Props) {
    const [term, setTerm] = useState<string | null>(null)
    const navigate = useNavigate()
    const {setNav} = useContext(NavbarContext)
    const inputRef = useRef<HTMLInputElement>(null)

    const handleSubmit:React.FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault()
        if (term) {
            setNav(false)
            if(inputRef.current) {
                inputRef.current.value = ''
            }
            navigate(`/search?q=${term.toLocaleLowerCase()}`)
        }
    }

    return (
        <form onSubmit={handleSubmit} className="flex gap-2 items-center">
            {direction === "left" && (
                <label htmlFor="search" className={`${iconClassName} cursor-pointer`}>
                    <BiSearch />
                </label>
            )}
            <input
                ref={inputRef}
                onChange={(e) => setTerm(e.target.value)}
                placeholder="Crispy Eggplant"
                name='input'
                id="search"
                className="p-2 text-sm lg:text-base rounded-md text-black outline-white"
                type="text"
                required
            />
            {direction === "right" && (
                <label htmlFor="search" className={`${iconClassName} cursor-pointer`}>
                    <BiSearch />
                </label>
            )}
        </form>
    )
}
