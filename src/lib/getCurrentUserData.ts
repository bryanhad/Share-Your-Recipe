import { RecipeType, UserDataType } from "../types/Types"
import { collection, doc, onSnapshot, query, where } from "firebase/firestore"
import { db } from "../firebase/config"
import { useContext, useEffect, useState } from "react"
import { ToastContext } from "../context/ToastContext"
import { getErrorMessage } from "./getErrorMessage"
import { UserContext } from "../context/UserContext"

// Please dont judge me, i just want this to work lol
export default function getCurrentUserData() {
    const [userData, setUserData] = useState<UserDataType | null>(null)
    const [userRecipes, setUserRecipes] = useState<RecipeType[] | []>([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<null | string>(null)
    const { setToastNotify } = useContext(ToastContext)
    const {userState} = useContext(UserContext)

    useEffect(() => {
        setLoading(true)
        try {
            if (userState){
                const userDocRef = doc(db, "users", userState.id)
                const recipesDocRef = query(
                    collection(db, "recipes"),
                    where("createdBy.id", "==", userState.id)
                )
        
                onSnapshot(userDocRef, (doc) => {
                    setUserData(doc.data() as UserDataType)
                })
        
                onSnapshot(recipesDocRef, (snapshot) => {
                    const recipesArr = snapshot.docs.map(
                        (doc) => ({ id: doc.id, ...doc.data() } as RecipeType)
                    )
                    setUserRecipes(recipesArr)
                    setError(null)
                    setLoading(false)
                })
            }    
        } catch (err) {
                const errMessage = getErrorMessage(err)
                setToastNotify({ toastType: "error", toastMessage: errMessage})
                setError(errMessage)
                setLoading(false)
        }
    }, [])

    return { userData, userRecipes, loading, error }
}
