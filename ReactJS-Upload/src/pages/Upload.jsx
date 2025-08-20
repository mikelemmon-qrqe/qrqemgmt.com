import DropFileInput from '../components/drop-file-input/DropFileInput';
import UploadButton from '../components/upload-button/UploadButton';
import { useState } from 'react';
import { storage, db } from '../firebase';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { doc, setDoc} from 'firebase/firestore';

function App() {
    const [file, setFile] = useState(null)

    const onFileChange = (files) => {
        const currentFile = files[0];
        setFile(currentFile)
        console.log(files);
    }

    const uploadToDatabase = (url) => {
        let docData = {
            mostRecentUploadURL: url,
            username: "qrqemgmt"
        }
        const userRef = doc(db, "videos", docData.username)
        setDoc(userRef, docData, { merge: true }).then(() => {
                console.log("File successfully Uploaded!");
            })
            .catch((error) => {
                console.error("Error uploading file: ", error);
            });
    }

    const handleClick = () => {
        if (file === null) return;
        const fileRef = ref(storage, `videos_submissions/${file.name}`);
        const uploadTask = uploadBytesResumable(fileRef, file);

        uploadTask.on('state_changed', (snapshot) => {
            let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            progress = Math.trunc(progress);
            console.log(progress)
        }, (error) => {
            console.log("Upload failed:", error);
        }, () => {
            console.log("Upload successful")
            getDownloadURL(uploadTask.snapshot.ref).then(downloadURL =>{
                uploadToDatabase(downloadURL);
                console.log(downloadURL);
            }

            )
        });
    }
    return (
      <div className="box">
            <h2 className="header">
            Upload your videos here
            </h2>
            <DropFileInput
                onFileChange={(files) => onFileChange(files)}
            />
            <br></br>
            <UploadButton onClick={ () => handleClick()}> </UploadButton>
      </div>
      );
}
export default App;       