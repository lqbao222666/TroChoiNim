const express = require("express");
const router = express.Router();
const gameController = require("../controller/game.controller");

router.post("/new", gameController.generateRandomGame);
router.get("/:id", gameController.loadGame);
router.get("/", gameController.listGames);
router.put("/:id", gameController.updateGame); // Update game
router.delete("/:id", gameController.deleteGame); // Delete game
router.post("/:id/move", gameController.makeMove);

module.exports = router;
