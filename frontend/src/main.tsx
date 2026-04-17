import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App"
import "./global.css"

const root = document.getElementById("root")

if (!root) throw new Error("Root element not found")

ReactDOM.createRoot(root).render(
  <React.StrictMode>
    <div className="dark">
      <App />
    </div>
  </React.StrictMode>
)