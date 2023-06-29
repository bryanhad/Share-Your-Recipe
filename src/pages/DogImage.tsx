import { useLoaderData } from "react-router-dom"

type DogApiType = {
    message: string
    status: string
}

export default function DogImage() {
    const randomDog = useLoaderData() as DogApiType

    return <div>
        <img className="max-w-[300px]" src={randomDog.message} alt="" />
    </div>
}

export const dogLoader = async () => {
    const res = await fetch("https://dog.ceo/api/breeds/image/random")
    if (res.ok) {
        return res.json()
    } else {
        throw new Error("something went wrong! :(")
    }
}
