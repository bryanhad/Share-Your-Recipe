// import { User } from "firebase/auth"
// import { useRef, useState } from "react"
// import { MdModeEditOutline } from "react-icons/md"

// export default function ProfilePhoto({currentUser}:{currentUser:User}) {
//     const [previewSelectedImage, setPreviewSelectedImage] = useState(false)
//     const profilePictureDivRef = useRef<HTMLDivElement|null>(null)

//     const handleChangeProfilePicture = () => {

//     }

//     return (
//         <div ref={profilePictureDivRef} style={{backgroundImage: `url(${currentUser.photoURL})`}} className="relative h-[60px] w-[60px] rounded-full">
//             <label className="grid h-[15px] w-[15px] place-content-center rounded-full bg-white text-xl text-slate-400">
//                 <MdModeEditOutline />
//             </label>
//             <input type='file' id="file"  style={{display:'none'}} />
//         </div>
//     )
// }
