import { createContext, useEffect, useState } from "react"
import Toast from "../components/Toast"
import { ToastTypes } from "../types/Types"
import { ToastContainerProps } from "react-toastify"
import { ToastContainer } from "react-toastify"

type toastNotifyType = {
    toastType: ToastTypes
    toastMessage: string
}

export const ToastContext = createContext<{
    setToastNotify: React.Dispatch<React.SetStateAction<toastNotifyType>>
    ToastContainer: React.ForwardRefExoticComponent<ToastContainerProps & React.RefAttributes<HTMLDivElement>>
}>({setToastNotify:() => {}, ToastContainer:ToastContainer})


export const ToastContextProvider = ({children}: {children: React.ReactNode}) => {
    const [toastNotify, setToastNotify] = useState<toastNotifyType>({toastType:'default', toastMessage:'This is default Message'})
    const { notify, ToastContainer } = Toast()

    useEffect(() => {
        if (toastNotify) {
            notify({
                type: toastNotify.toastType,
                message: toastNotify.toastMessage,
            })
        }
    }, [toastNotify])

    return (
        <ToastContext.Provider value={{ setToastNotify, ToastContainer }}>
            {children}
        </ToastContext.Provider>
    )
}
