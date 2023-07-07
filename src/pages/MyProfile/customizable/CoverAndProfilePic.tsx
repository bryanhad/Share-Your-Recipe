import { UserDataType } from "../../../types/Types"
import ProfilePic from "./ProfilePic_CoverPic/ProfilePic"
import CoverPic from "./ProfilePic_CoverPic/CoverPic"

export default function CoverAndProfilePic({
    className,
    userData,
}: {
    userData: UserDataType
    className?: string
}) {
    return (
        <section className={`relative h-[35vw] max-h-[200px] w-full ${className ? className : ""}`}>
                <CoverPic userData={userData}/>
            <div className="absolute bottom-0 left-[50%] translate-x-[-50%] translate-y-[50%]">
                <ProfilePic userData={userData} />
            </div>
        </section>
    )
}
