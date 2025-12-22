// HeapDisplay.jsx
function HeapDisplay({ heaps, onSelectMove, selectedHeap, selectedStones }) {
  const handleStoneClick = (heapIndex, stoneIndex) => {
    if (heaps[heapIndex] === 0) return;
    onSelectMove(heapIndex, stoneIndex + 1);
  };

  return (
    <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8 my-8">
      {heaps.map((stones, heapIndex) => (
        <div key={heapIndex} className="flex flex-col items-center">
          <p className="text-xl font-bold text-gray-700 mb-4">
            Đống {heapIndex + 1}
          </p>

          <div className="flex flex-wrap justify-center gap-2 max-w-xs">
            {Array.from({ length: stones }, (_, i) => (
              <div
                key={i}
                onClick={() => handleStoneClick(heapIndex, i)}
                className={`w-10 h-10 rounded-full shadow-md border-3 border-amber-800 cursor-pointer transition-all duration-500 ease-out ${
                  selectedHeap === heapIndex && selectedStones > i
                    ? "bg-red-600 scale-120 ring-4 ring-red-400/70"
                    : "bg-amber-600 hover:scale-110"
                }`}
              />
            ))}
            {stones === 0 && <p className="text-gray-400 text-lg">Trống</p>}
          </div>

          <p className="mt-3 text-2xl font-bold text-gray-800">{stones}</p>
        </div>
      ))}
    </div>
  );
}

export default HeapDisplay;
