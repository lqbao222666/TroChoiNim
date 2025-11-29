const gameService = require("../service/game.service");

const calculateNimSum = (heaps) => {
  return heaps.reduce((acc, heap) => acc ^ heap, 0);
};

const checkWinner = (heaps, lastTurn) => {
  const allEmpty = heaps.every((heap) => heap === 0);
  if (allEmpty) {
    return lastTurn;
  }
  return null;
};

const generateRandomGame = (req, res) => {
  const numHeaps = Math.floor(Math.random() * 3) + 3;
  const heaps = Array.from(
    { length: numHeaps },
    () => Math.floor(Math.random() * 10) + 1
  );
  const mode = req.body.mode || "human_vs_ai";
  if (!["human_vs_ai", "two_players"].includes(mode)) {
    return res.status(400).json({ message: "Invalid mode" });
  }
  const initialTurn = mode === "two_players" ? "player1" : "human";
  const gameData = {
    heaps,
    current_turn: initialTurn,
    mode,
    status: "ongoing",
    winner: null,
    user_id: req.body.user_id || null, // Optional: Thêm nếu có user đăng nhập
  };

  gameService.createGame(gameData, (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ id: result.insertId, ...gameData });
  });
};

const loadGame = (req, res) => {
  const id = req.params.id;
  gameService.getGameById(id, (err, game) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!game) return res.status(404).json({ message: "Game not found" });
    res.json(game);
  });
};

const listGames = (req, res) => {
  gameService.getAllGames((err, games) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(games);
  });
};

const updateGame = (req, res) => {
  const id = req.params.id;
  const gameData = req.body;
  if (
    !gameData.heaps ||
    !Array.isArray(gameData.heaps) ||
    gameData.heaps.some((h) => h < 0)
  ) {
    return res.status(400).json({ message: "Invalid heaps data" });
  }
  gameService.updateGame(id, gameData, (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    if (result.affectedRows === 0)
      return res.status(404).json({ message: "Game not found" });
    res.json({ id, ...gameData });
  });
};

const deleteGame = (req, res) => {
  const id = req.params.id;
  gameService.deleteGame(id, (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    if (result.affectedRows === 0)
      return res.status(404).json({ message: "Game not found" });
    res.json({ message: "Game deleted successfully" });
  });
};

const makeMove = (req, res) => {
  const id = req.params.id;
  const { heapIndex, stones } = req.body;

  if (!Number.isInteger(heapIndex) || !Number.isInteger(stones) || stones < 1) {
    return res.status(400).json({ message: "Invalid move data" });
  }

  gameService.getGameById(id, (err, game) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!game) return res.status(404).json({ message: "Game not found" });
    if (game.status !== "ongoing")
      return res.status(400).json({ message: "Game ended" });

    if (
      heapIndex < 0 ||
      heapIndex >= game.heaps.length ||
      game.heaps[heapIndex] < stones
    ) {
      return res.status(400).json({ message: "Invalid move" });
    }

    game.heaps[heapIndex] -= stones;
    let winner = checkWinner(game.heaps, game.current_turn);

    if (winner) {
      game.status = "completed";
      game.winner = winner;
    } else if (game.mode === "two_players") {
      game.current_turn =
        game.current_turn === "player1" ? "player2" : "player1";
    } else if (game.mode === "human_vs_ai") {
      game.current_turn = "ai";
      const nimSum = calculateNimSum(game.heaps);
      if (nimSum !== 0) {
        for (let i = 0; i < game.heaps.length; i++) {
          const target = game.heaps[i] ^ nimSum;
          if (target < game.heaps[i]) {
            game.heaps[i] = target;
            break;
          }
        }
      } else {
        const nonZeroHeaps = game.heaps
          .map((h, idx) => ({ h, idx }))
          .filter((h) => h.h > 0);
        if (nonZeroHeaps.length > 0) {
          const randomHeap =
            nonZeroHeaps[Math.floor(Math.random() * nonZeroHeaps.length)];
          game.heaps[randomHeap.idx] -=
            Math.floor(Math.random() * randomHeap.h) + 1;
        }
      }
      winner = checkWinner(game.heaps, "ai");
      if (winner) {
        game.status = "completed";
        game.winner = winner;
      } else {
        game.current_turn = "human";
      }
    }

    gameService.updateGame(id, game, (err) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json(game);
    });
  });
};

module.exports = {
  generateRandomGame,
  loadGame,
  listGames,
  updateGame,
  deleteGame,
  makeMove,
};
