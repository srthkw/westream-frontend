import { useNavigate } from "react-router-dom";

const NavExample = () => {
  const navigate = useNavigate();

  return (
    <button
    onClick={() => navigate("/upload")}
    className="px-4 py-2 bg-black text-white"
  >
    Go to Upload
  </button>
  );
};

export default NavExample;