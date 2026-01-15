import { createContext, useContext, useRef, useEffect, useState } from "react";

const AudioPlayerContext = createContext(null);

export const AudioPlayerProvider = ({ children }) => {
  const audioRef = useRef(new Audio());
  const [currentTrack, setCurrentTrack] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const playTrack = (track) => {
    if (!track) return;
  
    const audio = audioRef.current;
  
    if (currentTrack?._id !== track._id) {
      audio.pause();
      audio.src = track.url;
      setCurrentTrack(track);
    }
  
    audio.play();
    setIsPlaying(true);
  };
  
  const pause = () => {
    audioRef.current.pause();
    setIsPlaying(false);
  };

  const togglePlay = () => {
    if (!currentTrack) return;

    if (isPlaying) {
      pause();
    } else {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  useEffect(() => {
    const audio = audioRef.current;
  
    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);
  
    audio.addEventListener("play", onPlay);
    audio.addEventListener("pause", onPause);
  
    return () => {
      audio.removeEventListener("play", onPlay);
      audio.removeEventListener("pause", onPause);
    };
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
  
    const onEnded = () => setIsPlaying(false);
    audio.addEventListener("ended", onEnded);
  
    return () => audio.removeEventListener("ended", onEnded);
  }, []);
  

  return (
    <AudioPlayerContext.Provider
      value={{
        currentTrack,
        isPlaying,
        playTrack,
        pause,
        togglePlay,
      }}
    >
      {children}
    </AudioPlayerContext.Provider>
  );
  
};

export const useAudioPlayer = () => useContext(AudioPlayerContext);
