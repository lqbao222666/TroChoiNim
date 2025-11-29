import React from "react";
import ReactDOM from "react-dom/client";
import { HashRouter, Routes, Route } from "react-router-dom";

import GamePage from "./GamePage.jsx";
import SavedGamesPage from "./components/SavedGamesPage.jsx";

import "./output.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <HashRouter>
      <Routes>
        <Route path="/" element={<GamePage />} />
        <Route path="/:id" element={<GamePage />} />
        <Route path="/saved-games" element={<SavedGamesPage />} />

        {/* QUAN TRỌNG: route bắt tất cả -> hiển thị về trang chủ */}
        <Route path="*" element={<GamePage />} />
      </Routes>
    </HashRouter>
  </React.StrictMode>
);
