import SmallButtonIcon from "../../../../components/SmallButtonIcon"
import { UserDataType } from "../../../../types/Types"
import { MdModeEditOutline } from "react-icons/md"
import {AiOutlineClose} from 'react-icons/ai'
import {HiCheck} from 'react-icons/hi'
import { useContext, useEffect, useState } from "react"
import { ToastContext } from "../../../../context/ToastContext"
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage"
import { storage } from "../../../../firebase/config"
import updateField from "../../../../lib/updateField"
import noCoverBackground from "/coverBackground.png"


type CoverPicProps = {
    userData: UserDataType
}

export default function CoverPic({
    userData,
}: CoverPicProps) {
    const { setToastNotify } = useContext(ToastContext)
    const [coverPicFile, setCoverPicFile] = useState<File | null>(null)
    const [percentage, setPercentage] = useState<number | null>(null)
    const [downloadableUrl, setDownloadableUrl] = useState<string|null>(null)

    useEffect(() => {
        const handleUploadCoverPic = async () => {
            if (coverPicFile) {
                const fileName = new Date().getTime() + coverPicFile.name
                const storageRef = ref(storage, fileName);
                const uploadTask = uploadBytesResumable(storageRef, coverPicFile);

                // Observing state change, error, and success
                // state change
                uploadTask.on('state_changed', 
                (snapshot) => {
                    // Observe state change events such as progress, pause, and resume
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    setPercentage(progress)
                }, 
                // Handle unsuccessful uploads
                (error) => {
                    throw new Error(`status: ${error.status}, message:${error.message}, name:${error.name}`)
                }, 
                // Handle successful uploads on complete
                async () => {
                    const downloadableUrl = await getDownloadURL(uploadTask.snapshot.ref)
                    setDownloadableUrl(downloadableUrl)
                }
                );
            }
        }
        handleUploadCoverPic()
    }, [coverPicFile])

    const handleOnChoosingFile: React.ChangeEventHandler<HTMLInputElement> = (e) => {
        if (e.target.files && e.target.files[0].type.split("/")[0] === "image") {
                setCoverPicFile(e.target.files[0])
        } else {
            setToastNotify({toastType: "warning",toastMessage:"Can only change profile / cover with an image file!"})
        }
    }

    const handleUpload = () => {
        updateField('users', {field:'id', operator:'==', value:userData.id}, {coverPic: downloadableUrl})
        setToastNotify({toastType: "success",toastMessage:"Successfuly updated cover!"})
        setCoverPicFile(null)
    }

    return (
        <>
            <img
                className="w-full h-full object-cover"
                src={
                    userData.coverPic
                        ? `${
                              coverPicFile
                                  ? URL.createObjectURL(coverPicFile)
                                  : userData.coverPic
                          }`
                        : `${
                            coverPicFile
                                  ? URL.createObjectURL(coverPicFile)
                                  : noCoverBackground
                          }`
                }
                alt="CoverPic"
            />
            <SmallButtonIcon
                icon={<MdModeEditOutline />}
                htmlFor="changeCover"
                className="absolute top-1 right-1 cursor-pointer p-1 sm:p-2 sm:text-xl"
            />
            {coverPicFile && (
                <>
                    <SmallButtonIcon
                        icon={<AiOutlineClose />}
                        onClick={() => setCoverPicFile(null)}
                        className="absolute left-[2px] bottom-1 cursor-pointer p-1 sm:p-2 sm:text-xl bg-red-500 text-white"
                    />
                    <SmallButtonIcon
                        disabled={percentage !== null && percentage <100}
                        icon={<HiCheck />}
                        onClick={handleUpload}
                        className="absolute right-[2px] bottom-1 cursor-pointer p-1 sm:p-2 sm:text-xl bg-green-500 text-white disabled:opacity-[50%] disabled:cursor-not-allowed"
                    />
                </>
            )}
            <input
                type="file"
                style={{ display: "none" }}
                name="changeCover"
                id="changeCover"
                onChange={handleOnChoosingFile}
            />
        </>
    )
}
