const { app, BrowserWindow } = require("electron");
const path = require("path");
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

// ====== LOAD .ENV (tự động tìm .env cùng cấp) ======
require("dotenv").config(); // không cần chỉ định path, dotenv tự tìm

// ====== KHỞI ĐỘNG EXPRESS SERVER (chạy ngầm trong Electron) ======
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

// Khởi động server một lần duy nhất
const server = expressApp.listen(PORT, () => {
  console.log(`Express server is running on port ${PORT}`);
});

// ====== TẠO CỬA SỔ ELECTRON ======
function createWindow() {
  const win = new BrowserWindow({
    width: 1000,
    height: 700,
    title: "Trò Chơi NIM",
    icon: path.join(__dirname, "dist/favicon.ico"), // nếu có icon
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      webSecurity: false, // cho phép gọi localhost trong app
    },
  });

  // ĐƯỜNG DẪN CHUẨN CHO CẢ DEV VÀ PRODUCTION
  if (process.env.ELECTRON_START_URL) {
    // Dùng khi đang dev (vite dev server)
    win.loadURL(process.env.ELECTRON_START_URL);
  } else {
    // Dùng khi đã build (cả npm start và file .exe)
    win.loadFile(path.join(__dirname, "dist/index.html"));
  }

  // Mở DevTools khi cần debug (bỏ comment nếu muốn)
  // win.webContents.openDevTools({ mode: "detach" });
}

// ====== ELECTRON APP EVENTS ======
app.whenReady().then(() => {
  createWindow();

  // macOS yêu cầu
  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

// Đóng server khi thoát ứng dụng
app.on("window-all-closed", () => {
  if (server) server.close();
  if (process.platform !== "darwin") app.quit();
});

// Đảm bảo chỉ khởi động một lần (tránh lỗi trên Windows)
app.on("second-instance", () => {
  const win = BrowserWindow.getAllWindows()[0];
  if (win) {
    if (win.isMinimized()) win.restore();
    win.focus();
  }
});

// const { app, BrowserWindow } = require("electron");
// const path = require("path");
// const express = require("express");
// const cors = require("cors");
// const bodyParser = require("body-parser");

// // ====== LOAD .ENV ĐÚNG CHUẨN (QUAN TRỌNG NHẤT) ======
// require("dotenv").config({
//   path: path.join(__dirname, ".env"),
// });

// // ====== EXPRESS BACKEND ======
// const connection = require("./server/conDb");
// const gameRoutes = require("./server/routes/game.route");

// const expressApp = express();
// const PORT = process.env.PORT || 5000;

// expressApp.use(cors());
// expressApp.use(bodyParser.json());
// expressApp.use(bodyParser.urlencoded({ extended: true }));
// expressApp.use("/api/games", gameRoutes);

// expressApp.get("/", (req, res) => {
//   res.send("Server NIM Game đang chạy!");
// });

// // Start server 1 lần
// expressApp.listen(PORT, () => {
//   console.log(`Express server is running on port ${PORT}`);
// });

// // ====== ELECTRON WINDOW ======
// function createWindow() {
//   const win = new BrowserWindow({
//     width: 1000,
//     height: 700,
//     webPreferences: {
//       nodeIntegration: true,
//       contextIsolation: false,

//       // ⭐⭐ QUAN TRỌNG NHẤT ⭐⭐
//       webSecurity: false,
//       allowRunningInsecureContent: true,
//       allowFileAccess: true,
//     },
//   });

//   // =========================
//   // QUAN TRỌNG: ĐƯỜNG DẪN DIST ĐÚNG KHI ĐÓNG GÓI
//   // =========================
//   win.loadFile(path.join(__dirname, "../client/dist/index.html"));

//   // Mở DevTools nếu cần debug
//   // win.webContents.openDevTools();
// }

// app.whenReady().then(createWindow);

// app.on("window-all-closed", () => {
//   if (process.platform !== "darwin") app.quit();
// });

// app.on("activate", () => {
//   if (BrowserWindow.getAllWindows().length === 0) createWindow();
// });
