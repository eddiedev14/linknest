import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Analytics } from "@vercel/analytics/react";
import { BrowserRouter } from "react-router-dom";
import { LinknestApp } from "./LinknestApp";
import "./styles/index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Analytics />

    <BrowserRouter>
      <LinknestApp />
    </BrowserRouter>
  </StrictMode>,
);
