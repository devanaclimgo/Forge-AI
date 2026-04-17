import { Routes, Route } from "react-router-dom";
import AgentPage from "./pages/AgentPage";
import BrainDumpPage from "./pages/BrainDumpPage";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<AgentPage />} />
      <Route path="/brain-dump" element={<BrainDumpPage />} />
    </Routes>
  );
}
