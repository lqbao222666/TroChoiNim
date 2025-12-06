const { app, BrowserWindow } = require("electron");
const path = require("path");
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

require("dotenv").config();

const connection = require("./server/conDb");
const gameRoutes = require("./server/routes/game.route");

const expressApp = express();
const PORT = process.env.PORT || 5000;

expressApp.use(cors());
expressApp.use(bodyParser.json());
expressApp.use(bodyParser.urlencoded({ extended: true }));
expressApp.use("/api/games", gameRoutes);

expressApp.get("/", (req, res) => {
  res.send("Server NIM Game đang chạy trong Electron!");
});

const server = expressApp.listen(PORT, () => {
  console.log(`Express server is running on port ${PORT}`);
});

function createWindow() {
  const win = new BrowserWindow({
    width: 1000,
    height: 700,
    title: "Trò Chơi NIM",
    icon: path.join(__dirname, "dist/favicon.ico"),
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      webSecurity: false,
    },
  });

  if (process.env.ELECTRON_START_URL) {
    win.loadURL(process.env.ELECTRON_START_URL);
  } else {
    win.loadFile(path.join(__dirname, "dist/index.html"));
  }
}

app.whenReady().then(() => {
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on("window-all-closed", () => {
  if (server) server.close();
  if (process.platform !== "darwin") app.quit();
});

app.on("second-instance", () => {
  const win = BrowserWindow.getAllWindows()[0];
  if (win) {
    if (win.isMinimized()) win.restore();
    win.focus();
  }
});
