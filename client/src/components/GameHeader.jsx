function GameHeader({ error }) {
  return (
    <>
      <h1
        className="text-5xl text-center mb-6 text-blue-500 
                   font-extrabold drop-shadow-lg"
        style={{ fontFamily: "'Pacifico', cursive" }}
      >
        Trò Chơi NIM
      </h1>
      {error && (
        <div className="text-red-500 mb-4 text-center font-semibold">
          {error}
        </div>
      )}
    </>
  );
}

export default GameHeader;
