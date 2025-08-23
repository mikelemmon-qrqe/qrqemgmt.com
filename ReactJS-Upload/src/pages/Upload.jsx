// import { useState } from 'react';
// import DropFileInput from '../components/drop-file-input/DropFileInput';
// import UploadButton from '../components/upload-button/UploadButton';
// import UploadForm from "../components/upload-form/upload-form";
// import { storage, db } from '../firebase';
// import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
// import { doc, setDoc } from 'firebase/firestore';

// function App() {
//   const [file, setFile] = useState(null);

//   const onFileChange = (files) => {
//     const currentFile = files[0];
//     setFile(currentFile);
//     console.log(files);
//   };

//   const uploadToDatabase = (url) => {
//     const docData = {
//       mostRecentUploadURL: url,
//       username: "qrqemgmt"
//     };
//     const userRef = doc(db, "videos", docData.username);
//     setDoc(userRef, docData, { merge: true })
//       .then(() => console.log("File successfully uploaded!"))
//       .catch((error) => console.error("Error uploading file: ", error));
//   };

//   const handleClick = () => {
//     if (!file) return;
//     const fileRef = ref(storage, `videos_submissions/${file.name}`);
//     const uploadTask = uploadBytesResumable(fileRef, file);

//     uploadTask.on(
//       'state_changed',
//       (snapshot) => {
//         let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
//         console.log("Upload progress:", Math.trunc(progress), "%");
//       },
//       (error) => console.log("Upload failed:", error),
//       () => {
//         getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
//           uploadToDatabase(downloadURL);
//           console.log("Download URL:", downloadURL);
//         });
//       }
//     );
//   };

//   return (
//     <div className="App">
//       {/* Your UploadForm component */}
//       <h1 className="text-xl font-bold">Submit Your Info</h1>
//       <UploadForm />

//       {/* Existing file upload UI */}
//       <div className="box mt-6">
//         <h2 className="header">Upload your two favorite tapes</h2>
//         <p className="header-subtitle">
//           One that gets calls back, and one that you love playing!
//         </p>
//         <DropFileInput onFileChange={onFileChange} />
//         <br />
//         <UploadButton onClick={handleClick} />
//       </div>
//     </div>
//   );
// }

// export default App;
import CombinedUploadForm from "../components/CombinedUploadForm";

function App() {
  return (
    <div className="App">
      <CombinedUploadForm />
    </div>
  );
}

export default App;
