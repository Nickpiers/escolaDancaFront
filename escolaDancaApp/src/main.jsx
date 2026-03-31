import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { EscolaDancaApp } from "./EscolaDancaApp";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <EscolaDancaApp />
  </StrictMode>,
);
