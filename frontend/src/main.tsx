import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Game from "./screens/Game";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <div className="bg-stone-800 font-roboto">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/game" element={<Game />} />
        </Routes>
      </BrowserRouter>
    </div>
  </StrictMode>
);
