import { useNavigate } from "react-router-dom";

function GameControls({ onStartHumanVsAI, onStartTwoPlayers, onSaveGame }) {
  const navigate = useNavigate();

  return (
    <div className="flex justify-center gap-4 p-4 flex-wrap">
      <button
        onClick={onStartHumanVsAI}
        className="relative px-6 py-3 rounded-xl text-white font-semibold
                   bg-gray-800 shadow-lg hover:shadow-2xl
                   hover:bg-gray-700 transition-all duration-300
                   hover:scale-105
                   before:absolute before:inset-0 before:border-2 before:border-transparent
                   before:rounded-xl before:hover:border-gray-400"
      >
        Chơi với AI
      </button>

      <button
        onClick={onStartTwoPlayers}
        className="relative px-6 py-3 rounded-xl text-white font-semibold
                   bg-gray-800 shadow-lg hover:shadow-2xl
                   hover:bg-gray-700 transition-all duration-300
                   hover:scale-105
                   before:absolute before:inset-0 before:border-2 before:border-transparent
                   before:rounded-xl before:hover:border-gray-400"
      >
        Chơi với Người
      </button>

      <button
        onClick={onSaveGame}
        className="relative px-6 py-3 rounded-xl text-white font-semibold
                   bg-gray-800 shadow-lg hover:shadow-2xl
                   hover:bg-gray-700 transition-all duration-300
                   hover:scale-105
                   before:absolute before:inset-0 before:border-2 before:border-transparent
                   before:rounded-xl before:hover:border-gray-400"
      >
        Lưu Trò Chơi
      </button>

      <button
        onClick={() => navigate("/saved-games")}
        className="relative px-6 py-3 rounded-xl text-white font-semibold
                   bg-gray-800 shadow-lg hover:shadow-2xl
                   hover:bg-gray-700 transition-all duration-300
                   hover:scale-105
                   before:absolute before:inset-0 before:border-2 before:border-transparent
                   before:rounded-xl before:hover:border-gray-400"
      >
        Tải Trò Chơi
      </button>
    </div>
  );
}

export default GameControls;
