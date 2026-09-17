import { createRoot } from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import App from "./App.tsx";
import "./index.css";
import { captureUtmParams } from "./lib/utm";

// Capture campaign parameters from the landing URL before anything renders.
captureUtmParams();

createRoot(document.getElementById("root")!).render(
  <HelmetProvider>
    <App />
  </HelmetProvider>,
);
