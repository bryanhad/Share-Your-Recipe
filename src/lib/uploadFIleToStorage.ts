import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "../firebase/config";
import updateField from "./updateField";

type updateFieldProps = {
    fireCollection:string, queryFieldPath:string, queryFieldValue:unknown, willBeUpdatedField:string
}

export const uploadFileToStorage = async (file:File, {fireCollection, queryFieldPath, queryFieldValue, willBeUpdatedField}: updateFieldProps) => {
    const fileName = new Date().getTime() + file.name
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    // Observing state change, error, and success
    // state change
    const res = uploadTask.on('state_changed', 
      (snapshot) => {
        // Observe state change events such as progress, pause, and resume
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
        switch (snapshot.state) {
            case 'paused':
                console.log('Upload is paused');
                break;
            case 'running':
                console.log('Upload is running');
                break;
            default:
                break
        }
      }, 
      // Handle unsuccessful uploads
      (error) => {
        throw new Error(`status: ${error.status}, message:${error.message}, name:${error.name}`)
      }, 
      // Handle successful uploads on complete
      async () => {
        const downloadableUrl = await getDownloadURL(uploadTask.snapshot.ref)
        updateField(fireCollection, {field:queryFieldPath, operator:'==', value:queryFieldValue}, {[willBeUpdatedField]: downloadableUrl})
        console.log(downloadableUrl) 
      }
    );
    return res
}

