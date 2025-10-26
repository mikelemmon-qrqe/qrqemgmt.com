import { useState } from "react";
import DropFileInput from "../drop-file-input/DropFileInput";
import { storage, db, auth } from "../../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { signInAnonymously } from "firebase/auth";
import UploadButton from "../upload-button/UploadButton";
import '../../App.css';

export default function CombinedUploadForm() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    dob: "",
    gender: "",
    preferredName: "",
  });
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (files) => {
    setFile(files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) return alert("Please select a video!");
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.dob)
      return alert("Please fill out all fields!");

    setLoading(true);

    try {
      await signInAnonymously(auth);
      console.log("Signed in anonymously. Proceeding with upload.");
      console.log("Attempting to upload video to Firebase Storage...");
      const fileRef = ref(storage, `videos_submissions/${file.name}`);
      const uploadTask = uploadBytesResumable(fileRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const prog = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setProgress(Math.trunc(prog));
        },
        (error) => {
          console.error("Upload failed:", error);
          alert("Video upload failed");
          setLoading(false);
        },
        async () => {
          const videoURL = await getDownloadURL(uploadTask.snapshot.ref);

          // Save form data + video URL to Firestore, with dob as a timestamp
          const submissionData = {
            ...formData,
            dob: new Date(formData.dob),
            videoURL,
            createdAt: serverTimestamp()
          };
          console.log("Attempting to write to Firestore Database...");
          await addDoc(collection(db, "users"), submissionData);

          alert("Form and video submitted successfully!");
          setFormData({ firstName: "", lastName: "", email: "", age: "", dob: "", gender: "", preferredName: "" });
          setFile(null);
          setProgress(0);
          setLoading(false);
        }
      );
    } catch (error) {
      console.error("Submission error:", error);
      alert("Failed to submit form");
      setLoading(false);
    }
  };

  return (

    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 w-full max-w-md mx-auto p-4 rounded-lg shadow-md"
    >
      <h1 className="text-xl font-bold text-center text-white">Submit Your Info & Video</h1>
      <div className="w-full text-center">
      <input
        type="text"
        name="firstName"
        placeholder="First Name"
        value={formData.firstName}
        onChange={handleChange}
        required
        className="p-2 border rounded w-full"
      />
      <input
        type="text"
        name="lastName"
        placeholder="Last Name"
        value={formData.lastName}
        onChange={handleChange}
        required
        className="p-2 border rounded  w-full"
      />
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
        required
        className="p-2 border rounded  w-full"
      />

      <input
        type="text"
        name="dob"
        placeholder="Date of Birth"
        value={formData.dob}
        onChange={handleChange}
        onFocus={(e) => (e.target.type = "date")}
        onBlur={(e) => {
          if (!e.target.value) e.target.type = "text";
        }}
        className="p-2 border rounded w-full"
      />
      </div>
      <p className="optional text-center">
        Optional
      </p>
      <div className="w-full text-center">

      <select
        id="gender"
        name="gender"
        value={formData.gender || ""}
        onChange={handleChange}
        required
        className="p-2 border rounded w-full bg-white text-black"
      >
        <option value="">Select Gender</option>
        <option value="Male">Male</option>
        <option value="Female">Female</option>
        <option value="Other">Other</option>
        <option value="Prefer not to say">Prefer not to say</option>
      </select>
      <input
          type="text"
          name="preferredName"
          placeholder="Preferred Name"
          value={formData.preferredName}
          onChange={handleChange}
          className="p-2 border rounded w-full"
        />
    </div>

      {/* Drag-and-drop file input */}
      <div className="mt-4">
      <DropFileInput onFileChange={handleFileChange} />
      </div><br></br>
      <UploadButton> Upload </UploadButton>

      {/* Progress bar */}
      {loading && (
        <div className="w-full bg-gray-200 rounded-full h-4 mt-2">
          <div
            className="bg-blue-500 h-4 rounded-full transition-all"
            style={{ width: `${progress}%` }}
          />
        </div>
      )}
    </form>

    
  );
}
