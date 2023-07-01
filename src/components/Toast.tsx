import { ToastContainer, ToastOptions, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { ToastTypes } from "../types/Types"

type NotifyProps = {type:ToastTypes, message:string}

export default function Toast() {
    const toastObjArg:ToastOptions = {
        position: "top-right", 
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
    }

    const notify = ({type, message}:NotifyProps ) => {
        switch (type) {
            case 'info':
                return toast.info(message, toastObjArg)
            case 'success':
                return toast.success(message, toastObjArg)
            case 'warning':
                return toast.warn(message, toastObjArg)
            case 'error':
                return toast.error(message, toastObjArg)
            case 'default':
                return toast(message, toastObjArg)
            default:
                return toast(message, toastObjArg)
        }
    }
    return {notify, ToastContainer}
}
