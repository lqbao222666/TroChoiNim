import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import apiService from "../services/apiService";
import GameHeader from "./GameHeader";

function SavedGamesPage() {
  const navigate = useNavigate();
  const [games, setGames] = useState([]);
  const [error, setError] = useState(null);

  const fetchGames = async () => {
    try {
      const data = await apiService.loadGameList();
      setGames(data);
      setError(null);
    } catch (err) {
      setError("Lỗi khi tải danh sách trò chơi: " + err.message);
    }
  };

  useEffect(() => {
    fetchGames();
  }, []);

  const handleContinue = (id) => {
    navigate(`/${id}`);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Bạn có chắc muốn xóa trò chơi này?")) return;
    try {
      await apiService.deleteGame(id);
      fetchGames(); // reload danh sách sau khi xóa
    } catch (err) {
      setError("Lỗi khi xóa trò chơi: " + err.message);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 via-gray-50 to-gray-100 p-6 flex flex-col items-center">
      <div className="w-full max-w-3xl bg-white rounded-3xl shadow-2xl p-8 flex flex-col space-y-6">
        <GameHeader error={error} />
        <div className="flex justify-between items-center">
          <h2 className="text-3xl font-bold text-gray-800">Trò Chơi Đã Lưu</h2>

          <button
            onClick={() => navigate(-1)}
            className="px-5 py-2 rounded-xl bg-gray-800 text-white font-semibold 
               shadow-lg hover:shadow-xl hover:bg-gray-700 transition-all duration-300"
          >
            Trở Lại
          </button>
        </div>

        {games.length === 0 ? (
          <p className="text-center text-gray-500">Chưa có trò chơi nào.</p>
        ) : (
          <div className="flex flex-col gap-4">
            {games.map((game) => (
              <div
                key={game.id}
                className="flex justify-between items-center p-4 bg-gray-800/10 rounded-xl shadow-md hover:shadow-lg transition-all duration-200"
              >
                <div>
                  <p className="text-gray-800 font-semibold">
                    Game #{game.id} |{" "}
                    {game.mode === "human_vs_ai" ? "Chơi với AI" : "2 Người"}
                  </p>
                  <p className="text-gray-500 text-sm">
                    Trạng thái: {game.status} | Người thắng:{" "}
                    {game.winner || "Chưa có"}
                  </p>
                  <p className="text-gray-400 text-xs">
                    Tạo: {new Date(game.created_at).toLocaleString()} | Cập
                    nhật: {new Date(game.updated_at).toLocaleString()}
                  </p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleContinue(game.id)}
                    className="px-4 py-2 bg-gray-800 text-white rounded-xl shadow-lg hover:shadow-xl hover:bg-gray-700 transition-all duration-300"
                  >
                    Tiếp tục
                  </button>
                  <button
                    onClick={() => handleDelete(game.id)}
                    className="px-4 py-2 bg-red-600 text-white rounded-xl shadow-lg hover:shadow-xl hover:bg-red-700 transition-all duration-300"
                  >
                    Xóa
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default SavedGamesPage;
