const connection = require("../conDb");

const createGame = (gameData, callback) => {
  if (!["human_vs_ai", "two_players"].includes(gameData.mode)) {
    return callback(new Error("Invalid mode"));
  }
  const query =
    "INSERT INTO games (heaps, current_turn, mode, status, winner) VALUES (?, ?, ?, ?, ?)";
  const values = [
    JSON.stringify(gameData.heaps),
    gameData.current_turn,
    gameData.mode,
    gameData.status,
    gameData.winner,
  ];
  connection.query(query, values, callback);
};

const getGameById = (id, callback) => {
  const query = "SELECT * FROM games WHERE id = ?";
  connection.query(query, [id], (err, results) => {
    if (err) return callback(err);
    if (results.length === 0) return callback(null, null);
    const game = results[0];
    game.heaps = JSON.parse(game.heaps);
    callback(null, game);
  });
};

const getAllGames = (callback) => {
  const query = "SELECT * FROM games";
  connection.query(query, (err, results) => {
    if (err) return callback(err);
    results.forEach((game) => {
      game.heaps = JSON.parse(game.heaps);
    });
    callback(null, results);
  });
};

const updateGame = (id, gameData, callback) => {
  const query =
    "UPDATE games SET heaps = ?, current_turn = ?, status = ?, winner = ? WHERE id = ?";
  const values = [
    JSON.stringify(gameData.heaps),
    gameData.current_turn,
    gameData.status,
    gameData.winner,
    id,
  ];
  connection.query(query, values, callback);
};

const deleteGame = (id, callback) => {
  const query = "DELETE FROM games WHERE id = ?";
  connection.query(query, [id], callback);
};

module.exports = {
  createGame,
  getGameById,
  getAllGames,
  updateGame,
  deleteGame,
};
