import {
    doc,
    query,
    updateDoc,
    where,
    collection,
    WhereFilterOp,
    FieldPath,
    getDocs,
} from "firebase/firestore"
import { db } from "../firebase/config"

export default async function updateField(
    fireCollection: string,
    fireQuery: {
        field: string | FieldPath
        operator: WhereFilterOp
        value: unknown
    },
    data: any
) {
    const q = query(
        collection(db, fireCollection),
        where(fireQuery.field, fireQuery.operator, fireQuery.value)
    )
    const querySnap = await getDocs(q)
    let documentId = ""
    querySnap.forEach((doc) => (documentId = doc.id))
    const docRef = doc(db, fireCollection, documentId)
    await updateDoc(docRef, data)
}
