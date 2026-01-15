import { useEffect, useState } from "react";
import api from "../api/axios";
import { useAudioPlayer } from "../context/AudioPlayerContext";
import Navtest from "../components/Navtest";

const Home = () => {
  const [audios, setAudios] = useState([]);
  const { playTrack, currentTrack, isPlaying } = useAudioPlayer();

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
    <div className="p-4 space-y-4 pb-24">
      <Navtest />
      {audios.map((audio) => (
        <div key={audio._id} className="flex gap-4 items-center">
          <button
            onClick={() => playTrack(audio)}
            className="px-3 py-1 bg-black text-white"
          >
            {currentTrack?._id === audio._id && isPlaying
              ? "Playing"
              : "Play"}
          </button>

          <span>{audio.title}</span>
          <button onClick={(e) =>
                      e.stopPropagation() ||
                      handleDelete(audio._id)} className="absolute right-90 px-3 py-1 bg-red-500 text-white">Delete</button>
        </div>
      ))}
    </div>
  );
};

export default Home;

  