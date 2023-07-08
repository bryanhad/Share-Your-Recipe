import { doc, onSnapshot } from "firebase/firestore"
import { db } from "../firebase/config"
import { useContext, useEffect, useState } from "react"
import { getErrorMessage } from "./getErrorMessage"
import { ToastContext } from "../context/ToastContext"

export const getDocumentFirebase = <T>(fireCollection:string, fireDocumentId:string) => {
    const [data, setData] = useState<T | null>(null)
    const [loading, setLoading] = useState(false)
    const {setToastNotify} = useContext(ToastContext)

    useEffect(() => {
        setLoading(true)
        try {
            onSnapshot(doc(db, fireCollection, fireDocumentId), doc => {
                setData(doc.data() as T)
            })
            setLoading(false)
        } catch (err) {
            const errMessage = getErrorMessage(err)
            setToastNotify({toastType: 'error', toastMessage:errMessage})
            setLoading(false)
        }
    }, [])

    return {data, loading}
}