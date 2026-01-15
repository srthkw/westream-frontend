import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Upload from "./pages/Upload";
import PlayerBar from "./components/PlayerBar";
import { AudioPlayerProvider } from "./context/AudioPlayerContext";

const App = () => {
  return (
    <AudioPlayerProvider>
      <PlayerBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/upload" element={<Upload />} />
      </Routes>
    </AudioPlayerProvider>
  );
};

export default App;
