import { MdModeEditOutline } from "react-icons/md"
import { UserDataType } from "../../types/Types"

export default function CoverAndProfilePic({
    className,
    userData,
}: {
    userData: UserDataType
    className?: string
}) {
    return (
        <section
            className={`relative h-[35vw] max-h-[200px] w-full bg-cover bg-center bg-no-repeat ${
                className ? className : ""
            }`}
            style={{
                backgroundImage: `url(${
                    userData.coverPic ? userData.coverPic : "../../assets/coverBackground.png"
                })`,
            }}
        >
            <label
                htmlFor="changeCover"
                className="absolute bottom-1 right-1 cursor-pointer"
            >
                <MdModeEditOutline className="rounded-full bg-white/80  p-[4px] text-[5vw] text-slate-400 sm:text-[35px]" />
            </label>
            <input type="file" style={{ display: "none" }} id="changeCover" />

            <div className="absolute bottom-0 left-[50%] translate-x-[-50%] translate-y-[50%]">
                <img
                    className="aspect-[1/1] w-[25vw] max-w-[160px]  rounded-full"
                    src={
                        userData.profilePic ? userData.profilePic : "../../assets/noProfilePic.png"
                    }
                    alt="ProfilePic"
                />
                <label
                    htmlFor="changePofilePicture"
                    className="absolute right-1 top-1 cursor-pointer"
                >
                    <MdModeEditOutline className="rounded-full bg-white/80  p-[4px] text-[5vw] text-slate-400 sm:text-[35px]" />
                </label>
                <input
                    type="file"
                    style={{ display: "none" }}
                    id="changePofilePicture"
                />
            </div>
        </section>
    )
}
