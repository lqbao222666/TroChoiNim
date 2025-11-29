import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import apiService from "./services/apiService";

import GameHeader from "./components/GameHeader";
import HeapDisplay from "./components/HeapDisplay";
import GameStatus from "./components/GameStatus";
import MoveSelector from "./components/MoveSelector";
import GameControls from "./components/GameControls";

function GamePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [game, setGame] = useState(null);
  const [error, setError] = useState(null);
  const [showStartScreen, setShowStartScreen] = useState(!id);

  useEffect(() => {
    if (id) fetchGame(id);
  }, [id]);

  const fetchGame = async (gameId) => {
    try {
      const data = await apiService.fetchGame(gameId);
      setGame(data);
      setShowStartScreen(false);
      setError(null);
    } catch (err) {
      setError("Lỗi khi tải trò chơi: " + err.message);
    }
  };

  const startNewGame = async (mode) => {
    try {
      const data = await apiService.startNewGame(mode);
      setGame(data);
      navigate(`/${data.id}`);
      setShowStartScreen(false);
      setError(null);
    } catch (err) {
      setError("Lỗi khi bắt đầu trò chơi mới: " + err.message);
    }
  };

  const startHumanVsAI = () => startNewGame("human_vs_ai");
  const startTwoPlayers = () => startNewGame("two_players");

  const saveGame = async () => {
    if (!game) return;
    try {
      const msg = await apiService.saveGame(game);
      setError(msg);
    } catch (err) {
      setError("Lỗi khi lưu trò chơi: " + err.message);
    }
  };

  const handleMove = async (move) => {
    if (!game) return;
    try {
      const data = await apiService.makeMove(game.id, move);
      setGame(data);
      setError(null);
    } catch (err) {
      setError("Lỗi khi thực hiện nước đi: " + err.message);
    }
  };

  // Trang bắt đầu
  if (showStartScreen) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 via-gray-50 to-gray-100 p-6">
        <div className="w-full max-w-lg bg-white rounded-3xl shadow-2xl p-8 flex flex-col items-center">
          <GameHeader error={error} />
          <h2 className="text-2xl font-bold mb-6 text-gray-700 text-center">
            Chọn chế độ chơi
          </h2>
          <GameControls
            onStartHumanVsAI={startHumanVsAI}
            onStartTwoPlayers={startTwoPlayers}
            onSaveGame={saveGame}
          />
        </div>
      </div>
    );
  }

  // Giao diện chơi
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 via-gray-50 to-gray-100 p-6">
      <div className="w-full max-w-lg bg-white rounded-3xl shadow-2xl p-8 flex flex-col items-center space-y-6">
        <GameHeader error={error} />
        {game && (
          <>
            <HeapDisplay heaps={game.heaps} />
            <GameStatus game={game} />
            <MoveSelector game={game} onMove={handleMove} />
          </>
        )}
        <GameControls
          onStartHumanVsAI={startHumanVsAI}
          onStartTwoPlayers={startTwoPlayers}
          onSaveGame={saveGame}
        />
      </div>
    </div>
  );
}

export default GamePage;
