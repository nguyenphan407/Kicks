import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { LoaderProvider } from "./context/LoaderContext";

createRoot(document.getElementById("root")).render(
    <BrowserRouter>
        <LoaderProvider>
            <App />
        </LoaderProvider>
    </BrowserRouter>
);
