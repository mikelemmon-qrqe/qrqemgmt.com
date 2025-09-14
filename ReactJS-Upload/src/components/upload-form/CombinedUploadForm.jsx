import { useState } from "react";
import DropFileInput from "../drop-file-input/DropFileInput";
import { storage, db } from "../../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

export default function CombinedUploadForm() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    age: "",
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

  const handleRemoveFile = () => {
    setFile(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) return alert("Please select a video!");
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.age)
      return alert("Please fill out all fields!");

    setLoading(true);

    try {
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

          // Save form data + video URL to Firestore, with age as number
          const submissionData = {
            ...formData,
            age: Number(formData.age),
            videoURL,
            createdAt: serverTimestamp(),
          };

          await addDoc(collection(db, "submissions"), submissionData);

          alert("Form and video submitted successfully!");
          setFormData({ firstName: "", lastName: "", email: "", age: "" });
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
        type="number"
        name="age"
        placeholder="Age"
        value={formData.age}
        onChange={handleChange}
        required
        min="0"
        className="p-2 border rounded  w-full"
      />

      {/* Drag-and-drop file input */}
      <div className="mt-4">
      <DropFileInput onFileChange={handleFileChange} />
      </div>

      {/* Show selected file name and allow removal */}
      {file && (
        <div className="flex items-center justify-center p-2 border rounded bg-gray-100">
          <span>{file.name}</span>
          <button
            type="button"
            onClick={handleRemoveFile}
            className="text-red-500 font-bold hover:text-red-700"
          >
            Remove
          </button>
        </div>
      )}

      {/* Progress bar */}
      {loading && (
        <div className="w-full bg-gray-200 rounded-full h-4 mt-2">
          <div
            className="bg-blue-500 h-4 rounded-full transition-all"
            style={{ width: `${progress}%` }}
          />
        </div>
      )}

      <button
        type="submit"
        disabled={loading}
        className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 mt-4 w-3/4"
      >
        {loading ? "Uploading..." : "Submit"}
      </button>
    </form>
  );
}
