// HeapDisplay.jsx
function HeapDisplay({ heaps }) {
  return (
    <div className="flex flex-wrap justify-center gap-4 mb-6">
      {heaps.map((heap, index) => (
        <div
          key={index}
          className={`
            px-5 py-3 rounded-xl text-gray-800 font-semibold text-lg
            bg-gray-100 shadow-md
            hover:shadow-lg transition-all duration-200
          `}
        >
          Đống {index + 1}: {heap} đá
        </div>
      ))}
    </div>
  );
}

export default HeapDisplay;
