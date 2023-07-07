import { doc, getDoc } from "firebase/firestore"
import { db } from "../firebase/config"

export const getDocumentFirebase = async <T>(fireCollection:string, fireDocumentId:string) => {
    const docRef = doc(db, fireCollection, fireDocumentId)
    const docSnap = await getDoc(docRef)

    if (docSnap.exists()) {
        return docSnap.data() as T
    }
    throw new Error(`There is no data from collection ${fireCollection} with document id of ${fireDocumentId}`)
}