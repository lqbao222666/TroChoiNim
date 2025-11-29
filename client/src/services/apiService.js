import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api",
  headers: { "Content-Type": "application/json" },
});

export const fetchGame = async (id) => {
  try {
    const response = await api.get(`/games/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Lỗi khi tải trò chơi");
  }
};

export const startNewGame = async (mode) => {
  try {
    const initialHeaps = [3, 4, 5];
    const currentTurn = mode === "two_players" ? "player1" : "human";

    const response = await api.post("/games/new", {
      mode,
      heaps: initialHeaps,
      current_turn: currentTurn,
    });

    return response.data;
  } catch (error) {
    throw new Error(
      "Lỗi khi bắt đầu trò chơi mới: " +
        (error.response?.data?.message || error.message)
    );
  }
};

export const saveGame = async (game) => {
  try {
    await api.put(`/games/${game.id}`, game);
    return "Trò chơi đã được lưu thành công";
  } catch (error) {
    throw new Error("Lỗi khi lưu trò chơi: " + error.message);
  }
};

export const loadGameList = async () => {
  try {
    const response = await api.get("/games");
    return response.data;
  } catch (error) {
    throw new Error("Lỗi khi tải danh sách trò chơi: " + error.message);
  }
};

export const makeMove = async (id, move) => {
  try {
    const response = await api.post(`/games/${id}/move`, {
      heapIndex: move.heapIndex,
      stones: move.stones,
    });
    return response.data;
  } catch (error) {
    throw new Error("Lỗi khi thực hiện nước đi: " + error.message);
  }
};

export const deleteGame = async (id) => {
  try {
    await api.delete(`/games/${id}`);
    return "Xóa thành công";
  } catch (error) {
    throw new Error("Lỗi khi xóa trò chơi: " + error.message);
  }
};

export default {
  fetchGame,
  startNewGame,
  saveGame,
  loadGameList,
  makeMove,
  deleteGame,
};
