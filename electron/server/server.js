const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const connection = require("./conDb");
const gameRoutes = require("./routes/game.route");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api/games", gameRoutes);

app.get("/", (req, res) => {
  res.send(
    "Server NIM Game đang chạy! Truy cập /api/games hoặc /api/users để dùng API."
  );
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
