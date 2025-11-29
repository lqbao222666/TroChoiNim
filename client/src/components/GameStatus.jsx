function GameStatus({ game }) {
  const turnDisplay =
    game.current_turn === "ai"
      ? "AI"
      : game.current_turn.replace("player", "Player ");

  return (
    <div
      className="mb-6 text-center text-gray-800 font-semibold 
                    bg-gray-100 p-3 rounded-lg shadow-md
                    text-lg sm:text-xl
                    transition-colors duration-300"
    >
      <span className="text-red-600">Lượt:</span> {turnDisplay} |{" "}
      <span className="text-yellow-600">Trạng thái:</span> {game.status} |{" "}
      <span className="text-green-600">thắng cuộc:</span>{" "}
      {game.winner || "Chưa có"}
    </div>
  );
}

export default GameStatus;
