import { useAudioPlayer } from "../context/AudioPlayerContext";

const PlayerBar = () => {
  const { currentTrack, isPlaying, togglePlay } = useAudioPlayer();

  if (!currentTrack) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-black text-white p-4 flex justify-between items-center">
      <span className="truncate">{currentTrack.title}</span>
      <button
        onClick={togglePlay}
        className="px-4 py-1 bg-white text-black"
      >
        {isPlaying ? "Pause" : "Play"}
      </button>
    </div>
  );
};

export default PlayerBar;
