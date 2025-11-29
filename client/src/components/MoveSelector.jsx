import { useState } from "react";

function MoveSelector({ game, onMove }) {
  const [move, setMove] = useState({ heapIndex: 0, stones: 1 });

  const isPlayerTurn =
    game.current_turn === "human" || game.current_turn.startsWith("player");

  const handleMove = () => {
    if (game && game.status === "ongoing" && isPlayerTurn) {
      onMove({ ...move, player: game.current_turn }); // Gửi player cho server check turn
    }
  };

  if (!game || game.status !== "ongoing") return null;

  if (!isPlayerTurn) {
    return (
      <div className="mb-6 text-center text-gray-700">
        Đang chờ AI chơi lượt...
      </div>
    ); // Message chờ AI (chỉ human_vs_ai)
  }

  return (
    <div className="mb-6 flex justify-center space-x-4">
      <select
        value={move.heapIndex}
        onChange={(e) =>
          setMove({ ...move, heapIndex: parseInt(e.target.value) })
        }
        className="p-2 border rounded-lg"
      >
        {game.heaps.map((_, index) => (
          <option key={index} value={index}>
            Đống {index + 1}
          </option>
        ))}
      </select>
      <input
        type="number"
        min="1"
        max={game.heaps[move.heapIndex]}
        value={move.stones}
        onChange={(e) => setMove({ ...move, stones: parseInt(e.target.value) })}
        className="p-2 border rounded-lg w-20"
      />
      <button
        onClick={handleMove}
        className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-gray-400"
      >
        Chơi Lượt
      </button>
    </div>
  );
}
export default MoveSelector;
