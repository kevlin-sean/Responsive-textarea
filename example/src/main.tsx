import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
// If your component library eventually outputs a global CSS file, import it here:
// import 'responsive-textarea/dist/style.css'; // Adjust path if your build generates a CSS file

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
