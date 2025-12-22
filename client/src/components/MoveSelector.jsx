// MoveSelector.jsx
import { useEffect } from "react";

function MoveSelector({
  game,
  onMove,
  selectedHeap,
  selectedStones,
  setSelectedHeap,
  setSelectedStones,
}) {
  const isPlayerTurn =
    game.current_turn === "human" || game.current_turn.startsWith("player");

  const handleMove = () => {
    if (selectedHeap !== null && selectedStones > 0) {
      onMove({ heapIndex: selectedHeap, stones: selectedStones });
      setSelectedHeap(null);
      setSelectedStones(0);
    }
  };

  // Nhấn Enter = LẤY ĐÁ!
  useEffect(() => {
    const handler = (e) => {
      if (e.key === "Enter" && selectedHeap !== null && selectedStones > 0) {
        handleMove();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [selectedHeap, selectedStones, onMove]);

  if (!game || game.status !== "ongoing") return null;

  if (!isPlayerTurn) {
    return (
      <div className="text-center py-16">
        <p className="text-4xl font-bold text-orange-500 animate-pulse">
          AI đang suy nghĩ…
        </p>
      </div>
    );
  }

  const hasSelection = selectedHeap !== null && selectedStones > 0;

  return (
    <div className="mt-12 text-center">
      {hasSelection ? (
        <div className="mb-10">
          <p className="text-3xl font-bold text-gray-800">
            Đã chọn:{" "}
            <span className="text-blue-600">Đống {selectedHeap + 1}</span> – Lấy{" "}
            <span className="text-red-600">{selectedStones}</span> đá
          </p>
        </div>
      ) : (
        <p className="text-2xl text-gray-600 mb-8">
          Click vào các viên đá trên đống để chọn số lượng
        </p>
      )}

      <button
        onClick={handleMove}
        disabled={!hasSelection}
        className={`px-24 py-8 text-5xl font-black text-white rounded-3xl shadow-2xl transition-all duration-500
          ${
            hasSelection
              ? "bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 hover:from-emerald-600 hover:via-teal-600 hover:to-cyan-600 border-6 border-red-600 ring-8 ring-emerald-400/50 hover:ring-emerald-500/70 hover:scale-110 cursor-pointer"
              : "bg-gray-400 cursor-not-allowed opacity-60"
          }`}
      >
        LẤY ĐÁ!
      </button>

      {hasSelection && (
        <p className="mt-6 text-xl text-gray-600">
          Hoặc nhấn phím{" "}
          <kbd className="px-3 py-1 bg-gray-200 rounded">Enter</kbd>
        </p>
      )}
    </div>
  );
}

export default MoveSelector;
