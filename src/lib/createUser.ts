import { z } from "zod"
import { doc, serverTimestamp, setDoc } from "firebase/firestore"
import { auth, db } from "../firebase/config"
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth"
import { CreateUserFormSchema } from "../models/CreateUserFormSchema"

export type CreateUserFormType = z.infer<typeof CreateUserFormSchema>

export const createUserToFirebase = async (data:CreateUserFormType) => {
        const userCredential = await createUserWithEmailAndPassword(
            auth,
            data.email,
            data.password
        )
        await updateProfile(userCredential.user, {
            displayName: data.username,
            photoURL: `https://source.boringavatars.com/beam/140/${data.username}?colors=264653,2a9d8f,e9c46a,f4a261,e76f51`,
        })
        const updatedCurrentUser = auth.currentUser

        if (!updatedCurrentUser)
            throw new Error("failed to write to the database!")

        await setDoc(doc(db, 'users', userCredential.user.uid), {
            id: updatedCurrentUser.uid,
            displayName: updatedCurrentUser.displayName as string,
            email: updatedCurrentUser.email as string,
            profilePic: updatedCurrentUser.photoURL as string,
            createdAt: serverTimestamp(),
            coverPic: null,
            quote: null
        })

        return updatedCurrentUser
}
