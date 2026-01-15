import { useEffect, useState } from "react";
import api from "../api/axios";

const Home = () => {
  const [audios, setAudios] = useState([]);

  useEffect(() => {
    const fetchAudios = async () => {
      try {
        const res = await api.get("/audio");
        setAudios(res.data);
      } catch (err) {
        console.error(err.response?.data || err.message);
      }
    };

    fetchAudios();
  }, []);

  const handleDelete = async (audioId) => {
    if (!confirm("Delete audio?")) return;

    try {
      await api.delete(`/audio/${audioId}`);

      // Remove instantly without refetch
      setAudios(prev =>
        prev.filter(audio => audio._id !== audioId)
      );
    } catch (err) {
      console.error("Delete failed:", err);
      alert("Failed to delete audio");
    }
  };

  return (
    <div className="p-4 space-y-4">
      {audios.map((audio) => (
        <div key={audio._id}>
          <p>{audio.title}</p>
          <audio controls src={audio.url} />
          <button onClick={(e) =>
                      e.stopPropagation() ||
                      handleDelete(audio._id)}>Delete</button>
        </div>
      ))}
    </div>
  );
};

export default Home;

  