import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

const Upload = () => {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    setFiles(Array.from(e.target.files));
  };

  const handleUpload = async () => {
    if (files.length === 0) {
      alert("Select at least one audio file");
      return;
    }

    const formData = new FormData();
    files.forEach((file) => {
      formData.append("audio", file);
    });

    try {
      setLoading(true);
      await api.post("/audio/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      navigate("/");
    } catch (err) {
      console.error(err.response?.data || err.message);
      alert("Upload failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto space-y-4">
      <h1 className="text-xl font-semibold">Upload Audio</h1>

      <input
        type="file"
        accept="audio/*"
        multiple
        onChange={handleFileChange}
        className="block w-full"
      />

      <button
        onClick={handleUpload}
        disabled={loading}
        className="px-4 py-2 bg-black text-white disabled:opacity-50"
      >
        {loading ? "Uploading..." : "Upload"}
      </button>
    </div>
  );
};

export default Upload;

  