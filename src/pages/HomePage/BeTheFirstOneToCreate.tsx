import Title from "../../components/Title"
import CreateRecipeButton from "../../components/Navbar/ImportantButtons/CreateRecipeButton"

export default function BeTheFirstOneToCreate() {
    return (
        <div className="flex flex-col items-center mt-12">
            <Title
                type="normal"
                text="Be the first one to post!"
                className="mb-8 text-3xl"
            />
            <CreateRecipeButton
                isInBurgerMenu={false}
                forBeTheFirstOneToCreate
            />
        </div>
    )
}
